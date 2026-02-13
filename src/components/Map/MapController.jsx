import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export function MapController({ place }) {
  const map = useMap();
  const lastTargetRef = useRef(null);

  useEffect(() => {
    if (!map || !place) return;

    const lat = Number(place.lat);
    const lng = Number(place.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const key = `${lat.toFixed(6)}:${lng.toFixed(6)}`;

    // Evita repetir o mesmo pan/zoom e causar render em cascata
    if (lastTargetRef.current === key) return;
    lastTargetRef.current = key;

    const target = { lat, lng };

    // Apenas controla o mapa (sistema externo), sem setState
    map.panTo(target);

    // Zoom: só aplica se precisar
    const currentZoom = map.getZoom?.() ?? 13;
    const targetZoom = 16;

    if (currentZoom < targetZoom) {
      // setZoom em um tick separado ajuda a evitar "loop"
      setTimeout(() => {
        map.setZoom(targetZoom);
      }, 0);
    }
  }, [map, place]);

  return null;
}
