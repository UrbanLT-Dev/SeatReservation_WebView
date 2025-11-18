import Arrow from "@/svg/Arrow.tsx";
import { useNavigate } from "react-router-dom";

const PasswordChangeSection = () => {
    const navigate = useNavigate();
    return (
        <button onClick={() => {
            navigate("/change-password");
        }} type="button" className="flex justify-between px-4 pb-4 pt-4 font-semibold">
            비밀번호 변경

            <div className="rotate-180">
                <Arrow color="#ccc" width={7} height={14} />
            </div>
        </button>
    );
};

export default PasswordChangeSection;
