import Map, { Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePopup } from "@/hooks/usePopup";
import AddPin from "./popup/AddPin";
import MarkerPin from "./pins/MarkerPin";
import { usePins } from "@/hooks/usePins";
import ManagePin from "./popup/ManagePin";

function GeoMap({ searchResult }) {
  const {
    showPopup,
    setZoomLevel,
    mapRef,
    handleCancel,
    handleAddPin,
    //pinExists,
    handleDelete,
    handleUpdate,
  } = usePopup(searchResult);
  const { pins, loading, error, mapBoxDuplicateCheck } = usePins();
  //const matchedPin = mapBoxDuplicateCheck(searchResult?.mapboxId);

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
      <NavigationControl />

      {showPopup && (
        <Popup
          longitude={searchResult.longitude}
          latitude={searchResult.latitude}
          closeButton={false}
          anchor="top"
          offset={10}
          key={searchResult?.popupKey}
        >
          {mapBoxDuplicateCheck(searchResult?.mapboxId) ? (
            <ManagePin
              handleCancel={handleCancel}
              place={searchResult.name}
              matchedPin={mapBoxDuplicateCheck(searchResult?.mapboxId)}
              loading={loading}
              error={error}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              key={searchResult.mapboxId}
            />
          ) : (
            <AddPin
              handleCancel={handleCancel}
              handleAddPin={handleAddPin}
              searchResult={searchResult}
              place={searchResult.name}
              loading={loading}
              error={error}
            />
          )}
        </Popup>
      )}

      {pins.length > 0 &&
        pins.map((pin) => <MarkerPin key={pin.id} pin={pin} />)}
    </Map>
  );
}

export default GeoMap;
