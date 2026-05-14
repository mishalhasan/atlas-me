import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Map from "./pages/Map";
import Stats from "./pages/Stats";
import Captured from "./pages/Captured";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/map" element={<Map />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/captured/:username" element={<Captured />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
