const db = require("../models/initModels");
const ct = require("countries-and-timezones");

/**
 * Retrieve all pins of a specific user via GET request.
 * Endpoint: api/pins/
 */
exports.loadPins = async (req, res) => {
  try {
    const pins = await db.Pin.findAll({
      where: {
        userId: req.user.id,
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
    return res.json({ count: pins.length, pins });
  } catch (error) {
    console.error("Get all pins request failed:", error);
    res.status(500).json({ error: "Server error. Failed to retrieve pins." });
  }
};

/**
 * Add pin for a specific user via POST request.
 * Endpoint: api/pins/
 */
exports.createPin = async (req, res) => {
  try {
    //Validation of request body
    const name = req.body.name?.trim();
    const type = req.body.type?.trim();
    const countryCode = req.body.countryCode?.trim().toUpperCase();
    const continent = req.body.continent?.trim();

    // fallback to continent if region is not provided
    const region = req.body.region?.trim() || continent;

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if (
      !name ||
      !type ||
      !countryCode ||
      !continent ||
      !region ||
      latitude == null ||
      longitude == null
    ) {
      return res
        .status(400)
        .json({ error: "Missing one or more required fields." });
    }

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      typeof countryCode !== "string"
    ) {
      return res.status(400).json({
        error: "Invalid field types.",
      });
    }

    //Coordinates: Latitude & Longitude
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({ error: "Coordinates out of range." });
    }

    //Type
    const validTypes = ["visited", "wishlist"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Sent type is ${type}`,
      });
    }

    //Country Code
    const country = ct.getCountry(countryCode);
    if (!country) {
      return res.status(400).json({
        error: `Invalid country code. Sent type is '${countryCode}'`,
      });
    }

    //Continents
    const validContinents = [
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ];
    if (!validContinents.includes(continent)) {
      return res.status(400).json({
        error: `Invalid continent. Sent continent is '${continent}'`,
      });
    }

    //Add pin to DB
    const rawPin = {
      userId: req.user.id,
      name,
      latitude,
      longitude,
      type,
      countryCode,
      continent,
      region,
    };
    const pin = await db.Pin.create(rawPin);

    //Return response back to client
    return res.json({
      message: "Pin addded successfully.",
      pin: {
        name: pin.name,
        latitude: pin.latitude,
        longitude: pin.longitude,
        type: pin.type,
        countryCode: pin.countryCode,
        continent: pin.continent,
        region: pin.region,
      },
    });
  } catch (error) {
    console.error("Add pin request failed:", error);
    res.status(500).json({ error: "Server error. Failed to add pin." });
  }
};

/**
 * Update pin's type by id for a specific user via PATCH request.
 * Endpoint: api/pins/:id
 */
exports.updatePinType = async (req, res) => {
  try {
    //Validate request
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const type = req.body?.type;
    if (!type) {
      return res.status(400).json({ error: "Missing 'type' field." });
    }

    const validTypes = ["visited", "wishlist"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Sent type is '${type}'`,
      });
    }

    const pin = await db.Pin.findByPk(id);

    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }

    const updatedPin = await pin.update({
      type,
    });

    //Return response back to client
    return res.json({
      message: "Pin updated successfully",
      pin: {
        name: updatedPin.name,
        latitude: updatedPin.latitude,
        longitude: updatedPin.longitude,
        type: updatedPin.type,
        countryCode: updatedPin.countryCode,
        continent: updatedPin.continent,
        region: updatedPin.region,
      },
    });
  } catch (error) {
    console.error("Update by ID request failed:", error);
    res.status(500).json({ error: "Server error. Failed to update pin." });
  }
};

/**
 * Delete pin by id for a specific user via DELETE request.
 * Endpoint: api/pins/:id
 */
exports.deletePin = async (req, res) => {
  try {
    //Validate request
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res
        .status(400)
        .json({ error: "Invalid ID. Expected an integer value." });
    }

    const type = req.body?.type;
    if (!type) {
      return res.status(400).json({ error: "Missing 'type' field." });
    }
    const validTypes = ["visited", "wishlist"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Sent type is '${type}'`,
      });
    }

    const deleted = await db.Pin.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: "Pin not found" });
    }

    //Return response back to client
    return res.json({
      message: "Pin deleted successfully",
    });
  } catch (error) {
    console.error("Delete by ID request failed:", error);
    res.status(500).json({ error: "Server error. Failed to delete pin." });
  }
};
