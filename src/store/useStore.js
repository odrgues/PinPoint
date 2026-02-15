import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      favorites: [],
      selectedPlace: null,
      tempLocation: null,

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
      name: "pinpoint-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
