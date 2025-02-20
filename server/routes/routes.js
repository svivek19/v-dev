const express = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./user.route");
const QuestionRouter = require("./question.route");
const GeminiRouter = require("./gemini.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/question", QuestionRouter);
router.use("/ai", GeminiRouter);

module.exports = router;
