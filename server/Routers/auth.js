const router = require("express").Router();
const { register, login } = require("../Controllers/AuthController");

// REGISTER
router.route("/register").post(register);

// LOGIN
router.route("/login").post(login);

module.exports = router;
