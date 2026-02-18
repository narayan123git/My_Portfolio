import nodemailer from "nodemailer";

// NOTE: These will reset when the serverless function sleeps.
const otpStore = new Map(); 
const rateLimit = new Map(); 

const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const OTP_EXPIRY = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000;

export default async function handler(req, res) {
    // RESTRICT CORS
    res.setHeader("Access-Control-Allow-Origin", "https://narayanpaulportfolio.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { email, otp, action, recaptchaToken, firstName } = req.body; // 'firstName' is our honeypot

    // ---- 1. HONEYPOT CHECK ----
    // If 'firstName' is filled, it's a bot because the field is hidden from humans.
    if (firstName) {
        console.log("Bot detected via Honeypot");
        return res.status(418).json({ error: "Nice try, bot." });
    }

    if (!email) return res.status(400).json({ error: "Missing email" });

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    try {
        // ---- 2. VERIFY RECAPTCHA (Only on Send) ----
        if (action === "send") {
            if (!recaptchaToken) return res.status(400).json({ error: "Captcha required" });

            const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            });
            const captcha = await verifyRes.json();
            if (!captcha.success) return res.status(400).json({ error: "Captcha failed" });
        }

        // ---- 3. RATE LIMITING ----
        const key = `${ip}`; 
        const now = Date.now();
        const rl = rateLimit.get(key) || { count: 0, lastRequest: 0 };

        if (now - rl.lastRequest < RATE_LIMIT_WINDOW) {
            if (rl.count >= MAX_REQUESTS) return res.status(429).json({ error: "Too many requests." });
            rl.count++;
        } else {
            rl.count = 1;
        }
        rl.lastRequest = now;
        rateLimit.set(key, rl);

        // ---- 4. ACTION LOGIC ----
        if (action === "send") {
            const existing = otpStore.get(email);
            if (existing?.lockedUntil && now < existing.lockedUntil) {
                return res.status(403).json({ error: "Account locked temporarily." });
            }

            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            otpStore.set(email, { otp: generatedOtp, expiry: now + OTP_EXPIRY, attempts: 0 });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
            });

            await transporter.sendMail({
                from: `"Portfolio" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP is: ${generatedOtp}`,
            });

            return res.status(200).json({ success: true });
        }

        if (action === "verify") {
            const record = otpStore.get(email);
            if (!record) return res.status(400).json({ error: "No OTP requested" });

            if (otp !== record.otp) {
                record.attempts++;
                if (record.attempts >= MAX_ATTEMPTS) record.lockedUntil = now + LOCK_DURATION;
                otpStore.set(email, record);
                return res.status(400).json({ error: "Invalid OTP" });
            }

            otpStore.delete(email);
            return res.status(200).json({ success: true });
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}
