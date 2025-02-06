const express = require("express");
const {
  createQuestion,
  getQuestionsById,
  getAllQuestions,
} = require("../controllers/question.controller");

const QuestionRouter = express.Router();

QuestionRouter.post("/create", createQuestion);
QuestionRouter.get("/get/:id", getQuestionsById);
QuestionRouter.get("/get", getAllQuestions);

module.exports = QuestionRouter;
