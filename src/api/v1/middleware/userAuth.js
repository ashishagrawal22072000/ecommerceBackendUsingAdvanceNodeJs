const tokenUtils = require("../utils/token");
const helper = require("../helpers/helper");
const auth = async (req, res, next) => {
  const token = await tokenUtils.getToken(req);
  console.log(token);
  if (token) {
    console.log("vfhewhjf");
    const decodeToken = tokenUtils.verifyToken(token);
    const userId = decodeToken.id;
    if (req.body._id && req.body._id === userId) {
      next();
    } else {
      res.status(helper.ERROR401.code).json({
        status: helper.ERROR401.status,
        data: {},
        message: helper.ERROR401.message,
      });
    }
  } else {
    res.status(helper.ERROR401.code).json({
      status: helper.ERROR401.status,
      data: {},
      message: helper.ERROR401.message,
    });
  }
};

module.exports = { auth };
