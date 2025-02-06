const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = await User.create({
      name,
      email,
      age,
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
      .json({ message: "Users found successfully", response: response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

const getUserbyId = async (req, res) => {
  const { _id } = req.params;
  try {
    const response = await User.findOne({ _id });
    return res
      .status(200)
      .json({ message: "Users found successfully", response: response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, age } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    existingUser.name = name || existingUser.name;
    existingUser.age = age || existingUser.age;

    await existingUser.save();

    return res
      .status(200)
      .json({ message: "User updated successfully", user: existingUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

const askQuestions = async (req, res) => {
  try {
    const { _id } = req.params;
    const { question, code } = req.body;

    // Update both question and code fields in a single $set operation
    const response = await User.findOneAndUpdate(
      { _id },
      { $set: { question, code } }, // Combined $set for both fields
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Question updated successfully", response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

module.exports = { createUser, getUser, updateUser, getUserbyId, askQuestions };
