import { useRef, useState, useEffect } from "react";
//import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import api from "@/api/api";

export function usePopup(searchResult) {
  const mapRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [zoomComplete, setZoomComplete] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.45);
  const zoomPossibleLevel = {
    country: 3,
    region: 4,
    place: 7,
  };

  /** HANDLE FUNCTIONS */

  const handleVisited = () => {
    console.log("Visited");
  };
  const handleWishlist = () => {
    console.log("Wishlist");
  };
  const handleCancel = () => {
    console.log("Cancel");
    setShowPopup(false);
  };

  /** USE Effects */
  useEffect(() => {
    if (searchResult) {
      const { longitude, latitude } = searchResult;

      setShowPopup(false);

      console.log(zoomLevel[searchResult.type]);
      console.log("HELP");
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
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [zoomLevel]);

  return {
    showPopup,
    setZoomLevel,
    mapRef,
    handleVisited,
    handleWishlist,
    handleCancel,
  };
}
