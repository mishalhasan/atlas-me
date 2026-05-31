import { useRef, useState, useEffect, useDebugValue } from "react";
import { usePins } from "./usePins";
import { toast } from "sonner";
export function usePopup(searchResult) {
  const mapRef = useRef();
  const {
    addPin,
    deletePin,
    updatePinType,
    // loading,
    error,
    setError,
  } = usePins();

  const [showPopup, setShowPopup] = useState(false);
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
  const handleAddPin = async (searchPin, type) => {
    if (!searchPin || !type) return;

    const newPin = {
      ...searchPin,
      type,
    };
    const result = await addPin(newPin);
    if (result) {
      setShowPopup(false);
      toast.success(`Pin added to ${type}`);
    }

    //Close pop-up
    setShowPopup(false);

    //Trigger addPin UI
    // return newPin;
  };

  /**
   * Closes the popup without performing any action
   */
  const handleCancel = () => {
    console.log("Cancel");
    setShowPopup(false);
    setError(false);
  };

  /**
   * Update pin based on user interaction
   */
  const handleUpdate = async (pinId, types) => {
    if (!pinId || !types) return;
    console.log("Update");

    const result = await updatePinType(pinId, types);
    if (result) {
      setShowPopup(false);
      toast.success("Pin updated");
    }
  };

  /**
   * Delete pin based on user interaction
   */
  const handleDelete = async (pinId) => {
    if (!pinId) return;

    console.log(pinId);
    console.log("Delete");
    const result = await deletePin(pinId);
    if (result) {
      setShowPopup(false);
      toast.success("Pin deleted");
    }
  };
  /** USE Effects */
  useDebugValue(searchResult);
  useDebugValue(showPopup);

  useEffect(() => {
    //Check if new search or old search

    if (searchResult) {
      const { longitude, latitude } = searchResult;

      //Reset Popup States
      setShowPopup(false);

      console.log(zoomLevel[searchResult.type]);
      console.log("HELP");
      console.log("searchResult in useEffect", searchResult);

      mapRef.current.jumpTo({
        center: [longitude, latitude],
        zoom: zoomPossibleLevel[searchResult.type],
      });

      setShowPopup(true);
    }
  }, [searchResult]);

  return {
    showPopup,
    setZoomLevel,
    mapRef,
    handleAddPin,
    handleCancel,
    handleDelete,
    handleUpdate,
  };
}
