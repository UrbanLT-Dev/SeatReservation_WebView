import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // const navigate = useNavigate();
    // const { checkAuth, getAccessToken } = useAuth();
    //
    // useEffect(() => {
    //     const isAuthenticated = checkAuth();
    //     if (!isAuthenticated) {
    //         navigate("/login", { replace: true });
    //     }
    // }, [checkAuth, navigate]);
    //
    // // accessToken 체크
    // const accessToken = getAccessToken();
    //
    // // accessToken이 없으면 null 반환 (useEffect에서 리다이렉트 처리)
    // if (!accessToken) {
    //     return null;
    // }

    return <>{children}</>;
};

export default ProtectedRoute;
