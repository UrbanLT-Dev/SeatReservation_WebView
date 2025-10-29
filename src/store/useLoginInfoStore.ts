import { create } from "zustand";

interface LoginInfoState {
    centerId: number;
    setCenterId: (centerId: number) => void;
}

// sessionStorage에서 centerId 가져오기
const getStoredCenterId = () => {
    const storedCenterId = sessionStorage.getItem("centerId");
    return storedCenterId ? parseInt(storedCenterId) : 0;
};

const useLoginInfoStore = create<LoginInfoState>((set) => ({
    centerId: getStoredCenterId(),
    setCenterId: (centerId) => set({ centerId }),
}));

export default useLoginInfoStore;
