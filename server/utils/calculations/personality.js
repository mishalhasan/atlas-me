const getTravelRank = (countries, continents) => {
  if (countries > 20 || continents >= 4) {
    return "The Globetrotter";
  } else if ((countries >= 11 && countries <= 20) || continents === 3) {
    return "The Explorer";
  } else if ((countries >= 6 && countries <= 10) || continents === 2) {
    return "The Adventurer";
  } else if (countries >= 3 && countries <= 5) {
    return "The Wanderer";
  } else {
    return "The Homebody";
  }
};

module.exports = { getTravelRank };
