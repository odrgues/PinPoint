import { FavoritesList } from "./FavoritesList";

export function Sidebar({ favorites, onSelectFavorite, onRemoveFavorite }) {
  return (
    <aside className="absolute left-0 top-0 z-sidebar h-full w-80 bg-ui-surface border-r border-ui-border shadow-medium hidden md:flex flex-col">
      <div className="p-4 border-b border-ui-border">
        <h2 className="text-h3">Locais salvos</h2>
        <p className="pp-muted text-sm">Clique para centralizar no mapa</p>
      </div>

      <FavoritesList
        favorites={favorites}
        onSelectFavorite={onSelectFavorite}
        onRemoveFavorite={onRemoveFavorite}
      />
    </aside>
  );
}
