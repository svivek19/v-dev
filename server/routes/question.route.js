const express = require("express");
const {
  createQuestion,
  getQuestionsById,
  getAllQuestions,
  createComment,
  getQuestionsByObjId,
} = require("../controllers/question.controller");

const QuestionRouter = express.Router();

QuestionRouter.post("/create", createQuestion);
QuestionRouter.get("/get/:id", getQuestionsById);
QuestionRouter.get("/get/:id", getQuestionsByObjId);
QuestionRouter.get("/get", getAllQuestions);
QuestionRouter.patch("/create-comment", createComment);

module.exports = QuestionRouter;
