const userService = require('./../services/userService')
const helper = require('.././helpers/helper')
const userValidation = require('.././validations/userValidation')
const signup = async (req, res) => {
  try {
    const validationResult = await userValidation.validate(req.body, {
      abortEarly: false,
    })
    if (validationResult.error) {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: validationResult.error,
        message: 'VALIDATION ERROR',
      })
    } else {
      const email = await userService.getEmail(req.body)
      if (email) {
        res.status(helper.ERROR403.code).json({
          status: helper.ERROR403.status,
          data: email.email,
          message: helper.ERROR403.message,
        })
      } else {
        const user = await userService.createUser(req.body)

        console.log(user)
        res.status(helper.ERROR200.code).json({
          status: helper.ERROR200.status,
          data: user,
          message: 'USER CREATED',
        })
      }
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers()
    res.status(helper.ERROR200.code).json({
      status: helper.ERROR200.status,
      data: users,
      message: 'USERS FOUND',
    })
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

module.exports = { signup, getAllUsers }
