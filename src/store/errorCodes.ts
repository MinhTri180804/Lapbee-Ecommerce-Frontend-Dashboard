import { create } from "zustand";
import { type ErrorCodes } from "@/types/errorCodes";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";

type State = {
  data: ErrorCodes | null;
  keys: (keyof ErrorCodes)[];
  values: ErrorCodes[keyof ErrorCodes][];
};

type Actions = {
  updateData: (data: ErrorCodes) => void;
};

const errorCodesStore = create<State & Actions>((set) => ({
  data: null,
  keys: [],
  values: [],
  updateData: (data) =>
    set(() => ({
      data: data,
      keys: Object.keys(data),
      values: Object.values(data),
    })),
}));

export const useErrorCodesStore = createSelectorFunctions(errorCodesStore);
