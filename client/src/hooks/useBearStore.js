import { create } from "zustand";

const useBearStore = create((set) => ({
  segments: [
    { name: "segment1", segmentId: 1 },
    { name: "segment2", segmentId: 2 },
  ],
  updateSegments: (incomingSegments) => set(() => ({ segments: [...incomingSegments] })),
}));

export default useBearStore;
