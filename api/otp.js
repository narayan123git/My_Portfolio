// /api/otp.js
import nodemailer from "nodemailer";

const otpStore = new Map(); // { email: { otp, expiry, attempts, lockedUntil } }
const rateLimit = new Map(); // { ip/email: { count, lastRequest } }

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://narayanpaulportfolio.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // preflight success
    }
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }


    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { email, otp, action } = req.body;

    if (!email) return res.status(400).json({ error: "Missing email" });

    try {
        // ---- RATE LIMIT ----
        const key = `${ip}:${email}`;
        const now = Date.now();
        const rl = rateLimit.get(key) || { count: 0, lastRequest: 0 };
        if (now - rl.lastRequest < RATE_LIMIT_WINDOW) {
            if (rl.count >= MAX_REQUESTS) {
                return res.status(429).json({ error: "Too many requests. Try later." });
            }
            rl.count++;
        } else {
            rl.count = 1;
        }
        rl.lastRequest = now;
        rateLimit.set(key, rl);

        // ---- SEND OTP ----
        if (action === "send") {
            // Check lock
            const existing = otpStore.get(email);
            if (existing?.lockedUntil && now < existing.lockedUntil) {
                return res.status(403).json({ error: "Too many failed attempts. Try later." });
            }

            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            otpStore.set(email, { otp: generatedOtp, expiry: now + OTP_EXPIRY, attempts: 0 });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
            });

            await transporter.sendMail({
                from: `"Portfolio OTP" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP is: ${generatedOtp}. It will expire in 5 minutes.`,
            });

            return res.status(200).json({ success: true, message: "OTP sent!" });
        }

        // ---- VERIFY OTP ----
        if (action === "verify") {
            const record = otpStore.get(email);
            if (!record) return res.status(400).json({ error: "No OTP requested" });

            if (record.lockedUntil && now < record.lockedUntil) {
                return res.status(403).json({ error: "Too many failed attempts. Try later." });
            }

            if (now > record.expiry) {
                otpStore.delete(email);
                return res.status(400).json({ error: "OTP expired" });
            }

            if (otp !== record.otp) {
                record.attempts++;
                if (record.attempts >= MAX_ATTEMPTS) {
                    record.lockedUntil = now + LOCK_DURATION;
                }
                otpStore.set(email, record);
                return res.status(400).json({ error: "Invalid OTP" });
            }

            otpStore.delete(email); // success → clear OTP
            return res.status(200).json({ success: true, message: "OTP verified" });
        }

        return res.status(400).json({ error: "Invalid action" });
    } catch (err) {
        console.error("OTP API error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
