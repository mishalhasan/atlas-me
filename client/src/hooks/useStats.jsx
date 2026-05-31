import { usePins } from "./usePins";
import { useMemo } from "react";

export function useStats() {
  const { pins } = usePins();

  const visited = useMemo(
    () => pins.filter((pin) => pin.types.includes("visited")),
    [pins],
  );

  const VisitedCountriesCount = useMemo(
    () => new Set(visited.map((pin) => pin.countryCode)).size,
    [visited],
  );

  const VisitedContinentsCount = useMemo(
    () => new Set(visited.map((pin) => pin.continent)).size,
    [visited],
  );

  const VisitedTotalPins = visited.length;

  const countriesCount = useMemo(
    () => new Set(pins.map((pin) => pin.countryCode)).size,
    [pins],
  );

  const continentsCount = useMemo(
    () => new Set(pins.map((pin) => pin.continent)).size,
    [pins],
  );

  const totalPins = pins.length;

  return {
    countriesCount,
    continentsCount,
    totalPins,
    VisitedCountriesCount,
    VisitedContinentsCount,
    VisitedTotalPins,
  };
}
