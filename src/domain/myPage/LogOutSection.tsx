import { loginApi } from "@/lib/api/loginApi";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Arrow from "@/svg/Arrow.tsx";

const LogOutSection = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        loginApi.logout().finally(() => {
            logout();
            navigate("/");
        })
    };
    return (
        <button type="button" className="flex justify-between text-error-red px-4 pb-4" onClick={handleLogout}>
            로그아웃

            <div className="rotate-180">
                <Arrow color="#ccc" width={7} height={14} />
            </div>
        </button>
    );
};

export default LogOutSection;
