import { FavoriteItem } from "./FavoriteItem";

export function FavoritesList({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
}) {
  if (!favorites.length) {
    return (
      <div className="p-6 text-center pp-muted">
        <p className="text-sm">Nenhum local salvo ainda.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-1">
      {favorites.map((fav) => (
        <FavoriteItem
          key={fav.id}
          fav={fav}
          onSelect={() => onSelectFavorite(fav)}
          onRemove={() => onRemoveFavorite(fav.id)}
        />
      ))}
    </div>
  );
}
