import "./App.css";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem" }}>
        AtlasMe
      </p>
      <Button>Click me</Button>
      <Search size={24} />
    </div>
  );
}
