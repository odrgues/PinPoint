// src/features/map/components/MapView.jsx
import { Map as GoogleMap } from "@vis.gl/react-google-maps";

const MAP_OPTIONS = {
  disableDefaultUI: false,
  clickableIcons: true,
};

export function MapView({
  children,
  onMapClick,
  defaultCenter,
  defaultZoom,
  mapId,
}) {
  return (
    <GoogleMap
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      mapId={mapId}
      className="h-full w-full"
      onClick={onMapClick}
      options={MAP_OPTIONS}
    >
      {children}
    </GoogleMap>
  );
}
