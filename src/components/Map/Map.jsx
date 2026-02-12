import { useState, useEffect } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/useStore";
import { Search } from "../Search/Search";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const UBERLANDIA_COORDS = { lat: -18.9113, lng: -48.2622 };

const fetchAddress = async (lat, lng) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Falha ao buscar endereço");
  }
  const data = await response.json();
  return data.results[0]?.formatted_address || "Endereço desconhecido";
};

function MapController({ place }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;

    const targetPos = { lat: Number(place.lat), lng: Number(place.lng) };
    const targetZoom = 16;
    const startingZoom = map.getZoom();

    map.panTo(targetPos);

    if (startingZoom < 14) {
      setTimeout(() => {
        map.setZoom(14);
        setTimeout(() => {
          map.setZoom(targetZoom);
        }, 300);
      }, 300);
    } else {
      setTimeout(() => {
        map.setZoom(targetZoom);
      }, 500);
    }
  }, [map, place]);

  return null;
}

// --- COMPONENTE PRINCIPAL ---
export function Map({ selectedLocation }) {
  const { favorites, addFavorite } = useStore();
  const [clickedPos, setClickedPos] = useState(null);
  const [nameInput, setNameInput] = useState("");

  const {
    data: address,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["address", clickedPos?.lat, clickedPos?.lng],
    queryFn: () => fetchAddress(clickedPos.lat, clickedPos.lng),
    enabled: !!clickedPos,
    staleTime: 1000 * 60 * 5,
  });

  function onMapClick(ev) {
    setClickedPos(ev.detail.latLng);
    setNameInput("");
  }

  function handleSearchResult(place) {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setClickedPos({ lat, lng });
    setNameInput(place.name || "");
  }

  function handleSave() {
    if (!nameInput.trim()) return;
    addFavorite({
      id: Date.now(),
      name: nameInput,
      lat: clickedPos.lat,
      lng: clickedPos.lng,
      address: address,
    });
    setClickedPos(null);
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="h-full w-full relative">
        <div className="absolute top-4 left-0 w-full z-[100] flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md">
            <Search onPlaceSelect={handleSearchResult} />
          </div>
        </div>

        <GoogleMap
          defaultCenter={UBERLANDIA_COORDS}
          defaultZoom={13}
          mapId="DEMO_MAP_ID"
          className="h-full w-full"
          onClick={onMapClick}
          options={{ disableDefaultUI: false, clickableIcons: true }}
        >
          <MapController place={selectedLocation} />

          {favorites.map((fav) => (
            <AdvancedMarker
              key={fav.id}
              position={{ lat: fav.lat, lng: fav.lng }}
              title={fav.name}
            >
              <Pin
                background={"#2563eb"}
                glyphColor={"white"}
                borderColor={"#1e40af"}
              />
            </AdvancedMarker>
          ))}

          {clickedPos && (
            <>
              <AdvancedMarker position={clickedPos} />

              <InfoWindow
                position={clickedPos}
                onCloseClick={() => setClickedPos(null)}
              >
                <div className="p-2 flex flex-col gap-2 min-w-[200px]">
                  <span className="font-bold text-gray-800">
                    {nameInput ? "Local Encontrado" : "Novo Local"}
                  </span>

                  <div className="text-xs text-gray-500 bg-gray-50 p-1 rounded border border-gray-100">
                    <p>Lat: {clickedPos.lat.toFixed(5)}</p>
                    <p>Lng: {clickedPos.lng.toFixed(5)}</p>
                  </div>

                  <div className="text-xs text-gray-600 italic">
                    {isLoading && <span>🔄 Buscando endereço...</span>}
                    {isError && (
                      <span className="text-red-500">
                        Erro ao buscar endereço
                      </span>
                    )}
                    {!isLoading && !isError && address && (
                      <span>📍 {address}</span>
                    )}
                  </div>

                  <input
                    autoFocus
                    className="border border-gray-300 p-1 rounded text-sm outline-none focus:border-blue-500 mt-1"
                    placeholder="Dê um nome ao local..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />

                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Salvar Local
                  </button>
                </div>
              </InfoWindow>
            </>
          )}
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
