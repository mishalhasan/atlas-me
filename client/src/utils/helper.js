import { countries } from "countries-list";

export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) return "Please enter a valid email address";

  return "";
};

export const getContinent = (countryCode) => {
  const continentCode = countries[countryCode]?.continent;

  if (!continentCode) return "";

  const continentNames = {
    AF: "Africa",
    AN: "Antarctica",
    AS: "Asia",
    EU: "Europe",
    NA: "North America",
    OC: "Oceania",
    SA: "South America",
  };

  return continentNames[continentCode];
};

export function validateId(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId < 1) {
    throw new Error(`Invalid id: ${id}`);
  }

  return parsedId;
}

/**
 * Returns an array of pins, keeping only one pin per unique countryCode
 * @param {Array} pins - array of pin objects
 * @returns {Array} uniquePins - one pin per country
 */
export function getUniqueCountries(pins) {
  const countriesDisplayed = {};
  const uniquePins = [];

  for (const pin of pins) {
    if (!countriesDisplayed[pin.countryCode]) {
      uniquePins.push(pin);
      countriesDisplayed[pin.countryCode] = true;
    }
  }

  return uniquePins;
}

export function getEmojiFlag(iso) {
  if (!iso || iso.length !== 2) return "";

  const letterOne = iso[0].toUpperCase().charCodeAt(0);
  const letterTwo = iso[1].toUpperCase().charCodeAt(0);
  const offsetOne = letterOne - "A".charCodeAt(0);
  const offsetTwo = letterTwo - "A".charCodeAt(0);

  //let emojiCode = 0x1f1e6 + offsetOne;
  const codeOne = String.fromCodePoint(0x1f1e6 + offsetOne);
  const codeTwo = String.fromCodePoint(0x1f1e6 + offsetTwo);

  const emoji = codeOne + codeTwo;
  return emoji;
}


