import MyButton from "@/components/form/button/MyButton";
import { getReservationData, getReservationTimeList, minutesToTimeString } from "@/domain/main/mainFunction";
import ColorInfoSection from "@/domain/room/ColorInfoSection";
import ReservationTimeButton from "@/domain/room/ReservationTimeButton";
import RoomTitle from "@/domain/room/RoomTitle";
import { ReservationApiError } from "@/lib/api/reservationApi";
import { ReservationRequest, roomApi, RoomReservationInfoResponseData } from "@/lib/api/roomApi";
import { getDateOfYYYYMMDD } from "@/lib/function/date";
import useSearchStore from "@/store/useSearchStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import Service from "@/components/modal/UI/service.tsx";
import SeatSection from "@/domain/main/SeatSection.tsx";

const RoomReservationInfo = (roomInfo: RoomReservationInfoResponseData) => {
    const { selectedDate, isSearch, startTime, endTime, showAvailableOnly } = useSearchStore();
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isSeatDialogOpen, setIsSeatDialogOpen] = useState(false);

    const close = () => {
        setIsSeatDialogOpen(false);
    };

    const handleTimeSelect = (time: number) => {
        if (selectedTimes.includes(time)) {
            // 이미 선택된 시간을 클릭한 경우, 해당 시간 이후의 선택을 모두 해제
            setSelectedTimes(selectedTimes.filter((t) => t !== time));
            return;
        }
        // 선택된 시간이 없는 경우, 새로운 시간 선택
        if (selectedTimes.length === 0) {
            setSelectedTimes([time]);
            return;
        }

        // // 연속된 시간만 선택 가능
        // const lastSelected = Math.max(...selectedTimes);
        // if (time !== lastSelected + roomInfo.reservationUnitTime) {
        //     toast.warning("연속된 시간만 선택할 수 있습니다.");
        //     setSelectedTimes([time]);
        //     return;
        // }

        if ((selectedTimes.length + 1) * roomInfo.reservationUnitTime > roomInfo.maxUsageTime) {
            toast.error(`최대 ${roomInfo.maxUsageTime}분까지만 예약할 수 있습니다.`);
            return;
        }

        setSelectedTimes([time]);
    };

    const handleReservation = () => {
        const now = getDateOfYYYYMMDD(new Date());
        if (selectedDate < now) {
            toast.error("과거 시간 예약은 불가능합니다.");
            return;
        }
        if (isSearch === 0) {
            if (selectedTimes.length === 0) {
                toast.error("예약할 시간을 선택해주세요.");
                return;
            }
            setIsSeatDialogOpen(true);
            // const startTime = minutesToTimeString(Math.min(...selectedTimes));
            // const endTime = minutesToTimeString(Math.max(...selectedTimes) + roomInfo.reservationUnitTime);
            // const reservationData = getReservationData(roomInfo.roomId, "ROOM", selectedDate, startTime, endTime);
            // mutate(reservationData);
        } else {
            setIsSeatDialogOpen(true);
            // const reservationData = getReservationData(roomInfo.roomId, "ROOM", selectedDate, startTime, endTime);
            // mutate(reservationData);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ReservationRequest) => roomApi.reservation(data),
        onSuccess: () => {
            toast.success("예약을 성공했습니다.");
            queryClient.invalidateQueries({ queryKey: ["nonTime"] });
            queryClient.invalidateQueries({ queryKey: ["reservation"] });
            navigate(`/history`);
        },
        onError: (error: ReservationApiError) => {
            // console.error("Reservation error:", error.response?.data.data.value);
            toast.error(error.response?.data.data.value ?? "예약에 실패했습니다.");
        },
    });
    // roomInfo가 필요한 모든 데이터를 가지고 있는지 확인
    if (!roomInfo?.startTime || !roomInfo?.endTime || !roomInfo?.reservationUnitTime) {
        return (
            <div className="flex flex-col gap-4">
                <RoomTitle roomId={roomInfo.roomId} roomName={roomInfo.roomName} maxCapacity={roomInfo.maxCapacity} />
                <MyButton
                    title={`예약 ${roomInfo.isAvailable ? "" : " 불가"}`}
                    isDisabled={!roomInfo.isAvailable}
                    isPending={isPending}
                    onClick={handleReservation}
                    type="button"
                />
            </div>
        ); // 또는 적절한 에러 메시지를 보여줄 수 있습니다
    }
    const reservationTimeList = getReservationTimeList(
        roomInfo.startTime,
        roomInfo.endTime,
        roomInfo.reservationUnitTime,
        roomInfo.reservationTimes ?? [],
        selectedDate,
    );
    if (reservationTimeList.length === 0) {
        return null;
    }
    // console.log(reservationTimeList);
    const reservationCompleteTimeList = reservationTimeList.filter(
        (reservationTime) => reservationTime.status === "COMPLETE" || reservationTime.status === "USED",
    );
    if (showAvailableOnly && reservationCompleteTimeList.length === reservationTimeList.length) {
        return null;
    }
    // console.log(reservationTimeList);
    return (
        <div className="flex flex-col gap-4">
            <RoomTitle roomId={roomInfo.roomId} roomName={roomInfo.roomName} maxCapacity={roomInfo.maxCapacity} />
            <div className="flex flex-col gap-4">
                <ColorInfoSection />
                <div className="grid grid-cols-3 gap-2.5">
                    {isSearch === 0 &&
                        reservationTimeList.map((reservationTime) => (
                            <ReservationTimeButton
                                key={reservationTime.time}
                                time={reservationTime.time}
                                status={reservationTime.status}
                                reservationUnitTime={roomInfo.reservationUnitTime ?? 0}
                                isSelected={selectedTimes.includes(reservationTime.time)}
                                onClick={() => handleTimeSelect(reservationTime.time)}
                                reservationId={reservationTime.reservationId}
                            />
                        ))}
                </div>
            </div>
            <MyButton title="예약" isPending={isPending} onClick={handleReservation} type="button" />

            <Dialog open={isSeatDialogOpen} onOpenChange={close}>
                <DialogContent className="flex h-[80vh] w-[90vw] max-w-none flex-col gap-0 p-0 rounded-xl">
                    <DialogHeader className="relative h-13 w-full">
                        <div className="flex items-center justify-center p-4">
                            <DialogTitle className="text-xl font-bold">좌석 지정</DialogTitle>
                            <button className="absolute top-[50%] right-4 translate-x-0 translate-y-[-50%]" onClick={close}>
                                <div className="relative h-6 w-6">
                                    <span className="bg-text-black absolute top-[50%] left-[50%] h-[2px] w-full translate-x-[-50%] rotate-45" />
                                    <span className="bg-text-black absolute top-[50%] left-[50%] h-[2px] w-full translate-x-[-50%] rotate-135" />
                                </div>
                            </button>
                        </div>
                    </DialogHeader>
                    <div className="overflow-auto">
                        <SeatSection />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RoomReservationInfo;
