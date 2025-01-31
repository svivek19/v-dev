const User = require("../models/User");
const admin = require("../config/firebase");
const sendEmail = require("../utils/mailer");

// 6 Digits - OTP generation
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { email, phone } = req.body;
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    let user;
    if (email) {
      user = await User.findOneAndUpdate(
        { email },
        { otp, otpExpires },
        { upsert: true, new: true }
      );
      await sendEmail(email, otp);
      return res.json({ status: 200, message: "OTP sent to email." });
    } else if (phone) {
      user = await User.findOneAndUpdate(
        { phone },
        { otp, otpExpires },
        { upsert: true, new: true }
      );
      try {
        await admin
          .auth()
          .createUser({ phoneNumber: `+${phone}`, uid: phone })
          .catch(() => {});
        return res.json({
          message: "OTP sent to phone (Verify via Firebase SDK).",
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.status(400).json({ message: "Provide an email or phone." });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const verifyOTP = async (req, res) => {
  const { email, phone, otp } = req.body;

  try {
    const user = await User.findOne(email ? { email } : { phone });

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
