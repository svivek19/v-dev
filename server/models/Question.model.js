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
  suggestions: {
    type: Array,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
