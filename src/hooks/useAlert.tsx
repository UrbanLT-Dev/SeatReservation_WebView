import { create } from "zustand";

interface AlertStore {
    isOpen: boolean;
    title: string;
    description: string;
    cancelText: string;
    confirmText: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    open: (params: Omit<AlertStore, "isOpen" | "open" | "close">) => void;
    close: () => void;
}

export const useAlert = create<AlertStore>((set) => ({
    isOpen: false,
    title: "",
    description: "",
    cancelText: "취소",
    confirmText: "확인",
    onConfirm: undefined,
    onCancel: undefined,
    open: (params) => set({ isOpen: true, ...params }),
    close: () => {
        set({ isOpen: false });
        setTimeout(() => {
            document.body.style.pointerEvents = "auto";
        }, 300);
    },
}));
