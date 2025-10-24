import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("public"));

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  "http://localhost:5500"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } 
      else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "No query provided" });

  const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.SEARCH_CX}&q=${encodeURIComponent(q)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search API failed" });
  }
});

app.get("/api/image", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "No query provided" });

  const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY_IMAGE}&cx=${process.env.IMAGE_CX}&searchType=image&q=${encodeURIComponent(q)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image API failed" });
  }
});

app.post("/api/ask", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "No query provided" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] }),
      }
    );

    const data = await response.json();
    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from AI.";

    res.json({ answer: aiResponse });
    } 
    catch (err) 
    {
      console.error(err);
      res.status(500).json({ error: "Gemini API failed" });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`✅ Server running on http://localhost:${process.env.PORT || 3000}`)
);
