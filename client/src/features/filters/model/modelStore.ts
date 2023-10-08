import { create } from "zustand";

type FilterState = {

}
const useFilterStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
}))