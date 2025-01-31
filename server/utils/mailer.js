const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (email, otp) => {
  await transport.sendMail({
    from: "V-DEV - Team",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}, It is valid for 10 minutes.`,
  });
};

module.exports = sendEmail;
