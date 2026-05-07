const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authenticateToken = require("../middleware/auth.js");
const rateLimit = require("express-rate-limit");

//Rate-limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  message: {
    error: "Too many attempts. Try again later.",
  },
});

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;
