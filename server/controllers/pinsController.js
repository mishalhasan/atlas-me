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
        "id",
        "name",
        "latitude",
        "longitude",
        "types",
        "countryCode",
        "continent",
        "region",
        "mapboxId",
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
    const mapboxId = req.body.mapboxId?.trim();

    // fallback to continent if region is not provided
    const region = req.body.region?.trim() || continent;

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if (
      !mapboxId ||
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
        error: "Invalid field typeof of one or more.",
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
      mapboxId,
      name,
      latitude,
      longitude,
      types: [type],
      countryCode,
      continent,
      region,
    };
    const pin = await db.Pin.create(rawPin);

    //Return response back to client
    return res.json({
      message: "Pin addded successfully.",
      pin: {
        id: pin.id,
        mapboxId: pin.mapboxId,
        name: pin.name,
        latitude: pin.latitude,
        longitude: pin.longitude,
        types: pin.types,
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
 * Add a new type to an existing pin for a specific user via PATCH request.
 * Endpoint: api/pins/:id/types
 */
exports.addPinType = async (req, res) => {
  try {
    //Validate request
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const newType = req.body?.type.trim().toLowerCase();
    if (!newType) {
      return res.status(400).json({ error: "Missing 'type' field." });
    }

    const validTypes = ["visited", "wishlist"];
    if (!validTypes.includes(newType)) {
      return res.status(400).json({
        error: `Invalid type. Sent type is '${newType}'`,
      });
    }

    const pin = await db.Pin.findByPk(id);

    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }

    //Check for duplicates
    if (pin.types.includes(newType)) {
      return res
        .status(409)
        .json({ error: "Duplicate entry. Type already exists." });
    }

    //Update array and pin
    const updatedPin = await pin.update({
      types: [...pin.types, newType],
    });

    //Return response back to client
    return res.json({
      message: "Pin updated successfully",
      pin: {
        id: updatedPin.id,
        mapboxId: updatedPin.mapboxId,
        name: updatedPin.name,
        latitude: updatedPin.latitude,
        longitude: updatedPin.longitude,
        types: updatedPin.types,
        countryCode: updatedPin.countryCode,
        continent: updatedPin.continent,
        region: updatedPin.region,
      },
    });
  } catch (error) {
    console.error("Add type by ID request failed:", error);
    res.status(500).json({ error: "Server error. Failed to add pin type." });
  }
};

/**
 * Remove a type from a pin by id for a specific user via DELETE request.
 * Endpoint: api/pins/:id/types
 */
exports.deletePinType = async (req, res) => {
  try {
    //Validate request
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const pin = await db.Pin.findByPk(id);

    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }

    // Prevent removing the last remaining type
    if (pin.types.length === 1) {
      return res.status(400).json({
        error: "A pin must have at least one type.",
      });
    }

    const removeType = req.body?.type.trim().toLowerCase();
    if (!removeType) {
      return res.status(400).json({ error: "Missing 'type' field." });
    }

    const validTypes = ["visited", "wishlist"];
    if (!validTypes.includes(removeType)) {
      return res.status(400).json({
        error: `Invalid type. Sent type is '${removeType}'`,
      });
    }

    //Remove from array
    const updatedTypes = pin.types.filter((type) => type !== removeType);

    //Update pin
    const updatedPin = await pin.update({
      types: updatedTypes,
    });

    //Return response back to client
    return res.json({
      message: "Pin type removed successfully",
      pin: {
        id: updatedPin.id,
        mapboxId: updatedPin.mapboxId,
        name: updatedPin.name,
        latitude: updatedPin.latitude,
        longitude: updatedPin.longitude,
        types: updatedPin.types,
        countryCode: updatedPin.countryCode,
        continent: updatedPin.continent,
        region: updatedPin.region,
      },
    });
  } catch (error) {
    console.error("Delete type by ID request failed:", error);
    res.status(500).json({ error: "Server error. Failed to delete pin type." });
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
