require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  secure: true,
});

const sendEmail = async (email, otp) => {
  const mailOptions = {
    from: "V-DEV Team",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}, it is valid for 10 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
