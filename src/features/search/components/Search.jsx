import { useCallback, useRef, useState } from "react";
import { useStore } from "../../../store/useStore";
import { SearchBar } from "./SearchBar";
import { FavoritesMenu } from "./FavoritesMenu";
import { usePlacesAutocomplete } from "../hooks/usePlacesAutocomplete";

export function Search({ onPlaceSelect, onLocationSelect }) {
  const { favorites, removeFavorite } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const inputRef = useRef(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  const handlePlaceSelect = useCallback(
    (place) => {
      closeMenu();
      onPlaceSelect?.(place);
    },
    [onPlaceSelect, closeMenu],
  );

  const handleFavoriteSelect = useCallback(
    (fav) => {
      onLocationSelect?.(fav);
      closeMenu();
    },
    [onLocationSelect, closeMenu],
  );

  usePlacesAutocomplete({
    inputRef,
    onPlaceSelect: handlePlaceSelect,
  });

  return (
    <div
      className="
    absolute z-sidebar w-full max-w-md px-4 pointer-events-none
    left-1/2 -translate-x-1/2
    bottom-4 md:bottom-auto
    md:top-4
  "
    >
      {" "}
      <SearchBar
        isOpen={isOpen}
        onToggleMenu={toggleMenu}
        text={text}
        onTextChange={setText}
        inputRef={inputRef}
      />
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
