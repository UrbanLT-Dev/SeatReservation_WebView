import MyButton from "@/components/form/button/MyButton";
import ColorInfoSection from "@/domain/room/ColorInfoSection";
import ReservationTimeButton from "@/domain/room/ReservationTimeButton";
import RoomDetail from "@/domain/room/RoomDetail";
import RoomTitle from "@/domain/room/RoomTitle";
import { useTimeSelect } from "@/hooks/useTimeSelect";
import { reservationApi, useReservationUpdate } from "@/lib/api/reservationApi";
import { roomApi } from "@/lib/api/roomApi";
import { dateToDayOfWeek } from "@/lib/function/date";
import { getTimeToString } from "@/lib/function/time";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getReservationTimeList, minutesToTimeString } from "../main/mainFunction";

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const MyReservationUpdate = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        data: reservationData,
        isLoading: reservationLoading,
        isError: reservationError,
    } = useQuery({
        queryKey: ["reservation", id],
        queryFn: () => reservationApi.reservationDetail(Number(id)),
    });

    const {
        data: roomData,
        isLoading: roomLoading,
        isError: roomError,
    } = useQuery({
        queryKey: ["room", reservationData?.data.roomId],
        queryFn: () =>
            roomApi.nonTime({
                searchDate: reservationData?.data.reservationDate ?? "",
                roomId: reservationData?.data.roomId ?? 0,
            }),
        enabled: !!reservationData?.data.roomId && !!reservationData?.data.reservationDate,
    });

    const { selectedTimes, handleTimeSelect, setSelectedTimes } = useTimeSelect({
        reservationUnitTime: roomData?.data.reservationUnitTime,
        maxUsageTime: roomData?.data.maxUsageTime,
        enabled: !reservationLoading && !roomLoading && !reservationError && !roomError,
    });

    // 컴포넌트가 마운트되거나 예약 데이터가 변경될 때 초기 선택 시간 설정
    useEffect(() => {
        if (reservationData?.data.startTime && reservationData?.data.endTime && roomData?.data.reservationUnitTime) {
            const startMinutes = timeToMinutes(reservationData.data.startTime);
            const endMinutes = timeToMinutes(reservationData.data.endTime);
            const unitTime = roomData.data.reservationUnitTime;

            if (startMinutes >= endMinutes || unitTime <= 0) return;

            const times: number[] = [];
            for (let time = startMinutes; time < endMinutes; time += unitTime) {
                times.push(time);
            }

            setSelectedTimes(times);
        }
    }, [reservationData?.data.startTime, reservationData?.data.endTime, roomData?.data.reservationUnitTime, setSelectedTimes]);
    const { mutate, isPending } = useReservationUpdate(Number(id), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservation", id] });
            navigate(-1);
        },
    });
    const handleReservation = () => {
        if (selectedTimes.length === 0) {
            toast.error("수정할 시간을 선택해주세요.");
            return;
        }
        const startTime = minutesToTimeString(Math.min(...selectedTimes));
        const endTime = minutesToTimeString(Math.max(...selectedTimes) + (roomData?.data.reservationUnitTime ?? 0));
        const reservationData = {
            startTime: startTime,
            endTime: endTime,
        };
        mutate(reservationData);
    };
    if (roomLoading || reservationLoading) return <div>Loading...</div>;
    if (roomError || reservationError) return <div>Error</div>;

    const filteredReservationTimes = roomData?.data.reservationTimes?.filter((time) => time.reservationId !== Number(id)) ?? [];

    const reservationTimeList = getReservationTimeList(
        roomData?.data.startTime ?? "",
        roomData?.data.endTime ?? "",
        roomData?.data.reservationUnitTime ?? 0,
        filteredReservationTimes,
        reservationData?.data.reservationDate ?? "",
    );
    if (reservationTimeList.length === 0) {
        return null;
    }
    const reservationCompleteTimeList = reservationTimeList.filter((reservationTime) => reservationTime.status === "COMPLETE");
    if (reservationCompleteTimeList.length === reservationTimeList.length) {
        return null;
    }
    return (
        <div className="mt-20 flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="text-xl font-bold">
                    {reservationData?.data.reservationDate + " (" + dateToDayOfWeek(reservationData?.data.reservationDate ?? "") + ")"}
                </h1>
                <p className="text-text-gray font-[500]">
                    {getTimeToString(reservationData?.data.startTime ?? "")} ~ {getTimeToString(reservationData?.data.endTime ?? "")}
                </p>
            </div>
            <div>
                <div className="px-4">
                    <div className="flex flex-col gap-4">
                        <RoomTitle
                            roomId={roomData?.data.roomId ?? 0}
                            roomName={roomData?.data.roomName ?? ""}
                            maxCapacity={roomData?.data.maxCapacity ?? 0}
                        />
                        <div className="flex flex-col gap-4">
                            <ColorInfoSection />
                            <div className="grid grid-cols-3 gap-2.5">
                                {reservationTimeList.map((reservationTime) => (
                                    <ReservationTimeButton
                                        key={reservationTime.time}
                                        time={reservationTime.time}
                                        status={reservationTime.status}
                                        reservationUnitTime={roomData?.data.reservationUnitTime ?? 0}
                                        isSelected={selectedTimes.includes(reservationTime.time)}
                                        onClick={() => handleTimeSelect(reservationTime.time)}
                                        reservationId={reservationTime.reservationId}
                                    />
                                ))}
                            </div>
                        </div>
                        <MyButton title="수정" isPending={isPending} onClick={handleReservation} type="button" />
                    </div>
                </div>
                <RoomDetail roomId={reservationData?.data.roomId ?? 0} isShowImage={false} />
            </div>
        </div>
    );
};

export default MyReservationUpdate;
