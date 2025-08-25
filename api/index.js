import express from "express";
import { createServerlessHandler } from "@vercel/node";

const app = express();

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

export default createServerlessHandler(app);
