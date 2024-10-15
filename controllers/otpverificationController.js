// server.js
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host : process.env.SMTP_HOST,
    secure: true,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.NODEMAILER_EMAIL_ID,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    }
  });

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  const mailOptions = {
  from: process.env.NODEMAILER_EMAIL_ID,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    // Store OTP in a database or in-memory storage for verification
    // For simplicity, you can return it in the response (not recommended for production)
    res.status(200).json({ otp });
  });
};

