// import { useRef, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// function GeoMap({ searchResult }) {
//   const mapRef = useRef();
//   const mapContainerRef = useRef();

//   useEffect(() => {
//     mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       center: [3.257, 23.745],
//       zoom: 1.45,
//       minZoom: 1,
//       maxZoom: 18,
//       projection: "mercator",
//       config: {
//         basemap: {
//           theme: "monochrome",
//           lightPreset: "dusk",
//           showPointOfInterestLabels: false,
//           showTransitLabels: false,
//           showRoadLabels: false,
//         },
//       },
//     });

//     console.log("sr", searchResult);

//     return () => {
//       mapRef.current.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (searchResult) {
//       const { longitude, latitude } = searchResult;
//       const zoomLevel = {
//         country: 3,
//         region: 4,
//         place: 7,
//       };

//       console.log(zoomLevel[searchResult.type]);
//       console.log("HELP");
//       mapRef.current.flyTo({
//         center: [longitude, latitude], // [longitude, latitude]
//         zoom: zoomLevel[searchResult.type],
//         speed: 0.8, // optional animation speed
//         curve: 2, // optional curve of animation
//       });

//       new mapboxgl.Popup({ closeOnClick: false, buttonClose: false })
//         .setLngLat([longitude, latitude])
//         .setHTML("<button>Visited</button>")
//         .setMaxWidth("300px")
//         .addTo(mapRef.current);
//     }
//   }, [searchResult]);

//   return (
//     <>
//       <div
//         id="map-container"
//         className="w-screen h-screen bg-gray-100 flex items-center justify-center"
//         ref={mapContainerRef}
//       ></div>
//     </>
//   );
// }
// export default GeoMap;

import Map, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Heart, Check, X } from "lucide-react";
import { usePopup } from "@/hooks/usePopup";

function GeoMap({ searchResult }) {
  const {
    showPopup,
    setZoomLevel,
    mapRef,
    handleVisited,
    handleWishlist,
    handleCancel,
  } = usePopup(searchResult);

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
          <div className="flex flex-col gap-2 min-w-20">
            <span className="text-base text-[#1a1a1a] mb-1 font-playfair">
              Add Pin
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleWishlist}
                //className=" w-full bg-white border-[#d4a843] border-[1.5px] hover:border-[rgba(212,168,67,0.1)] hover:bg-[rgba(212,168,67,0.1)] text-[#92700a] font-medium rounded-md px-1 py-1 font-sans cursor-pointer"
                className=" w-full bg-[rgba(212,168,67,0.1)] border-[#d4a843] border-[1.5px] hover:border-[rgba(212,168,67,0.1)] hover:bg-[#d4a843]/30 text-[#92700a] font-medium rounded-md px-1 py-1 font-sans cursor-pointer"
              >
                <Heart className=" inline-flex items-center gap-2" size={15} />
                {"  "}
                Wishlist
              </button>
              <button
                onClick={handleVisited}
                className=" w-full bg-[#d4a843] hover:bg-[#c49b38]  text-[#5c3d00] font-medium rounded-md px-1 py-2 font-sans cursor-pointer"
              >
                <Check
                  className="bg-white/0.9 inline-flex items-center gap-2"
                  size={15}
                />{" "}
                Visited
              </button>
            </div>
            <button
              onClick={handleCancel}
              className=" self-center w-fit hover:text-[#b8960c] text-[#c4a882] text-sm rounded-md px-4 py-2 font-sans cursor-pointer "
            >
              Cancel
            </button>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default GeoMap;
