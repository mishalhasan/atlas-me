import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PinsProvider } from "./context/PinsContext";

import AuthGuard from "./routes/guards/authGuard.jsx";
import ProtectedLayout from "./routes/layouts/ProtectedLayout";

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Map from "./pages/Map";
import Stats from "./pages/Stats";
import Captured from "./pages/Captured";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route path="/" element={<Home />} />
          <Route
            element={
              <AuthGuard>
                <PinsProvider>
                  <ProtectedLayout />
                </PinsProvider>
              </AuthGuard>
            }
          >
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/map" element={<Map />} />
            <Route path="/stats" element={<Stats />} />
          </Route>
        </Route>
        <Route path="/captured/:username" element={<Captured />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}
