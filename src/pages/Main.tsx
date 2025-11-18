import { useState } from "react";
import SeatReservationBg from "@/svg/SeatReservationBg.tsx";
import Seat1 from "@/svg/Seat1.tsx";
import Seat3 from "@/svg/Seat3.tsx";
import NonBackHeader from "@/components/ui/NonBackHeader";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import Seat3left from "@/svg/Seat3left.tsx";
import Seat1down from "@/svg/Seat1down.tsx";
import { Button } from "@/components/ui/button.tsx";

const SeatSection = ({
    state,
    type,
    sectionName,
    left,
    top,
    rotateAngle,
}: {
    state: "default" | "mine" | "selected" | "disabled";
    type: string;
    sectionName: string;
    left: number;
    top: number;
    rotateAngle: string;
}) => {
    const fillColor = {
        default: {
            bg: "#CDCDEA",
            stroke: "#28285F",
            opacity: 1,
        },
        mine: {
            bg: "#188D6D",
            stroke: "#ffffff",
            opacity: 1,
        },
        selected: {
            bg: "#28285F",
            stroke: "#ffffff",
            opacity: 1,
        },
        disabled: {
            bg: "#F0F0F9",
            stroke: "#CCCCEB",
            opacity: 0.3,
        },
    };

    return (
        <div
            style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {type === "seat" ? (
                <>
                    <>
                        {
                            rotateAngle === "down" ? (
                                <Seat1down state={state} />
                            ) : (
                                <Seat1 state={state} />
                            )
                        }
                    </>
                    <span
                        className="absolute"
                        style={{
                            top: rotateAngle === "up" ? "10px" : "4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginTop: "4px",
                            color: fillColor[state].stroke,
                            fontSize: "12px",
                        }}
                    >
                        {sectionName}
                    </span>
                </>
            ) : (
                <>
                    <>
                        {
                            rotateAngle === "left" ? (
                                <Seat3left state={state} />
                            ) : (
                                <Seat3 state={state} />
                            )
                        }
                    </>
                    <span
                        className="absolute"
                        style={{
                            top: rotateAngle === "left" ? "14px" : "9px",
                            left: rotateAngle === "left" ? "22px" : "50%",
                            transform: "translateX(-50%)",
                            marginTop: "4px",
                            color: fillColor[state].stroke,
                            fontSize: "12px",
                        }}
                    >
                        {sectionName}
                    </span>
                </>
            )}
        </div>
    );
};

