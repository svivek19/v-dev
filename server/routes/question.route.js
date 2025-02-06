const express = require("express");
const { createQuestion } = require("../controllers/question.controller");

const QuestionRouter = express.Router();

QuestionRouter.post("/create", createQuestion);

module.exports = QuestionRouter;
