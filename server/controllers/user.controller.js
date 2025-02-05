const User = require("../models/User");

// Create a new user
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

// Get all users
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

// Update user details based on email
const updateUser = async (req, res) => {
  try {
    const { email } = req.body; // Assuming email comes from the request body
    const { name, age } = req.body; // Fields to update

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user fields
    existingUser.name = name || existingUser.name;
    existingUser.age = age || existingUser.age;

    // Save the updated user to the database
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

module.exports = { createUser, getUser, updateUser };
