import { useMemo, useState } from "react";
import { useStore } from "../../../store/useStore";

import { MapView } from "./MapView";
import { MapController } from "./MapController";
import { FavoriteMarkers } from "./FavoriteMarkers";
import { ClickMarker } from "./ClickMarker";
import { LocationInfoWindow } from "./LocationInfoWindow";
import { FavoriteInfoWindow } from "./FavoriteInfoWindow";
import { PlaceInfoWindow } from "./PlaceInfoWindow";

import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { usePlaceDetails } from "../hooks/usePlaceDetails";
import { normalizeLatLng } from "../utils/normalizeLatLng";

import { Search } from "../../search";

const UBERLANDIA_COORDS = { lat: -18.9113, lng: -48.2622 };

export default function Map() {
  const { favorites, addFavorite } = useStore();

  const [clickedPos, setClickedPos] = useState(null);
  const [nameInput, setNameInput] = useState("");

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeFavorite, setActiveFavorite] = useState(null);

  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [selectedPlacePos, setSelectedPlacePos] = useState(null);

  const { address, isLoading, isError } = useReverseGeocode(clickedPos);

  const placeDetailsQuery = usePlaceDetails(selectedPlaceId);
  const selectedPlace = placeDetailsQuery.data ?? null;

  function resetOverlays() {
    setSelectedPlaceId(null);
    setSelectedPlacePos(null);
    setActiveFavorite(null);
  }

  function onMapClick(ev) {
    const placeId = ev.detail.placeId?.placeId || ev.detail.placeId;
    if (placeId) {
      setSelectedPlaceId(placeId);
      const pos = normalizeLatLng(ev.detail.latLng);
      setSelectedPlacePos(pos);

      setClickedPos(null);
      setNameInput("");
      setActiveFavorite(null);
      return;
    }

    const pos = normalizeLatLng(ev.detail.latLng);
    if (!pos) return;

    setClickedPos(pos);
    setSelectedLocation(pos);
    setNameInput("");
    resetOverlays();
  }

  function handlePlaceSelect(place) {
    if (!place?.geometry?.location) return;

    const pos = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setSelectedLocation(pos);
    setClickedPos(pos);
    setNameInput(place.name || "");
    resetOverlays();
  }

  function handleFavoriteSelect(fav) {
    const pos = { lat: fav.lat, lng: fav.lng };

    setSelectedLocation(pos);
    setActiveFavorite(fav);

    setClickedPos(null);
    setSelectedPlaceId(null);
    setNameInput("");
  }

  function handleSave() {
    if (!clickedPos) return;
    const name = nameInput.trim();
    if (!name) return;

    addFavorite({
      id: Date.now(),
      name,
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

  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

  return (
    <div className="h-full w-full relative">
      <Search
        onPlaceSelect={handlePlaceSelect}
        onLocationSelect={handleFavoriteSelect}
      />

      <MapView
        onMapClick={onMapClick}
        defaultCenter={UBERLANDIA_COORDS}
        defaultZoom={13}
        mapId={mapId}
      >
        <MapController place={selectedLocation} />

        <FavoriteMarkers
          favorites={favorites}
          onSelectFavorite={handleFavoriteSelect}
        />

        <ClickMarker position={clickedPos} />

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

        <FavoriteInfoWindow
          favorite={
            activeFavorite && activeFavoritePosition ? activeFavorite : null
          }
          onClose={() => setActiveFavorite(null)}
        />

        <PlaceInfoWindow
          place={selectedPlace}
          position={selectedPlacePos}
          isLoading={placeDetailsQuery.isLoading}
          isError={placeDetailsQuery.isError}
          onClose={() => {
            setSelectedPlaceId(null);
            setSelectedPlacePos(null);
          }}
        />
      </MapView>
    </div>
  );
}
