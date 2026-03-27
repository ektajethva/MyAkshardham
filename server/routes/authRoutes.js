const express = require("express");
const { loginUser, registerUser, googleLogin, logout , saveUser, updateProfile, getUser } = require("../controllers/authController");
const router = express.Router();
const upload = require("../middleware/upload")

router.get("/google", googleLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logout);
router.post("/save-user",saveUser);
// router.put("/updateUser",upload.single("image"),updateProfile)
router.put("/updateUser", (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      console.log("MULTER ERROR:", err.message);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, updateProfile);
router.get("/getUser/:id",getUser)

module.exports = router;


