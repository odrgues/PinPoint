import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMutation } from "@tanstack/react-query";
import { geocodeByAddress } from "../../services/geocodeService";
import { useStore } from "../../store/useStore";
import { MapPin, Search as SearchIcon, Menu, X, Trash2 } from "lucide-react";

export function Search({ onPlaceSelect, onLocationSelect }) {
  const placesLib = useMapsLibrary("places");
  const { favorites, removeFavorite } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const geocodeMutation = useMutation({
    mutationFn: geocodeByAddress,
    onSuccess: (data) => {
      setIsOpen(false);
      onPlaceSelect?.({
        name: text,
        formatted_address: data.formatted_address,
        geometry: {
          location: {
            lat: () => data.lat,
            lng: () => data.lng,
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const ac = new placesLib.Autocomplete(inputRef.current, {
      fields: ["geometry", "name", "formatted_address", "place_id"],
    });

    const listener = ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place?.geometry?.location) return;
      setIsOpen(false);
      onPlaceSelect?.(place);
    });

    return () => window.google.maps.event.removeListener(listener);
  }, [placesLib, onPlaceSelect]);

  //nao funciona??? submit manual (enter/botao de lupa)
  function handleSubmit(e) {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    geocodeMutation.mutate(q);
  }

  return (
    <div className="absolute  top-4 left-1/2 -translate-x-1/2 z-sidebar w-full max-w-md px-4 md:px-0 pointer-events-none">
      <form
        onSubmit={handleSubmit}
        className="pointer-events-auto bg-ui-surface shadow-floating rounded-pill flex items-center p-1 border border-ui-border focus-within:ring-2 focus-within:ring-primary/20"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-colors ${
            isOpen
              ? "bg-primary text-ui-surface"
              : "text-primary hover:bg-ui-background"
          }`}
          title={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Pesquise no PinPoint"
          className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-base px-3 h-10"
        />

        <div className="h-6 w-px bg-ui-border mx-1" />

        <button
          type="submit"
          className="p-3 text-accent hover:text-primary hover:bg-ui-background rounded-full transition-colors"
          title="Pesquisar"
        >
          <SearchIcon size={20} />
        </button>
      </form>

      {/* olhar isso aqui - como testar uma situaçao de erro? */}
      <div className="pointer-events-none mt-2">
        {geocodeMutation.isPending && (
          <div className="pointer-events-auto inline-block pp-card text-sm">
            🔄 Buscando...
          </div>
        )}
        {geocodeMutation.isError && (
          <div className="pointer-events-auto inline-block pp-card text-sm text-ui-error">
            {geocodeMutation.error?.message || "Erro na busca"}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="pointer-events-auto mt-2 bg-ui-surface rounded-lg shadow-medium border border-ui-border overflow-hidden animate-slide-up origin-top">
          <div className=" p-3 border-b border-ui-border flex justify-between items-center">
            <span className="font-heading  text-primary text-sm uppercase tracking-wide">
              Locais Salvos
            </span>
            <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-pill">
              {favorites.length}
            </span>
          </div>

          {/* olhar aqui */}
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
                    onLocationSelect?.(fav);
                    setIsOpen(false);
                  }}
                  className="group flex items-center justify-between p-3 rounded-md hover:bg-ui-background cursor-pointer transition-colors"
                >
                  {/* mudar a cor do marcador da lista de salvos */}
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-primary/10 text-red-500 p-2 rounded-full text-primary shrink-0">
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

                  {/* mudar a lixeira de cor */}
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
