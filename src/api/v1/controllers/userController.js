const userService = require('./../services/userService')
const helper = require('.././helpers/helper')
const userValidation = require('.././validations/userValidation')
const Tokenutils = require('./../utils/token')
const { sendEmail } = require('./.././utils/utils')
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
        await sendEmail(user)
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

const login = async (req, res) => {
  try {
    const user = await userService.getEmail(req.body)
    if (user) {
      const password = await userService.getPassword(req.body, user.password)
      if (password) {
        const token = Tokenutils.generateToken(user)
        res.status(helper.ERROR200.code).json({
          status: helper.ERROR200.status,
          data: {
            name: user.name,
            email: user.email,
            token: token,
          },
          message: 'USER LOGIN SUCCESSFULLY',
        })
      } else {
        res.status(helper.ERROR400.code).json({
          status: helper.ERROR400.status,
          data: {},
          message: 'INVALID CREDIENTIALS',
        })
      }
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: 'INVALID CREDIENTIALS',
      })
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query
    console.log('EMAIL TOKEN', token)
    if (token) {
      const decodeToken = Tokenutils.verifyToken(token)
      const user = await userService.getUserById(decodeToken.id)
      if (user) {
        console.log('EMAIL USER', user)
        user.isEmailVarified = true
        await user.save()
        console.log('hello', user)
        res.status(helper.ERROR200.code).json({
          message: 'EMAIL VERIFIED SUCCESSFUL',
          status: helper.ERROR200.status,
          data: user.email,
        })
      } else {
        res.status(helper.ERROR400.code).json({
          message: 'EMAIL NOT FOUND',
          data: {},
          status: helper.ERROR400.status,
        })
      }
    } else {
      res.status(helper.ERROR404.code).json({
        status: helper.ERROR404.status,
        message: helper.ERROR404.message,
      })
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
    if (users.length > 0) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        data: users,
        message: 'USERS FOUND',
      })
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: 'NO DATA FOUND',
      })
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    if (user) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        data: user,
        message: 'USER FOUND',
      })
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: 'USER NOT FOUND',
      })
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.params.id)
    if (user) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        message: 'USER DELETED',
      })
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: 'USER NOT FOUND',
      })
    }
    console.log(user, 'user deleted')
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUserById(req)
    if (user) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        message: 'USER UPDATE SUCCESSFUL',
      })
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: 'USER NOT FOUND',
      })
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const uploadImage = (req, res) => {
  try {
    const imgUrl = userService.getImageUrl(req)
    if (imgUrl) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        url: imgUrl,
        message: 'Image upload successfully',
      })
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        url: imgUrl,
        message: 'File upload failed',
      })
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

const getImage = async (req, res) => {
  try {
    console.log('ehiervrfivbrfivbefbe')
    const file = await userService.getImage(req.params.filename)
    console.log(file)
    if (file) {
      const readStream = await userService.readImage(file._id)
      readStream.pipe(res)
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.status400.status,
        url: {},
        message: 'File Not Found',
      })
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    })
  }
}

module.exports = {
  signup,
  getAllUsers,
  getUser,
  login,
  verifyEmail,
  deleteUser,
  updateUser,
  uploadImage,
  getImage,
}
