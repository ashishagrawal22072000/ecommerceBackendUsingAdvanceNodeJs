const userService = require("./../services/userService");
const helper = require(".././helpers/helper");
const userValidation = require(".././validations/userValidation");
const Tokenutils = require("./../utils/token");
const signup = async (req, res) => {
  try {
    const validationResult = await userValidation.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: validationResult.error,
        message: "VALIDATION ERROR",
      });
    } else {
      const email = await userService.getEmail(req.body);
      if (email) {
        res.status(helper.ERROR403.code).json({
          status: helper.ERROR403.status,
          data: email.email,
          message: helper.ERROR403.message,
        });
      } else {
        const user = await userService.createUser(req.body);

        console.log(user);
        res.status(helper.ERROR200.code).json({
          status: helper.ERROR200.status,
          data: user,
          message: "USER CREATED",
        });
      }
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.getEmail(req.body);
    if (user) {
      const password = await userService.getPassword(req.body, user.password);
      if (password) {
        const token = Tokenutils.generateToken(user);
        res.status(helper.ERROR200.code).json({
          status: helper.ERROR200.status,
          data: {
            name: user.name,
            email: user.email,
            token: token,
          },
          message: "USER LOGIN SUCCESSFULLY",
        });
      } else {
        res.status(helper.ERROR400.code).json({
          status: helper.ERROR400.status,
          data: {},
          message: "INVALID CREDIENTIALS",
        });
      }
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: "INVALID CREDIENTIALS",
      });
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (users.length > 0) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        data: users,
        message: "USERS FOUND",
      });
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: "NO DATA FOUND",
      });
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(helper.ERROR200.code).json({
        status: helper.ERROR200.status,
        data: user,
        message: "USER FOUND",
      });
    } else {
      res.status(helper.ERROR400.code).json({
        status: helper.ERROR400.status,
        data: {},
        message: "USER NOT FOUND",
      });
    }
  } catch (err) {
    res.status(helper.ERROR500.code).json({
      status: helper.ERROR500.status,
      data: err.message,
      message: helper.ERROR500.message,
    });
  }
};

module.exports = { signup, getAllUsers, getUser, login };
