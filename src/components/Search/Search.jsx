import React, { useEffect, useRef, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useStore } from "../../store/useStore"; // Ajuste o caminho conforme necessário
import { MapPin, Search as SearchIcon, Menu, X, Trash2 } from "lucide-react";

export function Search({ onPlaceSelect, onLocationSelect }) {
  // Removi onSearch pois o Autocomplete assume
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const { favorites, removeFavorite } = useStore();

  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  // Ref para o input
  const inputRef = useRef(null);

  // --- 1. CONFIGURAÇÃO DO GOOGLE AUTOCOMPLETE ---
  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const newAutocomplete = new placesLib.Autocomplete(inputRef.current, {
      fields: ["geometry", "name", "formatted_address"],
    });

    setAutocomplete(newAutocomplete);
  }, [placesLib]);

  // --- 2. GERENCIAMENTO DE SELEÇÃO DE LUGAR ---
  useEffect(() => {
    if (!autocomplete || !map) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) return;

      // Lógica de Zoom/Pan do Google
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        const center = place.geometry.location;
        map.setCenter(center);
        map.setZoom(16); // Zoom mais próximo para ponto exato
      }

      // Fecha o menu se estiver aberto
      setIsOpen(false);

      if (onPlaceSelect) {
        onPlaceSelect(place);
      }
    });

    return () => window.google.maps.event.removeListener(listener);
  }, [autocomplete, map, onPlaceSelect]);

  return (
    // CONTAINER FLUTUANTE (Posicionado sobre o mapa)
    <div className="absolute top-4 left-4 z-sidebar w-full max-w-md px-4 md:px-0 font-sans pointer-events-none">
      {/* BARRA VISUAL (Finge ser o Input) */}
      <div className="pointer-events-auto bg-ui-surface shadow-floating rounded-pill flex items-center p-1 border border-ui-border transition-all focus-within:ring-2 focus-within:ring-primary/20">
        {/* BOTÃO HAMBÚRGUER (Esquerda) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-colors ${
            isOpen
              ? "bg-primary text-ui-surface"
              : "text-primary hover:bg-ui-background"
          }`}
          title={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* INPUT REAL (Transparente e sem bordas) */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar endereço ou loja..."
          className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-base px-3 h-10"
        />

        {/* BOTÃO LUPA (Direita - Decorativo ou Foco) */}
        <div className="h-6 w-px bg-ui-border mx-1"></div>
        <button
          onClick={() => inputRef.current?.focus()}
          className="p-3 text-accent hover:text-primary hover:bg-ui-background rounded-full transition-colors"
          title="Pesquisar"
        >
          <SearchIcon size={20} />
        </button>
      </div>

      {/* LISTA DE FAVORITOS (Dropdown) */}
      {isOpen && (
        <div className="pointer-events-auto mt-2 bg-ui-surface rounded-lg shadow-medium border border-ui-border overflow-hidden animate-slide-up origin-top">
          {/* Cabeçalho da Lista */}
          <div className="bg-ui-background p-3 border-b border-ui-border flex justify-between items-center">
            <span className="font-heading font-bold text-primary text-sm uppercase tracking-wide">
              Locais Salvos
            </span>
            <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-pill">
              {favorites.length}
            </span>
          </div>

          {/* Lista com Scroll */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
            {favorites.length === 0 ? (
              <div className="text-center py-6 text-text-muted">
                <MapPin className="mx-auto mb-2 opacity-50" size={24} />
                <p className="text-sm">Sua lista está vazia.</p>
              </div>
            ) : (
              favorites.map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => {
                    // Move o mapa para o favorito salvo
                    map.panTo({ lat: fav.lat, lng: fav.lng });
                    map.setZoom(16);
                    if (onLocationSelect) onLocationSelect(fav);
                    setIsOpen(false);
                  }}
                  className="group flex items-center justify-between p-3 rounded-md hover:bg-ui-background cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div className="truncate">
                      <h4 className="font-heading font-bold text-primary text-sm truncate">
                        {fav.name}
                      </h4>
                      <p className="text-text-muted text-xs truncate">
                        {fav.lat.toFixed(4)}, {fav.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(fav.id);
                    }}
                    className="p-2 text-text-muted hover:text-ui-error opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
