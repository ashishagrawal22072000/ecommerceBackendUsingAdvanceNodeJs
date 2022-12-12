require('dotenv').config()
const jwt = require('jsonwebtoken')
const generateToken = (data) => {
  return jwt.sign({ email: data.email, id: data._id }, process.env.SECRET_KEY)
}

const getToken = (req) => {
  console.log(req.headers.authorization)
  if (req.headers.authorization) {
    console.log('HELLO FROM TOKEN', req.headers.authorization)
    return req.headers.authorization
  }
  return null
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateToken, getToken, verifyToken }
