const express = require("express");
const { generateAi } = require("../controllers/ai.controller");

const GeminiRouter = express.Router();

GeminiRouter.post("/generate", generateAi);

module.exports = GeminiRouter;
