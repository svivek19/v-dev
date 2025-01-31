const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newUser = await User.create({
      name,
      email,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const response = await User.find({});
    return res
      .status(200)
      .json({ message: "User find successfully", response: response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

module.exports = { createUser, getUser };
