import { create } from "zustand";

const useBearStore = create((set) => ({
  segments: [],
  emailTemplates: [],
  updateSegments: (incomingSegments) => set(() => ({ segments: [...incomingSegments] })),
  updateEmailTemplates: (incomingEmailTemplates) =>
    set((state) => ({ emailTemplates: [...state.emailTemplates, incomingEmailTemplates] })),
}));

export default useBearStore;
