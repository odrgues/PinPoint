import { InfoWindow } from "@vis.gl/react-google-maps";

export function PlaceInfoWindow({ place, onClose }) {
  if (!place?.geometry?.location) return null;

  const position = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
  };

  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div
        className="
        min-w-[260px] max-w-[280px]
        space-y-2
        rounded-xl
        bg-secondary
        p-3
        shadow-lg
      "
      >
        <p className="text-sm font-semibold text-blue-600 leading-tight ">
          {place.name}
        </p>

        <p className="text-xs text-slate-500 leading-snug">
          {place.formatted_address}
        </p>

        {typeof place.rating === "number" && (
          <p className="text-xs text-slate-600 flex items-center gap-1">
            <span>⭐</span>
            <span>
              {place.rating} ({place.user_ratings_total ?? 0})
            </span>
          </p>
        )}

        {place.formatted_phone_number && (
          <p className="text-xs text-slate-600">
            {place.formatted_phone_number}
          </p>
        )}

        {place.website && (
          <a
            href={place.website}
            target="_blank"
            rel="noreferrer"
            className="
            
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-accent
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              transition
            
            "
          >
            Site
          </a>
        )}
      </div>
    </InfoWindow>
  );
}
