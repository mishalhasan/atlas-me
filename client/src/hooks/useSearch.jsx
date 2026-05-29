import { useEffect, useState, useDebugValue } from "react";
import axios from "axios";

export function useSearch(initialQuery = null) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(null);
  const [text, setText] = useState("");
  const [searchLocations, setSearchLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [popupKey, setPopupKey] = useState(0);

  // useDebugValue(`selectedLocation: ${selectedLocation}`);
  // useDebugValue(`Error: ${errorMsg}`);
  // useDebugValue(`Loadng: ${loading}`);
  // useDebugValue(`Text: ${text}`);

  /*** Handler Functions ***/
  const fetchMapData = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&language=en&types=country,region,place,locality&limit=5&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
      );
      console.log("res.data", res.data);
      console.log("res.data.resp", res.data.features);

      if (res.data.features && res.data.features.length === 0) {
        return [];
      }

      const locations = res.data.features;
      const newLocations = locations.map((location) => {
        const country = location.properties.context.country?.name || "";

        return {
          mapboxId: location.id,
          name: location.properties.name,
          countryCode: location.properties.context.country?.country_code,
          country,
          region: location.properties.context.region?.name || country,
          display: location.properties.full_address,
          longitude: location.properties.coordinates.longitude,
          latitude: location.properties.coordinates.latitude,
          type: location.properties["feature_type"],
        };
      });

      return newLocations;
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleOnSearchChange = (e) => {
    const input = e.target.value;
    setText(input);
    if (errorMsg !== "") setErrorMsg("");

    if (input.length > 3) setQuery(input);
    if (input.length < 3) setSearchLocations([]);
    console.log("Input: ", input);
  };

  /** Fully clears search UI */
  const handleClearSearch = () => {
    // setText("");
    // setQuery(null);
    // setDebouncedQuery(null);
    // setLoading(false);
    // setSearchLocations([]);
    resetSearchState();
    setErrorMsg("");
  };

  /** Resets search state but preserves errors */
  const resetSearchState = () => {
    setText("");
    setQuery(null);
    setDebouncedQuery(null);
    setLoading(false);
    setSearchLocations([]);
  };

  const handleOnSearchSubmit = async (e) => {
    e.preventDefault();
    //Added on top to prevent search suggestions happening due to late debouncedQuery effect
    setQuery(null);
    setDebouncedQuery(null);
    const geoCodeLocations = await fetchMapData(text);
    console.log("Inside searchsubmit");
    //console.log(geoCodeLocations);
    //console.log(typeof geoCodeLocations);
    // console.log(Object.keys(geoCodeLocations));
    if (geoCodeLocations.length === 0) {
      setErrorMsg("No search results found");
      resetSearchState(); //clears
      return;
    } else {
      const newPopupKey = popupKey + 1;
      setPopupKey(newPopupKey);
      setSelectedLocation({ ...geoCodeLocations[0], popupKey: newPopupKey });
      // setSelectedLocation(geoCodeLocations[0]);
      handleClearSearch();
    }
  };

  const handleSearchDropdown = (locationId) => {
    const selectedLoc = searchLocations.find(
      (searchLocation) => searchLocation.mapboxId === locationId,
    );
    const newPopupKey = popupKey + 1;
    setPopupKey(newPopupKey);
    setSelectedLocation({ ...selectedLoc, popupKey: newPopupKey });
    handleClearSearch();
  };

  /** USE-Effects **/

  /* Setup debounced query */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  /*Complete API Call to MapBox*/
  useEffect(() => {
    const loadSuggestions = async () => {
      const geoCodeLocations = await fetchMapData(debouncedQuery);
      setSearchLocations(geoCodeLocations);
    };
    if (debouncedQuery) loadSuggestions();
  }, [debouncedQuery]);

  /*Show Loading only after major delay*/
  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 200); // only show after 200ms
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  return {
    handleOnSearchChange,
    handleOnSearchSubmit,
    handleClearSearch,
    handleSearchDropdown,
    showLoading,
    errorMsg,
    text,
    searchLocations,
    selectedLocation,
  };
}
