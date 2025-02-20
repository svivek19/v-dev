const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const textResponse = result.response.text();

    return res.status(200).json({ response: textResponse });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { generateAi };
