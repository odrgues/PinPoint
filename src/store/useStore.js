import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      // Estado Inicial
      favorites: [], // Lista de locais salvos [cite: 15, 41]
      selectedPlace: null, // Local clicado no mapa para detalhes [cite: 13, 35]
      tempLocation: null, // Local clicado mas ainda não salvo [cite: 38]

      // Ações
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [
            ...state.favorites,
            { ...favorite, id: crypto.randomUUID() },
          ],
          tempLocation: null,
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),

      setSelectedPlace: (place) => set({ selectedPlace: place }),

      setTempLocation: (location) => set({ tempLocation: location }),
    }),
    {
      name: "pinpoint-storage", // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
