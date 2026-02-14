// src/features/map/hooks/useReverseGeocode.js
import { useQuery } from "@tanstack/react-query";
import { reverseGeocode } from "../../../services/google/googleMapsService";

export function useReverseGeocode(clickedPos) {
  const query = useQuery({
    queryKey: ["reverseGeocode", clickedPos?.lat, clickedPos?.lng],
    enabled: Boolean(clickedPos),
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const res = await reverseGeocode(clickedPos);
      return res?.formatted_address || "Endereço desconhecido";
    },
  });

  return {
    address: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
