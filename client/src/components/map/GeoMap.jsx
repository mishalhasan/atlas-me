import Map, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePopup } from "@/hooks/usePopup";
import PopupContent from "./PopupContent";

function GeoMap({ searchResult }) {
  const { showPopup, setZoomLevel, mapRef, handleCancel, handleAddPin } =
    usePopup(searchResult);

  //const { addPin, deletePin, loading, error, mapBoxDuplicateCheck } = usePins();
  // const { handleCancel, handleAddPin, showPopup, setZoomLevel, mapRef } =
  //   usePopup({
  //     addPin,
  //     deletePin,
  //     mapBoxDuplicateCheck,
  //     searchResult,
  //   });

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 3.257,
        latitude: 23.745,
        zoom: 1.45,
      }}
      attributionControl={false}
      onZoom={(evt) => setZoomLevel(evt.viewState.zoom)} // Track zoom
      minZoom={1}
      maxZoom={18}
      projection="mercator"
      mapStyle="mapbox://styles/mapbox/standard"
      style={{ width: "100vw", height: "100vh" }}
      config={{
        basemap: {
          theme: "monochrome",
          lightPreset: "dusk",
          showPointOfInterestLabels: false,
          showTransitLabels: false,
          showRoadLabels: false,
        },
      }}
    >
      {showPopup && (
        <Popup
          longitude={searchResult.longitude}
          latitude={searchResult.latitude}
          closeButton={false}
          anchor="top"
          offset={10}
        >
          <PopupContent
            handleCancel={handleCancel}
            handleAddPin={handleAddPin}
            place={searchResult.name}
          />
        </Popup>
      )}
    </Map>
  );
}

export default GeoMap;
