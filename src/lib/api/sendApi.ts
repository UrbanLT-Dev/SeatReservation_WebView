import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/lib/utils/tokenUtils";

export const privateApi = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/auth`,
    headers: {
        "Content-Type": "application/json",
    },
});
export const publicApi = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
privateApi.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.config?.url === "/login/check") {
            return Promise.reject({ response: { status: 401 } });
        }
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await setAccessTokenFromRefreshToken();
                if (newToken) {
                    // 토큰 갱신 시에는 기존 autoLogin 설정을 유지
                    const autoLogin = localStorage.getItem("autoLogin") === "true";
                    const { setAccessToken } = await import("@/lib/utils/tokenUtils");
                    setAccessToken(newToken, autoLogin);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return privateApi(originalRequest);
                }
            } catch (refreshError) {
                // console.error("Token refresh failed:", refreshError);
                removeAccessToken();
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export const setAccessTokenFromRefreshToken = async (): Promise<string | null> => {
    try {
        const response = await publicApi.post("/refresh");
        return response.data.data;
    } catch (error) {
        // console.error("Failed to refresh token:", error);
        removeAccessToken();
        window.location.href = "/";
        return null;
    }
};
