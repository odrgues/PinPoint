import { MapPin, Trash2 } from "lucide-react";

export function FavoriteItem({ fav, onSelect, onRemove }) {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer flex items-center justify-between p-3 rounded-md hover:bg-ui-background transition-colors"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
          <MapPin size={16} />
        </div>

        <div className="truncate">
          <p className="font-heading font-bold text-primary text-sm truncate">
            {fav.name}
          </p>
          <p className="pp-muted text-xs truncate">
            {fav.address ?? `${fav.lat.toFixed(4)}, ${fav.lng.toFixed(4)}`}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="p-2 text-text-muted hover:text-ui-error opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remover"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
