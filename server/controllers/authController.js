const User = require("../models/User");
const admin = require("../config/firebase");
const sendEmail = require("../utils/mailer");

// 6 Digits - OTP generation
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { email, phoneNumber } = req.body;
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    let user;

    // Check if email exists in the database
    if (email) {
      user = await User.findOne({ email });

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

      await sendEmail(email, otp);
      return res.json({ status: 200, message: "OTP sent to email." });
    } else if (phoneNumber) {
      // Check if phone number exists in the database
      user = await User.findOne({ phoneNumber });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Phone number not found in the database." });
      }

      // If phone number exists, update OTP
      await User.findOneAndUpdate(
        { phoneNumber },
        { otp, otpExpires },
        { upsert: true, new: true }
      );

      // Return message to verify phone number via Firebase
      return res.json({
        message:
          "OTP has been sent to phone number. Please verify it using Firebase SDK.",
      });
    } else {
      return res
        .status(400)
        .json({ message: "Provide an email or phone number." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne(email ? { email } : { phoneNumber });

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.json({ message: "OTP verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { sendOTP, verifyOTP };
