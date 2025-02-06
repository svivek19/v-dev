const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    email: {
      unique: true,
      type: String,
      require: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
