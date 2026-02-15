import { InfoWindow } from "@vis.gl/react-google-maps";

export function FavoriteInfoWindow({ favorite, onClose }) {
  if (!favorite) return null;

  const position = { lat: favorite.lat, lng: favorite.lng };

  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className="pp-card min-w-[220px] space-y-1 ">
        <p className="pp-title text-blue-600">{favorite.name}</p>
        <p className="pp-muted text-sm">{favorite.address}</p>
        <p className="pp-muted text-xs">
          {favorite.lat.toFixed(5)}, {favorite.lng.toFixed(5)}
        </p>
      </div>
    </InfoWindow>
  );
}
