import BackIcon from "@/svg/BackIcon";
import { useNavigate } from "react-router-dom";

type BackHeaderProps = {
    title: string;
    rightComponent?: React.ReactNode;
    isShowBackIcon?: boolean;
};
const BackHeader = ({ title, rightComponent, isShowBackIcon = true }: BackHeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 z-10 flex h-16 w-full items-center bg-white px-4">
            <div className="absolute left-4" onClick={() => navigate(-1)}>
                {isShowBackIcon && <BackIcon />}
            </div>
            <div className="flex-1 text-center">
                <p className="text-xl font-bold">{title}</p>
            </div>
            {rightComponent && <div className="absolute right-4">{rightComponent}</div>}
        </div>
    );
};

export default BackHeader;
