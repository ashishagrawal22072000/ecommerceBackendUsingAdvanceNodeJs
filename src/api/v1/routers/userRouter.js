const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const { auth } = require("./../middleware/userAuth");
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUser);
module.exports = router;
