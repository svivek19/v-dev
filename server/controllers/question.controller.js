const Question = require("../models/Question.model");

const createQuestion = async (req, res) => {
  try {
    const { id, question, code } = req.body;

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

module.exports = { createQuestion };
