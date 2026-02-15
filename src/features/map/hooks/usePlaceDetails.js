import { useMap } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { getPlaceDetails } from "../../../services/google/googleMapsService";

export function usePlaceDetails(placeId) {
  const map = useMap();

  return useQuery({
    queryKey: ["placeDetails", placeId],
    enabled: Boolean(map && placeId),
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      if (!map || !placeId) return null;
      return getPlaceDetails({ map, placeId });
    },
  });
}
