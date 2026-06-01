import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "@/api/api";
import { toast } from "sonner";

export const useCaptured = (username) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pins, setPins] = useState([]);
  const [stats, setStats] = useState(null);
  const mapRef = useRef();
  const location = useLocation();

  const copyShareLink = async () => {
    const currentURL =
      window.location.origin +
      location.pathname +
      location.search +
      location.hash;
    try {
      await navigator.clipboard.writeText(currentURL);
      toast.message("Link Copied.");
    } catch (err) {
      console.error("Clipboard failed:", err);
      toast.message("Clipboard Failed.");
    }
  };

  const getMyInfo = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await api.get(`api/users/${username}/pins/`);

      console.log(res.data);

      setPins(res.data.pins);
      setStats(res.data.stats);

      console.log("User info loaded successfully");
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      getMyInfo();
    }
  }, [username]);

  return { loading, error, pins, stats, mapRef, copyShareLink };
};
