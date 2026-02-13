import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { getPlaceDetails } from "../../services/googleMapsService";

export function PlaceDetailsController({ placeId, onPlaceLoaded, onError }) {
  const map = useMap();

  const q = useQuery({
    queryKey: ["placeDetails", placeId],
    queryFn: () => getPlaceDetails({ map, placeId }),
    enabled: !!map && !!placeId,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (q.data) onPlaceLoaded?.(q.data);
  }, [q.data, onPlaceLoaded]);

  useEffect(() => {
    if (q.error) onError?.(q.error);
  }, [q.error, onError]);

  return null;
}
