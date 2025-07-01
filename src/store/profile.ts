import type { Profile } from "@/types/profile";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { create } from "zustand";

type State = {
  data: Profile | null;
  isLoggout: boolean;
};

type Actions = {
  updateData: (data: Profile | null) => void;
  logout: () => void;
  login: () => void;
};

const profileStore = create<State & Actions>((set) => ({
  data: null,
  isLoggout: false,
  updateData: (data) =>
    set(() => ({
      data,
    })),
  logout: () =>
    set(() => ({
      isLoggout: true,
      data: null,
    })),
  login: () =>
    set(() => ({
      isLoggout: false,
      data: null,
    })),
}));

export const useProfileStore = createSelectorFunctions(profileStore);
