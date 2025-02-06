const express = require("express");
const {
  createQuestion,
  getQuestions,
} = require("../controllers/question.controller");

const QuestionRouter = express.Router();

QuestionRouter.post("/create", createQuestion);
QuestionRouter.get("/get/:id", getQuestions);

module.exports = QuestionRouter;
