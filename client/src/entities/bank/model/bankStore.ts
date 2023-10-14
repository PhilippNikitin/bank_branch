import { create } from "zustand";
// import { immer } from 'zustand/middleware/immer'
type CoordType = {
  latitude: number;
  longitude: number;
};
type BankState = {
  currentBankId: number | undefined;
  currentCoords: CoordType;
  setCurrentBank: (id: number) => void;
};

export const useBankStore = create<BankState>((set) => ({
  currentCoords: { latitude: 0, longitude: 0 },
  currentBankId: undefined,
  setCurrentBank: (id) =>
    set((state) => ({
      ...state,
      currentBankId: id,
    })),
}));
