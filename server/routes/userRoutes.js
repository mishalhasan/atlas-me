const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// router.get("/:username", userController.getPublicProfile);

// - [ ] Story 17: `GET /api/public/:username` — public profile
//GET /api/users/:username/pins

module.exports = router;
