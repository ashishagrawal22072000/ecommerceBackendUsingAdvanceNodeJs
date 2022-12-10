const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    mail: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (data) => {
  const token = generateToken(data.email, data._id);
  const mailOptions = {
    to: data.email,
    from: process.env.EMAIL_ADDRESS,
    subject: "EMAIL VARIFICATION",
    html: `
        <p>Please verify Your Email <a href="http://localhost:2000/api/v1/user/verify_email?token=${token}>Click Here</a></p>
        
        `,
  };
};

module.exports = { generateToken };
