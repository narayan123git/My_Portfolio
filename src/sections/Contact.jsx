import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    otp: "",
    honeypot: "",
  });

  // ✅ API base from environment (no hardcoding)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ safe JSON parser
  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return {};
    }
  };

  // --------------------------
  // SEND OTP
  // --------------------------
  const sendOtp = async () => {
    const email = form.email.trim();
    if (!email) return alert("Please enter your email before requesting OTP.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Please provide a valid email.");

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) return alert("Please complete reCAPTCHA first.");

    try {
      const res = await fetch(`${API_BASE_URL}/api/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "send", recaptchaToken: recaptchaValue }),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setOtpSent(true);
      alert("✅ OTP sent to your email! It will expire in 5 minutes.");
    } catch (err) {
      console.error("Failed to send OTP:", err);
      alert(err.message || "Failed to send OTP. Please try again later.");
    }
  };

  // --------------------------
  // VERIFY OTP
  // --------------------------
  const verifyOtp = async () => {
    const email = form.email.trim();
    const otp = form.otp.trim();
    if (!otp) return alert("Please enter the OTP.");

    try {
      const res = await fetch(`${API_BASE_URL}/api/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, action: "verify" }),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || "OTP verification failed");

      setOtpVerified(true);
      alert("✅ OTP verified successfully!");
    } catch (err) {
      console.error("OTP verification error:", err);
      alert(err.message || "OTP verification failed. Try again.");
    }
  };

  // --------------------------
  // HANDLE SUBMIT
  // --------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) return alert("Please verify that you are not a robot.");

    if (form.honeypot.trim() !== "") return; // spam check

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2 || message.length < 5) {
      return alert("Please provide a valid name and message.");
    }
    if (!otpSent) return alert("Please request OTP first.");
    if (!otpVerified) return alert("Please verify OTP before sending message.");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          recaptchaToken: recaptchaValue,
        }),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      // Reset form
      setForm({ name: "", email: "", message: "", otp: "", honeypot: "" });
      setOtpSent(false);
      setOtpVerified(false);
      recaptchaRef.current.reset();

      alert("✅ Message sent successfully!");
    } catch (err) {
      console.error("Failed to send message:", err);
      alert(err.message || "Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                </div>

                {otpSent && (
                  <div>
                    <label htmlFor="otp">Enter OTP</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={form.otp}
                        onChange={handleChange}
                        placeholder="Enter the OTP sent to your email"
                        required
                      />
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                {/* Google reCAPTCHA */}
                <div className="mt-4">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    ref={recaptchaRef}
                  />
                </div>

                <button type="submit" className="mt-4">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>

          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
