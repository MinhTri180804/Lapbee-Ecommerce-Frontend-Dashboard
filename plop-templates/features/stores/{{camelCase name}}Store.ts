
import { create } from "zustand";

interface {{pascalCase name}}State {
  items: string[];
  setItems: (items: string[]) => void;
}

export const use{{pascalCase name}}Store = create<{{pascalCase name}}State>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
