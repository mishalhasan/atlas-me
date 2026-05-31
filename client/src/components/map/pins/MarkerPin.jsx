import Pin from "./Pin";
import { Marker } from "react-map-gl";

export default function MarkerPin({ pin }) {
  if (!pin || !pin.types) {
    return;
  }

  let mapPin;
  if (pin?.types.includes("visited") && pin?.types.includes("wishlist")) {
    mapPin = <Pin type="visited" />;
  } else if (pin?.types.includes("visited")) {
    mapPin = <Pin type="visited" />;
  } else if (pin?.types.includes("wishlist")) {
    mapPin = <Pin type="wishlist" />;
  }

  return (
    <Marker
      longitude={pin.longitude}
      latitude={pin.latitude}
      anchor="center"
      offset={[0, -20]}
    >
      {mapPin}
    </Marker>
  );
}
