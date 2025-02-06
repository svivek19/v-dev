const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  getUserbyId,
  askQuestions,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/get", getUser);
userRouter.get("/get/:_id", getUserbyId);
userRouter.post("/create", createUser);
userRouter.patch("/update/:email", updateUser);
userRouter.patch("/question/:_id", askQuestions);

module.exports = userRouter;
