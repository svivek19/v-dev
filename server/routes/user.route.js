const express = require("express");
const { getUser, createUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/get", getUser);
userRouter.post("/create", createUser);

module.exports = userRouter;
