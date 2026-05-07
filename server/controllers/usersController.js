const db = require("../models/initModels");

/**
 * Retrieve all pins of a specific user via public GET request.
 * Endpoint: /api/users/:username/pins
 */
exports.getPublicProfile = async (req, res) => {
  try {
    //Validate request
    const username = req.params.username?.trim().toLowerCase();
    if (!username) {
      return res.status(400).json({ error: "Missing required field" });
    }

    //Locate user
    const user = await db.User.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ["password"],
      },
      raw: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Retrieve pins
    const pins = await db.Pin.findAll({
      where: {
        userId: user.id,
      },
      attributes: [
        "name",
        "latitude",
        "longitude",
        "type",
        "countryCode",
        "continent",
        "region",
      ],
    });

    //Return response back to client
    return res.json({ username: user.username, count: pins.length, pins });
  } catch (error) {
    console.error("Get all pins public request failed:", error);
    res.status(500).json({ error: "Server error. Failed to retrieve pins." });
  }
};
