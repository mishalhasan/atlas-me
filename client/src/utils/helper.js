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
