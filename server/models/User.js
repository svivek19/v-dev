const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
