import { useStore } from "../../store/useStore";

export function Sidebar({ onLocationSelect }) {
  const { favorites, removeFavorite } = useStore();

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-hidden">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <span className="text-xl text-brand-primary">📍</span>
        <h1 className="font-bold text-xl text-gray-800">Meus Locais</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full ml-auto">
          {favorites.length}
        </span>
      </div>

      {/* Lista de Favoritos */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {favorites.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <p className="mb-2 text-4xl">🗺️</p>
            <p>Nenhum local salvo ainda.</p>
            <p className="text-sm mt-2">
              Clique no mapa ou use a busca para adicionar.
            </p>
          </div>
        ) : (
          favorites.map((fav) => (
            <div
              key={fav.id}
              onClick={() => onLocationSelect(fav)}
              className="group p-3 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {fav.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {fav.lat.toFixed(4)}, {fav.lng.toFixed(4)}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(fav.id);
                }}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="Excluir"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
