const tokenUtils = require('../utils/token')
const helper = require('../helpers/helper')
const userService = require('./../services/userService')
const auth = async (req, res, next) => {
  const token = tokenUtils.getToken(req)
  console.log('token', token)
  if (token) {
    console.log('vfhewhjf')
    const decodeToken = tokenUtils.verifyToken(token)
    const userEmail = await userService.getEmail(decodeToken)
    if (userEmail) {
      next()
    } else {
      res.status(helper.ERROR401.code).json({
        status: helper.ERROR401.status,
        data: {},
        message: helper.ERROR401.message,
      })
    }
  } else {
    res.status(helper.ERROR401.code).json({
      status: helper.ERROR401.status,
      data: {},
      message: helper.ERROR401.message,
    })
  }
}

module.exports = { auth }
