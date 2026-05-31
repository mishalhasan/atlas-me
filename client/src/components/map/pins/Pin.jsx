import { MapPin } from "lucide-react";

export default function Pin({ type, size = 30 }) {
  if (type === "wishlist") {
    return (
      <MapPin
        size={size}
        color="#fee685"
        fill="#d4a843"
        strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 1px black)" }}
      />
    );
  }

  if (type === "visited") {
    return (
      <MapPin
        size={size}
        color="#A78BFA"
        fill="#4B0082"
        strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 1px black)" }}
      />
    );
  }
}
