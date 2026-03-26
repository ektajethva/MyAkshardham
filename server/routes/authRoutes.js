const express = require("express");
const { loginUser, registerUser, googleLogin, logout , saveUser } = require("../controllers/authController");
const router = express.Router();

router.get("/google", googleLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logout);
router.post("/save-user",saveUser);

module.exports = router;


