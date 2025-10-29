import { create } from "zustand";

interface ServiceModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useServiceModalStore = create<ServiceModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
