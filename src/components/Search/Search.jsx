import { useEffect, useRef, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

export function Search({ onPlaceSelect }) {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const newAutocomplete = new placesLib.Autocomplete(inputRef.current, {
      fields: ["geometry", "name", "formatted_address"],
    });

    setAutocomplete(newAutocomplete);
  }, [placesLib]);

  useEffect(() => {
    if (!autocomplete || !map) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) return;

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        const center = place.geometry.location;
        const offset = 0.002;

        const bounds = new window.google.maps.LatLngBounds(
          { lat: center.lat() - offset, lng: center.lng() - offset },
          { lat: center.lat() + offset, lng: center.lng() + offset },
        );

        map.fitBounds(bounds);
      }

      if (onPlaceSelect) {
        onPlaceSelect(place);
      }
    });

    return () => window.google.maps.event.removeListener(listener);
  }, [autocomplete, map, onPlaceSelect]);

  return (
    <div className="px-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar endereço ou loja..."
        className="w-full p-3 rounded-full shadow-lg border border-gray-300 outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all bg-white"
      />
    </div>
  );
}
