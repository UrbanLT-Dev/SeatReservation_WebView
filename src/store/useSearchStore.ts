import { create } from "zustand";
import { getDateOfYYYYMMDD } from "@/lib/function/date";
interface SearchState {
    selectedDate: string;
    startTime: string;
    endTime: string;
    showAvailableOnly: boolean;
    isSearch: number;
    setSelectedDate: (date: string) => void;
    setStartTime: (time: string) => void;
    setEndTime: (time: string) => void;
    setShowAvailableOnly: (show: boolean) => void;
    setIsSearch: (isSearch: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    selectedDate: getDateOfYYYYMMDD(new Date()),
    startTime: "",
    endTime: "",
    showAvailableOnly: false,
    isSearch: 0,
    setSelectedDate: (date) => set({ selectedDate: date }),
    setStartTime: (time) => set({ startTime: time }),
    setEndTime: (time) => set({ endTime: time }),
    setShowAvailableOnly: (show) => set({ showAvailableOnly: show }),
    setIsSearch: (isSearch) => set({ isSearch }),
}));

export default useSearchStore;
