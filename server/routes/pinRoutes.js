const express = require("express");
const router = express.Router();
const pinsController = require("../controllers/pinController.js");

// router.get("/", pinsController.loadPins);
// router.post("/", pinsController.createPin);
// router.patch("/:id", pinsController.updatePin);
// router.delete("/:id", pinsController.deletePin);

// - [ ] Story 5BE: `POST /api/pins` — create pin
// - [ ] Story 6BE: `GET /api/pins` — load user's pins
// - [ ] Story 7BE: `PUT /api/pins/:id` — toggle pin type
// - [ ] Story 8BE: `DELETE /api/pins/:id` — delete pin
// - [ ] Story 17: `GET /api/public/:username` — public profile

module.exports = router;
