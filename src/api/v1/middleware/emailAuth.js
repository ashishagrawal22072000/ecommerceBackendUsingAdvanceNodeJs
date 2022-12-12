const tokenUtils = require('.././utils/token')
const helper = require('./../helpers/helper')
const userService = require('./.././services/userService')
const emailAuth = async (req, res, next) => {
  try {
    const user = await userService.getEmail(req.body)
    if (user) {
      if (user.isEmailVarified) {
        next()
      } else {
        res.status(helper.ERROR401.code).json({
          message: helper.ERROR401.message,
          status: helper.ERROR401.status,
        })
      }
    } else {
      res.status(helper.ERROR404.code).json({
        status: helper.ERROR404.status,
        message: helper.ERROR404.message,
      })
    }
  } catch (err) {
    res.status(helper.ERROR401.code).json({
      status: helper.ERROR401.status,
      data: {},
      message: helper.ERROR401.message,
    })
  }
}

module.exports = { emailAuth }
