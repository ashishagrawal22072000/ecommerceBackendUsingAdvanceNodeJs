const nodemailer = require('nodemailer')
require('dotenv').config()
const { generateToken } = require('./../utils/token')
const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const sendEmail = async (data) => {
  const token = generateToken(data)
  console.log('token', token)
  const mailOptions = {
    to: data.email,
    from: process.env.EMAIL_ADDRESS,
    subject: 'EMAIL VARIFICATION',
    text: `Verify Your Email`,
    html: `

<p>Hello <strong>${data.name}</strong</p>

<p>Are you ready to gain access to all of the assets we prepared for clients?</p>

<p>First, you must complete your registration by clicking on the button below:</p>

<button><a href="${process.env.MAIN_URL}/user/verify_email?token=${token}">Verify Your Email</a></button>

<p>This link will verify your email address, and then you’ll officially be a part of the [customer portal] community.</p>

<p>See you there!</p>

<p>Best regards, the <strong>backend</strong> team</p>`,
  }

  const mail = await transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('ERROR: ' + err)
      return err
    } else {
      console.log('INFO: ' + info.message)
      return info
    }
  })
  return mail
}

module.exports = { sendEmail }
