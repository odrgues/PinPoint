// components/SearchBar/FavoriteItem.jsx
import React from "react";
import { MapPin, Trash2 } from "lucide-react";

export function FavoriteItem({ fav, onClick, onRemove }) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between p-3 rounded-md hover:bg-ui-background cursor-pointer transition-colors border border-transparent hover:border-ui-border"
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
          onRemove(fav.id);
        }}
        className="p-2 text-text-muted hover:text-ui-error opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remover"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
