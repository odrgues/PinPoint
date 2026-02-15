import { InfoWindow } from "@vis.gl/react-google-maps";

export function PlaceInfoWindow({
  place,
  position,
  isLoading,
  isError,
  onClose,
}) {
  const resolvedPosition = place?.geometry?.location
    ? {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
    : position;

  if (!resolvedPosition) return null;

  return (
    <InfoWindow position={resolvedPosition} onCloseClick={onClose}>
      <div className="pp-card min-w-[240px] space-y-2">
        {isLoading && (
          <>
            <p className="pp-title">Carregando detalhes…</p>
            <p className="pp-muted text-sm">Aguarde um momento.</p>
          </>
        )}

        {!isLoading && isError && (
          <>
            <p className="pp-title">Não foi possível carregar</p>
            <p className="pp-muted text-sm">
              Tente novamente clicando no local mais uma vez.
            </p>
          </>
        )}

        {!isLoading && !isError && place && (
          <>
            <p className="pp-title text-blue-600">{place.name}</p>
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
              <div className="flex justify-center mt-2">
                <a
                  className="
                    inline-flex items-center justify-center
                    px-3 py-1.5
                    text-sm font-medium
                    rounded-full
                    bg-blue-600 text-white
                    
                    transition-colors
                  "
                  href={place.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Site
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </InfoWindow>
  );
}
