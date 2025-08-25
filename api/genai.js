import { GoogleGenerativeAI } from "@google/generative-ai";
import aboutMe from "./aboutMe.json" assert { type: "json" };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `
        You are a portfolio assistant for Narayan Paul.
        You ONLY answer questions using the provided JSON knowledge base below.
        JSON Knowledge Base: ${JSON.stringify(aboutMe)}
        If the user asks something not found in the JSON, reply:
        "I'm only able to answer questions about Narayan Paul’s portfolio."
        Do not invent or hallucinate extra information.
      `
    });

    const result = await model.generateContent(prompt);

    // Safely extract text
    const text =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error("GenAI error:", err);
    res.status(500).json({ error: "Failed to generate response", details: err.message });
  }
}
