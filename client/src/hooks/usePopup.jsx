import { useRef, useState, useEffect } from "react";
//import "mapbox-gl/dist/mapbox-gl.css";
import { usePins } from "./usePins";

export function usePopup(searchResult) {
  const mapRef = useRef();
  const { addPin, deletePin, loading, error, mapBoxDuplicateCheck } = usePins();

  const [showPopup, setShowPopup] = useState(false);
  const [pinExists, setPinExists] = useState(false);
  //const [zoomComplete, setZoomComplete] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.45);


  const zoomPossibleLevel = {
    country: 3,
    region: 4,
    place: 7,
  };

  /** HANDLE FUNCTIONS */

  /**
   * Adds a pin with a specific type
   */
  const handleAddPin = async (type) => {
    await addPin({
      ...searchResult,
      type,
    });

    //Close pop-up
    setShowPopup(false);

    //Trigger addPin UI
    return true;
  };

  /**
   * Closes the popup without performing any action
   */
  const handleCancel = () => {
    console.log("Cancel");
    setShowPopup(false);
  };

  /** USE Effects */
  useEffect(() => {
    if (searchResult) {
      const { longitude, latitude } = searchResult;

      //Reset Popup States
      setShowPopup(false);
      setPinExists(false);

      console.log(zoomLevel[searchResult.type]);
      console.log("HELP");
      console.log("searchResult in useEffect", searchResult);
      mapRef.current.flyTo({
        center: [longitude, latitude], // [longitude, latitude]
        zoom: zoomPossibleLevel[searchResult.type],
        speed: 0.8, // optional animation speed
        curve: 2, // optional curve of animation
      });
    }
  }, [searchResult]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(zoomPossibleLevel).includes(zoomLevel)) {
        console.log("exists!", zoomLevel);
        setShowPopup(true);

        if (mapBoxDuplicateCheck(searchResult.mapboxId)) {
          console.log(true);
          setPinExists(true);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [zoomLevel]);

  return {
    showPopup,
    setZoomLevel,
    mapRef,
    handleAddPin,
    handleCancel,
    pinExists,
  };
}
