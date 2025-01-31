const User = require("../models/User");
const sendEmail = require("../utils/mailer");

// 6 Digits - OTP generation
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    // Check if email exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found in the database." });
    }

    // If email exists, update OTP
    await User.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { upsert: true, new: true }
    );

    // Send OTP to email
    await sendEmail(email, otp);

    return res.json({ status: 200, message: "OTP sent to email." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP and expiration time after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.json({ message: "OTP verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { sendOTP, verifyOTP };
