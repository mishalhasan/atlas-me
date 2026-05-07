const express = require("express");
const router = express.Router();
const pinsController = require("../controllers/pinsController.js");
const authenticateToken = require("../middleware/auth.js");

router.get("/", authenticateToken, pinsController.loadPins);
router.post("/", authenticateToken, pinsController.createPin);
router.patch("/:id", authenticateToken, pinsController.updatePinType);
router.delete("/:id", authenticateToken, pinsController.deletePin);

module.exports = router;
