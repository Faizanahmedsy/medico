import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface GlobalState {
  theme: "light" | "dark";

  selectedTalukas: any[];

  selectedStates: any[];

  selectedDistricts: any[];

  buyerList: any[];

  selectedBuyers: any[];

  zustProductId: string;
}

const initialState: GlobalState = {
  theme: "light",

  selectedTalukas: [],

  selectedStates: [],

  selectedDistricts: [],

  buyerList: [],

  selectedBuyers: [],

  zustProductId: "",
};

const store = (set: any) => ({
  ...initialState,
  toggleTheme: () =>
    set((state: ThemeState) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  setSelectedTalukas: (taluka: any) => {
    set((state: any) => ({
      selectedTalukas: [taluka, ...state.selectedTalukas],
    }));
  },
  removeSelectedTalukas: (taluka: any) => {
    set((state: any) => ({
      selectedTalukas: state.selectedTalukas.filter(
        (t: any) => t.id !== taluka.id
      ),
    }));
  },
  removeSelectedTalukasBasedOnDistrictId: (districtId: string) => {
    set((state: any) => ({
      selectedTalukas: state.selectedTalukas.filter(
        (t: any) => t.districtId !== districtId
      ),
    }));
  },
  setSelectedStates: (stateItem: any) => {
    set((state: any) => ({
      selectedStates: [stateItem, ...state.selectedStates],
    }));
  },
  removeSelectedStates: (stateItem: any) => {
    set((state: any) => ({
      selectedStates: state.selectedStates.filter(
        (s: any) => s.id !== stateItem.id
      ),
    }));
  },
  setSelectedDistricts: (districtItem: any) => {
    set((state: any) => ({
      selectedDistricts: [districtItem, ...state.selectedDistricts],
    }));
  },
  removeSelectedDistricts: (districtItem: any) => {
    set((state: any) => ({
      selectedDistricts: state.selectedDistricts.filter(
        (d: any) => d.id !== districtItem.id
      ),
    }));
  },
  removeSelectedDistrictsBasedOnStateId: (stateId: string) => {
    set((state: any) => ({
      selectedDistricts: state.selectedDistricts.filter(
        (d: any) => d.stateId !== stateId
      ),
    }));
  },
  setZustProductId: (id: string) => {
    set((state: any) => ({
      zustProductId: id,
    }));
  },
  setBuyerList: (list: any) => {
    set((state: any) => ({
      buyerList: list,
    }));
  },
  setSelectedBuyers: (buyer: any) => {
    set((state: any) => ({
      selectedBuyers: [buyer, ...state.selectedBuyers],
    }));
  },

  saveSelectedBuyers: (buyer: any) => {
    set({
      selectedBuyers: buyer,
    });
  },
  resetState: () => {
    set(initialState);
  },
});

const useGlobalState = create(store);

export default useGlobalState;
