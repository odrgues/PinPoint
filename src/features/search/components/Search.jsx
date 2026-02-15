import { useCallback, useRef, useState } from "react";
import { useStore } from "../../../store/useStore";
import { SearchBar } from "./SearchBar";
import { FavoritesMenu } from "./FavoritesMenu";
import { usePlacesAutocomplete } from "../hooks/usePlacesAutocomplete";

export function Search({ onPlaceSelect, onLocationSelect }) {
  const { favorites, removeFavorite } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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

  const wrapperClassName = `
  absolute z-sidebar w-full max-w-md px-4 pointer-events-none
  left-1/2 -translate-x-1/2 pb-6
  ${isFocused ? "top-4 bottom-auto" : "pp-safe-bottom top-auto"}
  md:top-4 md:bottom-auto md:left-1/2 md:-translate-x-1/2
`;

  return (
    <div className={wrapperClassName}>
      {" "}
      <SearchBar
        isOpen={isOpen}
        onToggleMenu={toggleMenu}
        text={text}
        onTextChange={setText}
        inputRef={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
