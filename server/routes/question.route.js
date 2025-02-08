const express = require("express");
const {
  createQuestion,
  getQuestionsById,
  getAllQuestions,
  createComment,
  getQuestionsByObjId,
  getRelatedQuestions,
} = require("../controllers/question.controller");

const QuestionRouter = express.Router();

QuestionRouter.post("/create", createQuestion);
QuestionRouter.get("/get/:id", getQuestionsById);
QuestionRouter.get("/get-obj/:id", getQuestionsByObjId);
QuestionRouter.get("/get", getAllQuestions);
QuestionRouter.patch("/create-comment", createComment);
QuestionRouter.get("/get-related/:id", getRelatedQuestions);

module.exports = QuestionRouter;
