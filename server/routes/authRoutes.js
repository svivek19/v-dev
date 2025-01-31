const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);

module.exports = authRouter;
