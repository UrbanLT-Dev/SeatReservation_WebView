import { QRCodeCanvas } from "qrcode.react";
import MedamLogo from "@/svg/MedamLogo";

const Qr = ({ value, isAvailable }: { value: string; isAvailable: boolean }) => {
    return (
        <div className="relative h-[180px] w-[180px]">
            <QRCodeCanvas value={isAvailable ? value : "사용 불가"} size={180} level="H" />
            {/* 로고 */}
            <div className="rounded-lgp-1 absolute top-1/2 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <MedamLogo width={50} height={50} backgroundColor="white" logoColor="#000000" />
            </div>
            {/* 사용 불가 오버레이 */}
            {!isAvailable && (
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-lg bg-black/50 text-xl font-bold text-white">
                    사용 불가
                </div>
            )}
        </div>
    );
};

export default Qr;
