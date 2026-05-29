const express = require("express");
const router = express.Router();
const pinsController = require("../controllers/pinsController.js");
const authenticateToken = require("../middleware/auth.js");

router.get("/", authenticateToken, pinsController.loadPins);
router.post("/", authenticateToken, pinsController.createPin);
router.patch("/:id/types", authenticateToken, pinsController.updatePinType);

// router.patch("/:id/types", authenticateToken, pinsController.addPinType);
// router.delete("/:id/types", authenticateToken, pinsController.deletePinType);
router.delete("/:id", authenticateToken, pinsController.deletePin);

module.exports = router;

