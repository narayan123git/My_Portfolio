// /api/contact.js
import nodemailer from "nodemailer";

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

    const { name, email, message, recaptchaToken } = req.body;
    if (!name || !email || !message || !recaptchaToken) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // ---- Verify reCAPTCHA ----
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        });
        const captcha = await verifyRes.json();
        if (!captcha.success) {
            return res.status(400).json({ error: "Failed captcha verification" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New contact form submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            replyTo: email,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
