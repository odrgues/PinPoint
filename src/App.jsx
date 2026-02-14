import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./features/map/components/Map";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

export default function App() {
  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="h-screen w-full overflow-hidden">
        <Map>
          defaultZoom={13}
          mapId={MAP_ID}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
        </Map>
      </div>
    </APIProvider>
  );
}
