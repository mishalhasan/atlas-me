const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");

router.get("/:username/pins", usersController.getPublicProfile);

module.exports = router;
