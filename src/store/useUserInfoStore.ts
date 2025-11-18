import { create } from "zustand";


interface userInfo {
    memberName?: string;
    departmentName?: string;
    jobTitleName?: string;
    imageUrl?: string;
}

interface UserInfoStore extends userInfo {
    setUserInfo: (userInfo: userInfo) => void;
}

export const useUserInfoStore = create<UserInfoStore>((set) => ({
    memberName: undefined,
    departmentName: undefined,
    jobTitleName: undefined,
    imageUrl: undefined,
    setUserInfo: (userInfo: userInfo) => set({ ...userInfo })
}));
