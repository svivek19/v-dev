const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  question: {
    type: String,
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
