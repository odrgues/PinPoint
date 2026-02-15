import { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function usePlacesAutocomplete({ inputRef, onPlaceSelect }) {
  const placesLib = useMapsLibrary("places");

  const onPlaceSelectRef = useRef(onPlaceSelect);
  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelect;
  }, [onPlaceSelect]);

  useEffect(() => {
    if (!placesLib) return;
    const inputEl = inputRef?.current;
    if (!inputEl) return;

    const ac = new placesLib.Autocomplete(inputEl, {
      fields: ["geometry", "name", "formatted_address", "place_id"],
    });

    const listener = ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place?.geometry?.location) return;
      onPlaceSelectRef.current?.(place);
    });

    return () => {
      try {
        if (window?.google?.maps?.event?.removeListener) {
          window.google.maps.event.removeListener(listener);
        }
      } catch {
        // falha silenciosa: não é crítico
      }
    };
  }, [placesLib, inputRef]);
}
