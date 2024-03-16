import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const store = (set: any) => ({
  theme: "light" as const,
  toggleTheme: () =>
    set((state: ThemeState) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
});

const useGlobalState = create(
  devtools(
    persist(store, {
      name: "store",
    })
  )
);

export default useGlobalState;
