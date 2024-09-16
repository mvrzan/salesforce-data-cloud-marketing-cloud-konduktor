import { create } from "zustand";

const useBearStore = create((set) => ({
  generalFormInformation: {
    intent: "",
    channel: "",
    name: "",
  },
  updateGeneralFormInformation: (info) =>
    set((state) => ({
      generalFormInformation: { ...state.generalFormInformation, ...info },
    })),
}));

export default useBearStore;
