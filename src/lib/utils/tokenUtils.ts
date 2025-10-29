// 토큰 관리 유틸리티 함수들
export const getAccessToken = (): string | null => {
    if (localStorage.getItem("autoLogin") === "true") {
        return localStorage.getItem("accessToken");
    }
    return sessionStorage.getItem("accessToken");
};

export const setAccessToken = (token: string, autoLogin: boolean): void => {
    if (autoLogin) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("autoLogin", "true");
    } else {
        sessionStorage.setItem("accessToken", token);
        localStorage.removeItem("accessToken");
        localStorage.setItem("autoLogin", "false");
    }
};

export const removeAccessToken = (): void => {
    const autoLogin = localStorage.getItem("autoLogin");
    if (autoLogin === "true") {
        localStorage.removeItem("accessToken");
    } else {
        sessionStorage.removeItem("accessToken");
    }
};

export const clearAllTokens = (): void => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    localStorage.setItem("autoLogin", "false");
    sessionStorage.removeItem("centerId");
};
