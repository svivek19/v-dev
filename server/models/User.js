const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
