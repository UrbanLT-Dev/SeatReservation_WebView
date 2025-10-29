import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, setAccessToken, clearAllTokens } from "@/lib/utils/tokenUtils";

interface UseAuthReturn {
    isAuthenticated: boolean;
    isAutoLogin: boolean;
    setAutoLogin: (value: boolean) => void;
    login: (token: string, autoLogin: boolean) => void;
    logout: () => void;
    getAccessToken: () => string | null;
    checkAuth: () => boolean;
}

const useAuth = (): UseAuthReturn => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    // 인증 상태 확인
    const checkAuth = useCallback((): boolean => {
        const token = getAccessToken();
        const authenticated = !!token;
        setIsAuthenticated(authenticated);
        return authenticated;
    }, []);

    // 로그인
    const login = useCallback((token: string, autoLogin: boolean) => {
        setAccessToken(token, autoLogin);
        setIsAuthenticated(true);
        setIsAutoLogin(autoLogin);
    }, []);

    // 로그아웃
    const logout = useCallback(() => {
        clearAllTokens();
        setIsAuthenticated(false);
        setIsAutoLogin(false);
        navigate("/");
    }, [navigate]);

    // 초기화 및 autoLogin 상태 설정
    useEffect(() => {
        const autoLogin = localStorage.getItem("autoLogin");
        setIsAutoLogin(autoLogin === "true");
        checkAuth();
    }, [checkAuth]);

    // autoLogin 상태 변경
    const setAutoLoginState = useCallback((value: boolean) => {
        setIsAutoLogin(value);
    }, []);

    return {
        isAuthenticated,
        isAutoLogin,
        setAutoLogin: setAutoLoginState,
        login,
        logout,
        getAccessToken,
        checkAuth,
    };
};

export default useAuth;
