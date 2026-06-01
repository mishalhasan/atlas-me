const getVisitedPins = (pins) => {
  const visitedPins = pins.filter((pin) => pin.types.includes("visited"));
  return visitedPins;
};

const getWishlistPins = (pins) => {
  const wishlistPins = pins.filter((pin) => pin.types.includes("wishlist"));
  return wishlistPins;
};

const getTotalCountries = (pins) => {
  const totalCountries = new Set(pins.map((pin) => pin.countryCode)).size;
  return totalCountries;
};

const getTotalContinents = (pins) => {
  const totalContinents = new Set(pins.map((pin) => pin.continent)).size;
  return totalContinents;
};

const percentWorld = (pins) => {
  const percentWorld = Math.round((getTotalCountries(pins) / 140) * 100);
  return percentWorld;
};

const getRecentWish = (pins) => {
  if (pins.length === 0) return null;

  let latest = pins[0];

  for (let i = 1; i < pins.length; i++) {
    if (pins[i].createdAt > latest.createdAt) {
      latest = pins[i];
    }
  }

  return latest;
};

module.exports = {
  getVisitedPins,
  getWishlistPins,
  getTotalCountries,
  getTotalContinents,
  percentWorld,
  getRecentWish,
};
