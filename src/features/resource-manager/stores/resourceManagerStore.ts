
import { create } from "zustand";

interface ResourceManagerState {
  items: string[];
  setItems: (items: string[]) => void;
}

export const useResourceManagerStore = create<ResourceManagerState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
