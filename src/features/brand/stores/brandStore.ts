
import { create } from "zustand";

interface BrandState {
  items: string[];
  setItems: (items: string[]) => void;
}

export const useBrandStore = create<BrandState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
