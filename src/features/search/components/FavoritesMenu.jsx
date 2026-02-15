import { MapPin, Trash2 } from "lucide-react";

export function FavoritesMenu({
  open,
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
}) {
  if (!open) return null;

  return (
    <div
      className="pointer-events-auto mt-2 bg-ui-surface rounded-lg shadow-medium border border-ui-border overflow-hidden animate-slide-up origin-top"
      role="menu"
      aria-label="Locais salvos"
      id="favorites-menu"
    >
      <div className="p-3 border-b border-ui-border flex justify-between items-center">
        <span className="font-heading text-primary text-sm uppercase tracking-wide">
          Locais Salvos
        </span>
        <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-pill">
          {favorites.length}
        </span>
      </div>

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
              className="group flex items-center justify-between rounded-md hover:bg-ui-background transition-colors"
              role="none"
            >
              <button
                type="button"
                onClick={() => onSelectFavorite?.(fav)}
                className="flex-1 flex items-center gap-3 overflow-hidden p-3 text-left cursor-pointer"
                role="menuitem"
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                  <MapPin size={16} />
                </div>

                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-primary text-sm truncate">
                    {fav.name}
                  </h4>
                  <p className="text-text-muted text-xs truncate">
                    {fav.lat.toFixed(4)}, {fav.lng.toFixed(4)}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite?.(fav.id);
                }}
                className="p-2 text-text-muted hover:text-ui-error opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remover"
                aria-label={`Remover ${fav.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
