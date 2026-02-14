// src/features/search/hooks/useGeocodeSearch.js
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { geocodeByAddress } from "../../../services/geocodeService";

export function useGeocodeSearch({ text, onPlaceSelect }) {
  const geocodeMutation = useMutation({
    mutationFn: geocodeByAddress,
    onSuccess: (data, queryText) => {
      onPlaceSelect?.({
        name: queryText,
        formatted_address: data.formatted_address,
        geometry: {
          location: {
            lat: () => data.lat,
            lng: () => data.lng,
          },
        },
      });
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const q = text.trim();
      if (!q) return;
      geocodeMutation.mutate(q); // <-- q vira queryText no onSuccess
    },
    [text, geocodeMutation],
  );

  return {
    handleSubmit,
    isPending: geocodeMutation.isPending,
    isError: geocodeMutation.isError,
    error: geocodeMutation.error,
  };
}
