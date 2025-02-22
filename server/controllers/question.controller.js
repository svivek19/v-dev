const Question = require("../models/Question.model");
const User = require("../models/User");

const createQuestion = async (req, res) => {
  try {
    const { id, question, code } = req.body;

    if (!id || !question) {
      return res.status(400).json({ message: "not allowed" });
    }

    const newQuestion = new Question({ id, question, code });
    const response = await newQuestion.save();

    return res
      .status(201)
      .json({ message: "Question created successfully", question: response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating question", error: error.message });
  }
};

const getQuestionsByObjId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Question.find({ _id: id });

    return res
      .status(200)
      .json({ message: "questions", response: response[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getQuestionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Question.find({});
    const filteredData = response.filter((item) => item.id.toString() === id);

    return res
      .status(200)
      .json({ message: "Filtered questions", questions: filteredData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});

    const questionsWithUserData = await Promise.all(
      questions.map(async (question) => {
        const user = await User.findById(question.id);
        return {
          ...question._doc,
          user: user ? { name: user.name, email: user.email } : null,
        };
      })
    );

    return res.status(200).json({
      message: "All questions with user data",
      questions: questionsWithUserData,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { id, username, suggestions } = req.body;

    if (!id || !username || !suggestions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await Question.findOneAndUpdate(
      { _id: id },
      { $push: { suggestions: { username, suggestions } } },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res
      .status(201)
      .json({ message: "Comment added successfully", question: response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

const getRelatedQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    const questionObj = await Question.findById(id);
    if (!questionObj) {
      return res.status(404).json({ message: "Question not found" });
    }

    const keywords = [
      ...new Set(
        questionObj.question.split(/\s+/).map((word) => word.toLowerCase())
      ),
    ];

    const relatedQuestions = await Question.find({
      question: { $regex: keywords.join("|"), $options: "i" },
    });

    return res.status(200).json({
      message: "Related questions found",
      relatedQuestions: relatedQuestions.filter((q) => q._id.toString() !== id),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching related questions",
      error: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  getRelatedQuestions,
  getQuestionsById,
  getAllQuestions,
  createComment,
  getQuestionsByObjId,
};
