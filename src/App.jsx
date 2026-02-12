import { useState } from "react";
import { MainLayout } from "./components/Layout/MainLayout";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Map } from "./components/Map/Map";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  function handleSelectFavorite(fav) {
    setSelectedLocation(fav);
  }

  return (
    <MainLayout
      sidebarSlot={<Sidebar onLocationSelect={handleSelectFavorite} />}
      mapSlot={<Map selectedLocation={selectedLocation} />}
    />
  );
}

export default App;
