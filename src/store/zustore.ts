import { create } from "zustand";
import { BearState } from "../../types/types";
export const useBears = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => {
    console.log(newBears);
    set({ bears: newBears });
  },
}));
