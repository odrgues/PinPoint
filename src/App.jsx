import { APIProvider } from "@vis.gl/react-google-maps";
import { Map } from "./components/Map/Map";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="h-screen w-full overflow-hidden">
        <Map />
      </div>
    </APIProvider>
  );
}
