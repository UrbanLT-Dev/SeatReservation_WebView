import { loginApi } from "@/lib/api/loginApi";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogOutSection = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        loginApi.logout().then(() => {
            logout();
            navigate("/");
        });
    };
    return (
        <div className="text-error-red px-4 pb-4" onClick={handleLogout}>
            로그아웃
        </div>
    );
};

export default LogOutSection;
