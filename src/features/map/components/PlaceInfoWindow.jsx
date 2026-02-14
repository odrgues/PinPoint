// src/features/map/components/PlaceInfoWindow.jsx
import { InfoWindow } from "@vis.gl/react-google-maps";

export function PlaceInfoWindow({ place, onClose }) {
  if (!place?.geometry?.location) return null;

  const position = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
  };

  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className="pp-card min-w-[240px] space-y-1">
        <p className="pp-title">{place.name}</p>
        <p className="pp-muted text-sm">{place.formatted_address}</p>

        {typeof place.rating === "number" && (
          <p className="text-sm">
            ⭐ {place.rating} ({place.user_ratings_total ?? 0})
          </p>
        )}

        {place.formatted_phone_number && (
          <p className="text-sm">{place.formatted_phone_number}</p>
        )}

        {place.website && (
          <a
            className="text-sm text-blue-600 underline"
            href={place.website}
            target="_blank"
            rel="noreferrer"
          >
            Site
          </a>
        )}
      </div>
    </InfoWindow>
  );
}
