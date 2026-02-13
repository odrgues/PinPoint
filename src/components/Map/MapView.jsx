import { Map as GoogleMap } from "@vis.gl/react-google-maps";

export function MapView({ children, onMapClick, defaultCenter, defaultZoom }) {
  return (
    <GoogleMap
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      mapId="DEMO_MAP_ID"
      className="h-full w-full"
      onClick={onMapClick}
      options={{ disableDefaultUI: false, clickableIcons: true }}
    >
      {children}
    </GoogleMap>
  );
}
