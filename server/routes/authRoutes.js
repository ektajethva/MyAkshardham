const express = require("express");
const { loginUser, registerUser, googleLogin } = require("../controllers/authController");
const router = express.Router();

router.get("/google", googleLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;


