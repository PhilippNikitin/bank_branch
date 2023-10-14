import { create } from "zustand";

type FilterState = {

}
const useFilterStore = create<BearState>()((set) => ({
    bears: 0,
    setViewPort: (ne,sw) => set((state)=>{})
    increase: (by) => set((state) => ({ bears: state.bears + by })),
}))