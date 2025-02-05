const User = require("../models/User");
const sendEmail = require("../services/emailService");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found in the database." });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found in the database." });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "OTP verified successfully.", response: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { sendOTP, verifyOTP };
