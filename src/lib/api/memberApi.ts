import { privateApi } from "./sendApi";
import { ApiResponse } from "../types/api";

interface MyInfoResponseData {
    memberName: string;
    departmentName: string;
    jobTitleName: string;
    imageUrl: string;
}

export const myInfoApi = {
    myInfo: async () => {
        const response = await privateApi.get<ApiResponse<MyInfoResponseData>>("/my-info");
        return response.data;
    },
};
