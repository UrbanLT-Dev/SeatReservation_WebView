import { create } from "zustand";
import { ReactNode } from "react";

interface DetailStore {
    isOpen: boolean;
    title: string;
    content: ReactNode | null;
    open: (title: string, content: ReactNode) => void;
    close: () => void;
}

export const useDetailStore = create<DetailStore>((set) => ({
    isOpen: false,
    title: "",
    content: null,
    open: (title, content) => set({ isOpen: true, title, content }),
    close: () => set({ isOpen: false, title: "", content: null }),
}));
