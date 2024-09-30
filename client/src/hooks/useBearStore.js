import { create } from "zustand";

const useBearStore = create((set) => ({
  segments: [],
  emailTemplates: [],
  updateSegments: (incomingSegments) => set(() => ({ segments: [...incomingSegments] })),
  updateEmailTemplates: (incomingEmailTemplates) =>
    set((state) =>
      incomingEmailTemplates.emailTemplateEditor
        ? { emailTemplates: [...state.emailTemplates, incomingEmailTemplates] }
        : { emailTemplates: [...incomingEmailTemplates] }
    ),
}));

export default useBearStore;
