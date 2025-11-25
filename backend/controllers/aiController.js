import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client (single file)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

export const aiSuggestions = async (req, res) => {
  try {
    const skills = req.body.skills;

    const prompt = `
You are an expert career guidance assistant.

The user has these skills with levels (1–10):
${JSON.stringify(skills)}

Generate role recommendations, skill radar, bar data AND recommended jobs.

Return ONLY valid JSON in the following structure:

{
  "roles": [
    {
      "title": "string",
      "score": number,
      "missing": [
        { "skill": "string", "recommendedLevel": number }
      ]
    }
  ],
  "radar": [
    { "skill": "string", "level": number }
  ],
  "bars": [
    { "skill": "string", "level": number }
  ],
  "jobs": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "salary": "string",
      "skills": ["string"],
      "score": number
    }
  ]
}

RULES:
- Only valid JSON.
- No markdown.
- No explanation.
- No extra text.
`;

    const result = await model.generateContent(prompt);

    const content = result.response.text();

    res.json({ suggestions: content });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};