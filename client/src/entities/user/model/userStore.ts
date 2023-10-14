import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
type CoordType = {
    latitude: number,
    longitude: number,
}
type UserState = {
    currentCoords: CoordType,
    setCurrentCoords: (coords: CoordType) => void
}

export const useUserStore = create<UserState>()(immer((set) => ({
    currentCoords: { latitude: 0, longitude: 0 },
    setCurrentCoords: (coords) => set((state) => { state.currentCoords.latitude = coords.latitude, state.currentCoords.longitude = coords.longitude })
})))
