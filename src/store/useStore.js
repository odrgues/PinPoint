import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      favorites: [],

      addFavorite: (location) =>
        set((state) => ({
          favorites: [...state.favorites, location],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
    }),
    {
      name: "pinpoint-storage",
    },
  ),
);
