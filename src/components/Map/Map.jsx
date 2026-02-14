import { useMemo, useState } from "react";
import { InfoWindow } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "../../store/useStore";
import { reverseGeocode } from "../../services/googleMapsService";

import { MapView } from "./MapView";
import { MapController } from "./MapController";
import { FavoriteMarkers } from "./FavoriteMarkers";
import { ClickMarker } from "./ClickHandler";
import { LocationInfoWindow } from "./LocationInfoWindow";
import { PlaceDetailsController } from "./PlaceDetailsController";

import { Search } from "../Search/Search";

const UBERLANDIA_COORDS = { lat: -18.9113, lng: -48.2622 };

// Garante {lat:number,lng:number} independentemente do tipo (Google LatLng ou objeto normal)
function normalizeLatLng(latLng) {
  if (!latLng) return null;

  const lat = typeof latLng.lat === "function" ? latLng.lat() : latLng.lat;
  const lng = typeof latLng.lng === "function" ? latLng.lng() : latLng.lng;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

export default function Map() {
  const { favorites, addFavorite, removeFavorite } = useStore();

  const [clickedPos, setClickedPos] = useState(null);
  const [nameInput, setNameInput] = useState("");

  const [selectedLocation, setSelectedLocation] = useState(null); // usado pelo MapController (pan/zoom)
  const [activeFavorite, setActiveFavorite] = useState(null);

  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Reverse geocode (Google) quando clicar em um ponto do mapa
  const reverseQuery = useQuery({
    queryKey: ["reverseGeocode", clickedPos?.lat, clickedPos?.lng],
    queryFn: async () => {
      const res = await reverseGeocode(clickedPos);
      return res?.formatted_address || "Endereço desconhecido";
    },
    enabled: !!clickedPos,
    staleTime: 1000 * 60 * 10,
  });

  const address = reverseQuery.data;
  const isLoading = reverseQuery.isLoading;
  const isError = reverseQuery.isError;

  function resetOverlays() {
    setSelectedPlaceId(null);
    setSelectedPlace(null);
    setActiveFavorite(null);
  }

  function onMapClick(ev) {
    // Clique em POI/estabelecimento (ícone do mapa)
    const placeId = ev.detail.placeId?.placeId || ev.detail.placeId;
    if (placeId) {
      setSelectedPlaceId(placeId);
      setSelectedPlace(null);

      setClickedPos(null);
      setNameInput("");
      setActiveFavorite(null);
      return;
    }

    // Clique normal no mapa
    const pos = normalizeLatLng(ev.detail.latLng);
    if (!pos) return;

    setClickedPos(pos);
    setSelectedLocation(pos); // centraliza no ponto clicado
    setNameInput("");
    resetOverlays();
  }

  // Seleção via autocomplete (busca)
  function handlePlaceSelect(place) {
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const pos = { lat, lng };

    setSelectedLocation(pos); // centraliza
    setClickedPos(pos); // abre a janela de salvar
    setNameInput(place.name || "");
    resetOverlays();
  }

  // Clique em favorito (lista ou marcador)
  function handleFavoriteSelect(fav) {
    const pos = { lat: fav.lat, lng: fav.lng };

    setSelectedLocation(pos); // centraliza
    setActiveFavorite(fav); // abre InfoWindow do favorito

    setClickedPos(null);
    setSelectedPlaceId(null);
    setSelectedPlace(null);
    setNameInput("");
  }

  function handleSave() {
    if (!clickedPos) return;
    if (!nameInput.trim()) return;

    addFavorite({
      id: Date.now(),
      name: nameInput.trim(),
      lat: clickedPos.lat,
      lng: clickedPos.lng,
      address: address || "Endereço desconhecido",
    });

    setClickedPos(null);
    setNameInput("");
  }

  const activeFavoritePosition = useMemo(() => {
    if (!activeFavorite) return null;
    return { lat: activeFavorite.lat, lng: activeFavorite.lng };
  }, [activeFavorite]);

  return (
    <div className="h-full w-full relative">
      {/* Busca flutuante */}
      <Search
        onPlaceSelect={handlePlaceSelect}
        onLocationSelect={handleFavoriteSelect}
      />

      {/* Mapa */}
      <MapView
        onMapClick={onMapClick}
        defaultCenter={UBERLANDIA_COORDS}
        defaultZoom={13}
      >
        <MapController place={selectedLocation} />

        {/* Busca detalhes do POI clicado */}
        <PlaceDetailsController
          placeId={selectedPlaceId}
          onPlaceLoaded={(p) => setSelectedPlace(p)}
          onError={() => setSelectedPlace(null)}
        />

        {/* Marcadores de favoritos */}
        <FavoriteMarkers
          favorites={favorites}
          onSelectFavorite={handleFavoriteSelect}
        />

        {/* Marker temporário do clique/busca */}
        <ClickMarker position={clickedPos} />

        {/* Janela de salvar local */}
        <LocationInfoWindow
          position={clickedPos}
          nameInput={nameInput}
          setNameInput={setNameInput}
          address={address}
          isLoading={isLoading}
          isError={isError}
          onSave={handleSave}
          onClose={() => setClickedPos(null)}
        />

        {/* InfoWindow do Favorito */}
        {activeFavorite && activeFavoritePosition && (
          <InfoWindow
            position={activeFavoritePosition}
            onCloseClick={() => setActiveFavorite(null)}
          >
            <div className="pp-card min-w-[220px] space-y-1">
              <p className="pp-title">{activeFavorite.name}</p>
              <p className="pp-muted text-sm">{activeFavorite.address}</p>
              <p className="pp-muted text-xs">
                {activeFavorite.lat.toFixed(5)}, {activeFavorite.lng.toFixed(5)}
              </p>
            </div>
          </InfoWindow>
        )}

        {/* InfoWindow do POI (estabelecimento) */}
        {selectedPlace?.geometry?.location && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            onCloseClick={() => {
              setSelectedPlace(null);
              setSelectedPlaceId(null);
            }}
          >
            <div className="pp-card min-w-[240px] space-y-1">
              <p className="pp-title">{selectedPlace.name}</p>
              <p className="pp-muted text-sm">
                {selectedPlace.formatted_address}
              </p>

              {typeof selectedPlace.rating === "number" && (
                <p className="text-sm">
                  ⭐ {selectedPlace.rating} (
                  {selectedPlace.user_ratings_total ?? 0})
                </p>
              )}

              {selectedPlace.formatted_phone_number && (
                <p className="text-sm">
                  {selectedPlace.formatted_phone_number}
                </p>
              )}

              {selectedPlace.website && (
                <a
                  className="text-sm text-blue-600 underline"
                  href={selectedPlace.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Site
                </a>
              )}
            </div>
          </InfoWindow>
        )}
      </MapView>
    </div>
  );
}
