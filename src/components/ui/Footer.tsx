import Clock from "@/svg/Clock";
import CloseIcon from "@/svg/CloseIcon";
import MyPageIcon from "@/svg/MyPageIcon";
import QrIcon from "@/svg/QrIcon";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QrModal from "./QrModal";

const Footer = () => {
    const navigate = useNavigate();
    const pathname = useLocation();
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    const isMain = pathname.pathname === "/main";
    const isMyPage = pathname.pathname === "/my-page";
    const isQr = pathname.pathname === "/qr";

    const onClickLink = (path: string) => {
        if (path === "/main" && isMain) {
            return;
        } else if (path === "/my-page" && isMyPage) {
            return;
        } else if (path === "/qr" && isQr) {
            return;
        }
        navigate(path);
    };

    const handleQrClick = () => {
        setIsQrModalOpen(!isQrModalOpen);
    };

    return (
        <div className="fixed right-0 bottom-0 left-0 z-11 bg-white">
            {/* 가운데 QR 버튼 */}
            {isQrModalOpen && <QrModal />}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2" onClick={handleQrClick}>
                <div className="bg-main-color/25 flex h-[60px] w-[60px] items-center justify-center rounded-full p-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    {isQrModalOpen ? (
                        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white p-1">
                            <CloseIcon width={16} height={16} color="var(--color-main-color)" />
                        </div>
                    ) : (
                        <div className="bg-main-color flex h-[52px] w-[52px] items-center justify-center rounded-full p-1">
                            <QrIcon width={28} height={28} color="white" />
                        </div>
                    )}
                </div>
                <p className="text-text-gray mt-1 text-center text-[10px]">출입</p>
            </div>

            {/* 푸터 메인 */}
            <div className="border-border-gray flex flex-row justify-between border-t px-[15%] py-2">
                <div className="flex flex-col items-center gap-[6px] p-1" onClick={() => onClickLink("/main")}>
                    <Clock width={24} height={24} color={isMain ? "var(--color-main-color)" : "var(--color-text-gray)"} />
                    <Text text="예약" isActive={isMain} />
                </div>
                <div className="invisible flex flex-col items-center gap-[6px] p-1">
                    <div className="h-[24px] w-[24px]" />
                    <Text text="출입" isActive={isQr} />
                </div>
                <div className="flex flex-col items-center gap-[6px] p-1" onClick={() => onClickLink("/my-page")}>
                    <MyPageIcon width={24} height={24} color={isMyPage ? "var(--color-main-color)" : "var(--color-text-gray)"} />
                    <Text text="내정보" isActive={isMyPage} />
                </div>
            </div>
        </div>
    );
};

const Text = ({ text, isActive }: { text: string; isActive: boolean }) => {
    return <p className={`text-[10px] font-[500] ${isActive ? "" : "text-text-gray"}`}>{text}</p>;
};

export default Footer;
