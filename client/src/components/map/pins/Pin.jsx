import { MapPin } from "lucide-react";

export default function Pin({ type }) {
  if (type === "wishlist") {
    return (
      <MapPin
        size={30}
        color="#fee685"
        fill="#d4a843"
        strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 1px black)" }}
      />
    );
  }

  if (type === "visited") {
    return (
      // <MapPin
      //   size={30}
      //   color="#90a1b9"
      //   fill="#4F46E5"
      //   strokeWidth={1.5}
      //   style={{ filter: "drop-shadow(0 0 1px black)" }}
      // />
      <MapPin
        size={30}
        color="#A78BFA" 
        fill="#4B0082" 
        strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 1px black)" }}
      />
    );
  }
}
