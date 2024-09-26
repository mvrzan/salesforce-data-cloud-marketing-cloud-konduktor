import { create } from "zustand";

const useBearStore = create((set) => ({
  segments: [],
  updateSegments: (incomingSegments) => set(() => ({ segments: [...incomingSegments] })),
}));

export default useBearStore;