const Main = () => {
    const [activeTab, setActiveTab] = useState<"종일" | "오전" | "오후">("종일");
    const { scale = 1, transformOrigin = "top center" } = useResponsiveScale({ originalWidth: 353 });
    const onClickCancelReservation = () => {
        // 전체 예약 취소 로직 구현
        console.log("전체 예약 취소 클릭됨");
    }

    return (
        <div>
            <NonBackHeader title="좌석 예약" />

            {/* Sticky Tab Header Section */}
            <div className="sticky top-0 z-50 bg-white">
                <div className="relative flex h-[52px] w-full shrink-0 items-center bg-white">
                    <button
                        onClick={() => setActiveTab("종일")}
                        className={`flex h-full flex-1 items-center justify-center border-b-2 px-[12px] py-0 text-center text-[14px] leading-normal font-bold text-nowrap whitespace-pre not-italic transition-colors ${
                            activeTab === "종일" ? "border-[#002063] text-[#002063]" : "border-[#dedede] text-[#464c53]"
                        }`}
                    >
                        종일
                    </button>
                    <button
                        onClick={() => setActiveTab("오전")}
                        className={`flex h-full flex-1 items-center justify-center border-b-2 px-[12px] py-0 text-center text-[14px] leading-normal font-bold text-nowrap whitespace-pre not-italic transition-colors ${
                            activeTab === "오전" ? "border-[#002063] text-[#002063]" : "border-[#dedede] text-[#464c53]"
                        }`}
                    >
                        오전
                    </button>
                    <button
                        onClick={() => setActiveTab("오후")}
                        className={`flex h-full flex-1 items-center justify-center border-b-2 px-[12px] py-0 text-center text-[14px] leading-normal font-bold text-nowrap whitespace-pre not-italic transition-colors ${
                            activeTab === "오후" ? "border-[#002063] text-[#002063]" : "border-[#dedede] text-[#464c53]"
                        }`}
                    >
                        오후
                    </button>
                </div>
            </div>

            <div className="relative mb-5 w-full shrink-0 border-b border-[#dedede]">
                <div className="relative box-border flex w-full items-center overflow-clip px-[20px] py-[14px]">
                    <div className="flex flex-1 items-center gap-[14px]">
                        <div className="flex items-center gap-[4px]">
                            <div className="size-[16px] shrink-0 rounded-[2px] border border-[#123458] bg-[#c7d9ff]" />
                            <p className="text-center text-[12px] leading-normal font-medium text-nowrap whitespace-pre text-[#333333] not-italic">
                                선택 가능
                            </p>
                        </div>
                        <div className="flex items-center gap-[4px]">
                            <div className="size-[16px] shrink-0 rounded-[2px] bg-[#002063]" />
                            <p className="text-center text-[12px] leading-normal font-medium text-nowrap whitespace-pre text-[#333333] not-italic">
                                선택 좌석
                            </p>
                        </div>
                        <div className="flex items-center gap-[4px]">
                            <div className="size-[16px] shrink-0 rounded-[2px] bg-[#d9d9d9]" />
                            <p className="text-center text-[12px] leading-normal font-medium text-nowrap whitespace-pre text-[#333333] not-italic">
                                선택 불가
                            </p>
                        </div>
                        <div className="flex items-center gap-[4px]">
                            <div className="size-[16px] shrink-0 rounded-[2px] bg-[#188D6D]" />
                            <p className="text-center text-[12px] leading-normal font-medium text-nowrap whitespace-pre text-[#333333] not-italic">
                                내 좌석
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-10 py-5 px-5 mx-5 rounded-lg bg-[#F9F9F9]">
                <div className="flex flex-col text-sm">
                    <div>
                        <span className="text-[#EF4444] font-bold">오전 1번 좌석</span> 예약완료
                    </div>
                    <div>
                        <span className="text-[#EF4444] font-bold">오후 3번 좌석</span> 예약완료
                    </div>
                </div>
                <Button onClick={onClickCancelReservation} className="rounded-xl w-[120px]" type="button">전체 예약 취소</Button>
            </div>

            {/* 반응형 좌석 지도 컨테이너 */}
            <div className="flex justify-center px-[20px]">
                <div
                    className="relative h-[788.49px] w-[353px]"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin,
                        transition: "transform 0.3s ease-out",
                    }}
                >
                    <SeatReservationBg />

                    {/* Top Section - Group 7 */}
                    <SeatSection state="default" sectionName="7" type="group" left={172} top={30} rotateAngle="up" />

                    {/* Right Section - Seat 1 and Main Seats */}
                    <SeatSection state="default" sectionName="1" type="seat" left={258.25} top={150} rotateAngle="down" />

                    {/* Row 1: Seats 2, 3, 4 */}
                    <SeatSection state="default" sectionName="2" type="seat" left={148} top={224} rotateAngle="up" />
                    <SeatSection state="default" sectionName="3" type="seat" left={198} top={224} rotateAngle="up" />
                    <SeatSection state="default" sectionName="4" type="seat" left={260} top={224} rotateAngle="up" />

                    {/* Row 2: Seats 5, 6, 7 */}
                    <SeatSection state="default" sectionName="5" type="seat" left={148} top={258} rotateAngle="down" />
                    <SeatSection state="default" sectionName="6" type="seat" left={198} top={258} rotateAngle="down" />
                    <SeatSection state="default" sectionName="7" type="seat" left={260} top={258} rotateAngle="down" />

                    {/* Row 3: Seats 8, 9, 10 */}
                    <SeatSection state="default" sectionName="8" type="seat" left={148} top={326} rotateAngle="up" />
                    <SeatSection state="default" sectionName="9" type="seat" left={198} top={326} rotateAngle="up" />
                    <SeatSection state="default" sectionName="10" type="seat" left={260} top={326} rotateAngle="up" />

                    {/* Row 4: Seats 11, 12, 13 */}
                    <SeatSection state="default" sectionName="11" type="seat" left={148} top={360} rotateAngle="down" />
                    <SeatSection state="default" sectionName="12" type="seat" left={198} top={360} rotateAngle="down" />
                    <SeatSection state="default" sectionName="13" type="seat" left={260} top={360} rotateAngle="down" />

                    {/* Row 5: Seats 14, 15, 16 */}
                    <SeatSection state="default" sectionName="14" type="seat" left={148} top={462} rotateAngle="up" />
                    <SeatSection state="default" sectionName="15" type="seat" left={198} top={462} rotateAngle="up" />
                    <SeatSection state="default" sectionName="16" type="seat" left={260} top={462} rotateAngle="up" />

                    {/* Row 6: Seats 17, 18, 19 */}
                    <SeatSection state="default" sectionName="17" type="seat" left={148} top={496} rotateAngle="down" />
                    <SeatSection state="default" sectionName="18" type="seat" left={198} top={496} rotateAngle="down" />
                    <SeatSection state="default" sectionName="19" type="seat" left={260} top={496} rotateAngle="down" />

                    {/* Row 7: Seats 20, 21, 22 */}
                    <SeatSection state="default" sectionName="20" type="seat" left={148} top={566} rotateAngle="up" />
                    <SeatSection state="default" sectionName="21" type="seat" left={198} top={566} rotateAngle="up" />
                    <SeatSection state="default" sectionName="22" type="seat" left={260} top={566} rotateAngle="up" />

                    {/* Row 8: Seats 23, 24, 25 */}
                    <SeatSection state="default" sectionName="23" type="seat" left={148} top={600} rotateAngle="down" />
                    <SeatSection state="default" sectionName="24" type="seat" left={198} top={600} rotateAngle="down" />
                    <SeatSection state="default" sectionName="25" type="seat" left={260} top={600} rotateAngle="down" />

                    {/* Row 9: Seats 26, 27, 28 */}
                    <SeatSection state="default" sectionName="26" type="seat" left={148} top={668} rotateAngle="up" />
                    <SeatSection state="default" sectionName="27" type="seat" left={198} top={668} rotateAngle="up" />
                    <SeatSection state="default" sectionName="28" type="seat" left={260} top={668} rotateAngle="up" />

                    {/* Row 10: Seats 29, 30, 31 */}
                    <SeatSection state="default" sectionName="29" type="seat" left={148} top={702} rotateAngle="down" />
                    <SeatSection state="default" sectionName="30" type="seat" left={198} top={702} rotateAngle="down" />
                    <SeatSection state="default" sectionName="31" type="seat" left={260} top={702} rotateAngle="down" />

                    {/* Left Section - Groups 1-6 */}
                    <SeatSection state="default" sectionName="F1" type="group" left={22} top={526} rotateAngle="left" />
                    <SeatSection state="default" sectionName="F2" type="group" left={22} top={454} rotateAngle="left" />
                    <SeatSection state="default" sectionName="F3" type="group" left={22} top={382} rotateAngle="left" />
                    <SeatSection state="default" sectionName="F4" type="group" left={22} top={310} rotateAngle="left" />
                    <SeatSection state="default" sectionName="F5" type="group" left={22} top={238} rotateAngle="left" />
                    <SeatSection state="default" sectionName="F6" type="group" left={22} top={166} rotateAngle="left" />
                </div>
            </div>
        </div>
    );
};

export default Main;
