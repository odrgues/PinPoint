// components/SearchBar/FavoritesMenu.jsx
import React from "react";
import { MapPin } from "lucide-react";
import { FavoriteItem } from "./FavoriteItem";

export function FavoritesMenu({ isOpen, favorites, onSelect, onRemove }) {
  // Se não estiver aberto, não renderiza nada (null)
  if (!isOpen) return null;

  return (
    <div className="pointer-events-auto mt-2 bg-ui-surface rounded-lg shadow-medium border border-ui-border overflow-hidden animate-slide-up origin-top">
      {/* Cabeçalho */}
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
            <FavoriteItem
              key={fav.id}
              fav={fav}
              onClick={() => onSelect(fav)}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}
