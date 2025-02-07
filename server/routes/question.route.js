const express = require("express");
const {
  createQuestion,
  getQuestionsById,
  getAllQuestions,
  createComment,
} = require("../controllers/question.controller");

const QuestionRouter = express.Router();

QuestionRouter.post("/create", createQuestion);
QuestionRouter.get("/get/:id", getQuestionsById);
QuestionRouter.get("/get", getAllQuestions);
QuestionRouter.patch("/create-comment", createComment);

module.exports = QuestionRouter;
