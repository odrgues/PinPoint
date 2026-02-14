// src/features/search/components/Search.jsx
import { useCallback, useRef, useState } from "react";
import { useStore } from "../../../store/useStore";

import { SearchBar } from "./SearchBar";
import { FavoritesMenu } from "./FavoritesMenu";

import { usePlacesAutocomplete } from "../hooks/usePlacesAutocomplete";
import { useGeocodeSearch } from "../hooks/useGeocodeSearch";

export function Search({ onPlaceSelect, onLocationSelect }) {
  const { favorites, removeFavorite } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const inputRef = useRef(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  // Mantém a referência estável e evita re-renderizações/desinscrição de listeners
  const handlePlaceSelect = useCallback(
    (place) => {
      onPlaceSelect?.(place);
    },
    [onPlaceSelect],
  );

  const handleAutocompleteSelect = useCallback(
    (place) => {
      closeMenu();
      handlePlaceSelect(place);
    },
    [closeMenu, handlePlaceSelect],
  );

  const handleGeocodeSelect = useCallback(
    (placeLike) => {
      closeMenu();
      handlePlaceSelect(placeLike);
    },
    [closeMenu, handlePlaceSelect],
  );

  const handleFavoriteSelect = useCallback(
    (fav) => {
      onLocationSelect?.(fav);
      closeMenu();
    },
    [onLocationSelect, closeMenu],
  );

  // Hook: autocomplete do Google Places
  usePlacesAutocomplete({
    inputRef,
    onPlaceSelect: handleAutocompleteSelect,
  });

  // Hook: busca por texto com React Query (geocoding)
  const { handleSubmit, isPending, isError, error } = useGeocodeSearch({
    text,
    onPlaceSelect: handleGeocodeSelect,
  });

  return (
    <div
      className="
  absolute z-sidebar w-full max-w-md px-4 pointer-events-none
  top-4 left-1/2 -translate-x-1/2
  max-md:top-auto max-md:bottom-4 max-md:left-1/2 max-md:-translate-x-1/2
"
    >
      <SearchBar
        isOpen={isOpen}
        onToggleMenu={toggleMenu}
        text={text}
        onTextChange={setText}
        inputRef={inputRef}
        onSubmit={handleSubmit}
      />

      <div className="pointer-events-none mt-2" aria-live="polite">
        {isPending && (
          <div className="pointer-events-auto inline-block pp-card text-sm">
            🔄 Buscando...
          </div>
        )}
        {isError && (
          <div className="pointer-events-auto inline-block pp-card text-sm text-ui-error">
            {error?.message || "Erro na busca"}
          </div>
        )}
      </div>

      <FavoritesMenu
        open={isOpen}
        favorites={favorites}
        onSelectFavorite={handleFavoriteSelect}
        onRemoveFavorite={removeFavorite}
        onClose={closeMenu}
      />
    </div>
  );
}
