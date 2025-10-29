import { publicApi, privateApi } from "./sendApi";
import { ApiErrorResponse, ApiResponse } from "../types/api";
import { AxiosError } from "axios";
export type LoginApiError = AxiosError<ApiErrorResponse>;
interface LoginRequest {
    loginId: string;
    password: string;
}

interface LoginResponseData {
    accessToken: string;
}

interface LoginInfoResponseData {
    centerId: number;
}

export const loginApi = {
    login: async (data: LoginRequest) => {
        const response = await publicApi.post<ApiResponse<LoginResponseData>>("/login", data, { withCredentials: true });
        return response.data;
    },
    loginCheck: async () => {
        const response = await privateApi.get<ApiResponse<LoginResponseData>>("/login/check");
        return response.data;
    },
    loginInfo: async () => {
        const response = await privateApi.get<ApiResponse<LoginInfoResponseData>>("/my-center");
        return response.data;
    },
    logout: async () => {
        const response = await publicApi.post<ApiResponse<LoginResponseData>>("/logout/admin", {}, { withCredentials: true });
        return response.data;
    },
};
