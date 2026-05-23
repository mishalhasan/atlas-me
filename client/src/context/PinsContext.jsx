import { createContext, useState, useEffect } from "react";
import api from "@/api/api";
import { getContinent, validateId } from "@/utils/helper";

export const PinsContext = createContext();

export function PinsProvider({ children }) {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /*** CRUD FUNCTIONS ***/

  const addPin = async (pin) => {
    //Guard against empty searchResult
    if (!pin || pin.length === 0) {
      //   console.error("Error in handleVisited", pin);
      throw new Error(`Error with parameter sent in addPin: $(pin)`);
    }

    try {
      setLoading(true);
      setError(false);

      const countryCode = pin.countryCode;

      const res = await api.post("/api/pins/", {
        name: pin.name,
        latitude: pin.latitude,
        longitude: pin.longitude,
        type: pin.type,
        countryCode,
        continent: getContinent(countryCode),
        region: pin.region,
        mapboxId: pin.mapboxId,
      });

      console.log(res?.data?.pin);
      console.log("Add pin success");

      setPins((prev) => [...prev, res.data.pin]);
      return res.data.pin;
    } catch (error) {
      console.error(
        error.response?.data?.error || error.message || "Unknown error",
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deletePin = async (pinId) => {
    //Validate function call
    const id = validateId(pinId);
    if (!checkPinExists(id)) return;

    try {
      setLoading(true);
      setError(false);

      //API call
      const res = await api.delete(`/api/pins/${id}`);

      const newPins = pins.filter((pin) => pin.id !== id);
      setPins(newPins);
      console.log("Delete pin success");
    } catch (error) {
      console.error(
        error.response?.data?.error || error.message || "Unknown error",
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadPins = async () => {
    try {
      setLoading(true);
      setError(false);

      //API call
      const res = await api.get("api/pins/");

      setPins(res.data.pins);

      console.log("Load pin success");
    } catch (error) {
      console.error(
        error.response?.data?.error || error.message || "Unknown error",
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addPinType = async (pinId, type) => {
    //Validate function call
    const id = validateId(pinId);
    if (!checkPinExists(id)) return;

    try {
      setLoading(true);
      setError(false);

      //API call
      const res = await api.patch(`/api/pins/${id}/types`, { type });

      setPins((prev) => [...prev, res.data.pin]);
      console.log("Update pin type add success");
    } catch (error) {
      console.error(
        error.response?.data?.error || error.message || "Unknown error",
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deletePinType = async (pinId, type) => {
    //Validate function call
    const id = validateId(pinId);
    if (!checkPinExists(id)) return;

    try {
      setLoading(true);
      setError(false);

      //API call
      const res = await api.delete(`/api/pins/${id}/types`, { type });

      setPins((prev) => [...prev, res.data.pin]);
      console.log("Update pin type removal success");
    } catch (error) {
      console.error(
        error.response?.data?.error || error.message || "Unknown error",
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /*** HELPER FUNCTIONS ***/
  const checkPinExists = (pinId) => {
    console.log(pins);
    const pinExists = pins.some((pin) => pin.id === pinId);
    return pinExists;
  };

  const findPin = (mapboxId) => {
    //Check for parameters
    if (!mapboxId) throw new Error("mapboxId missing");

    console.log(pins);
    const foundPin = pins.find((pin) => pin.mapboxId === mapboxId);

    return foundPin ? foundPin.id : null;
  };

  /** Duplicate check for mapBox pin **/
  const mapBoxDuplicateCheck = (mapboxId) => {
    //Guard
    if (!mapboxId) {
      throw new Error(`Error missing parameters `);
    }

    const duplicateExists = pins.filter((pin) => pin.mapboxId === mapboxId);

    if (duplicateExists.length === 0) return null;

    return duplicateExists;
  };

  /*** USE EFFECTS ***/

  useEffect(() => {
    loadPins();
    console.log("pins in useEffect", pins);
  }, []);

  return (
    <PinsContext.Provider
      value={{
        // setPins,
        pins,
        loading,
        error,
        addPin,
        deletePin,
        mapBoxDuplicateCheck,
        deletePinType,
        addPinType,
      }}
    >
      {children}
    </PinsContext.Provider>
  );
}
