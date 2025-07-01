import { create } from "zustand";

interface AuthState {
  items: string[];
  setItems: (items: string[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
