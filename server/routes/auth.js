// routes for signup, signin, password reset
const express = require("express");
const router = express.Router();
const { signup, signin, resetPassword } = require("../handlers/auth");

// path: /api/auth
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/resetpassword", resetPassword);

module.exports = router;
