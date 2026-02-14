// src/features/map/components/FavoriteMarkers.jsx
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export function FavoriteMarkers({ favorites = [], onSelectFavorite }) {
  if (!favorites.length) return null;

  return favorites.map((fav) => (
    <AdvancedMarker
      key={fav.id}
      position={{ lat: fav.lat, lng: fav.lng }}
      title={fav.name}
      aria-label={`Local favorito: ${fav.name}`}
      onClick={() => onSelectFavorite?.(fav)}
    >
      <Pin background="#FF3838" glyphColor="white" borderColor="#FF3838" />
    </AdvancedMarker>
  ));
}
