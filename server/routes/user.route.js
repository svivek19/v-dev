const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/get", getUser);
userRouter.post("/create", createUser);
userRouter.patch("/update", updateUser);

module.exports = userRouter;
