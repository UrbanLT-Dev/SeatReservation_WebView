import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./carousel";
import { useState, useEffect } from "react";
import Arrow from "@/svg/Arrow";
import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "@/lib/api/reservationApi";
import Qr from "./Qr";
import { getTimeToString } from "@/lib/function/time";
import Line from "./Line";
import KeyIcon from "@/svg/KeyIcon";
import MyButton from "../form/button/MyButton";
import emptyAnimation from "../../../public/assets/empty.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
const QrModal = () => {
    const [api, setApi] = useState<CarouselApi>();
    const navigate = useNavigate();
    useEffect(() => {
        if (!api) {
            return;
        }
    }, [api]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["reservationList"],
        queryFn: () => reservationApi.reservationByIsAvailable(),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    const reservationList = [...(data?.data ?? [])].sort((a, b) => {
        const now = new Date();
        const aDate = new Date(`${a.reservationDate} ${a.startTime}`);
        const bDate = new Date(`${b.reservationDate} ${b.startTime}`);

        // 현재 시간과의 차이 계산 (절대값)
        const aDiff = Math.abs(aDate.getTime() - now.getTime());
        const bDiff = Math.abs(bDate.getTime() - now.getTime());

        return aDiff - bDiff;
    });

    return (
        <div className="bg-text-black/30 fixed top-0 left-0 h-full w-full">
            <div className="absolute top-[50%] left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white p-4">
                <div className="relative w-full pb-4">
                    {reservationList.length !== 0 && (
                        <Carousel className="mx-auto w-full max-w-xs" setApi={setApi}>
                            <div className="flex items-center justify-between">
                                <button onClick={() => api?.scrollPrev()} className="flex items-center justify-center p-2">
                                    <Arrow width={14} height={14} color="var(--color-text-gray)" />
                                </button>
                                <CarouselContent className="flex-1">
                                    {reservationList?.map((reservation) => (
                                        <CarouselItem key={reservation.reservationId} className="flex items-center justify-center">
                                            <div className="flex w-full flex-col items-center justify-center gap-4">
                                                <h1 className="text-xl font-bold">{reservation.roomName}</h1>
                                                <div className="flex items-center justify-center gap-2.5 whitespace-nowrap">
                                                    <p className="text-text-gray font-[500]">{reservation.reservationDate}</p>
                                                    <Line />
                                                    <p className="text-text-gray font-[500]">
                                                        {getTimeToString(reservation.startTime)} ~{getTimeToString(reservation.endTime)}
                                                    </p>
                                                </div>
                                                <div className="flex w-full items-center justify-center">
                                                    <Qr
                                                        value={reservation.reservationId.toString()}
                                                        isAvailable={reservation.status === "COMPLETE"}
                                                    />
                                                </div>
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <KeyIcon />
                                                    <p className="text-text-gray">{reservation.reservationId}</p>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <button onClick={() => api?.scrollNext()} className="flex items-center justify-center p-2">
                                    <div className="rotate-180">
                                        <Arrow width={14} height={14} color="var(--color-text-gray)" />
                                    </div>
                                </button>
                            </div>
                        </Carousel>
                    )}

                    {reservationList.length === 0 && (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <h1 className="text-xl font-bold">입장</h1>
                                <p className="text-text-gray font-[500]">입장 가능한 예약이 없어요</p>
                            </div>
                            <Lottie animationData={emptyAnimation} style={{ height: 200, width: 200 }} loop={true} autoplay={true} />
                        </div>
                    )}
                </div>
                {reservationList.length === 0 ? (
                    <MyButton title="예약내역 보기" isPending={false} onClick={() => navigate("/history")} type="button" />
                ) : (
                    // <MyButton title="임시 키 공유" isPending={false} onClick={() => {}} type="button" />
                    <></>
                )}
            </div>
        </div>
    );
};

export default QrModal;
