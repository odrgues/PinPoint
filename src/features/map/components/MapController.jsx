// src/features/map/components/MapController.jsx
import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export function MapController({ place, targetZoom = 16 }) {
  const map = useMap();
  const lastTargetRef = useRef(null);

  useEffect(() => {
    if (!map || !place) return;

    const lat =
      typeof place.lat === "function" ? place.lat() : Number(place.lat);
    const lng =
      typeof place.lng === "function" ? place.lng() : Number(place.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const key = `${lat.toFixed(6)}:${lng.toFixed(6)}`;
    if (lastTargetRef.current === key) return;
    lastTargetRef.current = key;

    map.panTo({ lat, lng });

    const currentZoom = map.getZoom?.() ?? 13;
    if (currentZoom < targetZoom) {
      const t = setTimeout(() => map.setZoom(targetZoom), 0);
      return () => clearTimeout(t);
    }
  }, [map, place, targetZoom]);

  return null;
}
