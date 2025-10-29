import { create } from "zustand";

interface SearchState {
    status: string;
    period: number;
    setStatus: (status: string) => void;
    setPeriod: (period: number) => void;
}

const useHistorySearchStore = create<SearchState>((set) => ({
    status: "all",
    period: 1,
    setStatus: (status) => set({ status }),
    setPeriod: (period) => set({ period }),
}));

export default useHistorySearchStore;
