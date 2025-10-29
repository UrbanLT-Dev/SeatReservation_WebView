import RoomReservationInfo from "@/domain/room/RoomReservationInfo";
import RoomReservationInfoSkeleton from "@/domain/room/skeleton/RoomReservationInfoSkeleton";
import { roomApi, RoomReservationInfoResponseData } from "@/lib/api/roomApi";
import useSearchStore from "@/store/useSearchStore";
import emptyAnimation from "../../../public/assets/emptyBox.json";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { toast } from "sonner";

const RoomSection = () => {
    const { selectedDate, startTime, endTime, showAvailableOnly, isSearch } = useSearchStore();
    // 기본 조회 (시간 선택 없이)
    // const {
    //     data: nonTimeData,
    //     isLoading: nonTimeLoading,
    //     isError: nonTimeError,
    // } = useQuery({
    //     queryKey: ["nonTime", selectedDate],
    //     queryFn: () => roomApi.nonTimeList({ searchDate: selectedDate }),
    // });
    const nonTimeData = {
        data: [
            {
                roomId: 2,
                roomName: "501호 어반회의실",
                maxCapacity: 7,
                maxUsageTime: 60,
                reservationUnitTime: 30,
                startTime: "09:00:00",
                endTime: "18:00:00",
                reservationTimes: null,
            },
        ]
    }

    // 시간 선택 후 조회
    // const searchData = {
    //     startTime,
    //     endTime,
    //     isAvailable: showAvailableOnly,
    //     searchDate: selectedDate,
    // };

    // const {
    //     data: timeData,
    //     isLoading: timeLoading,
    //     isError: timeError,
    // } = useQuery({
    //     queryKey: ["reservation", searchData],
    //     queryFn: () => roomApi.time(searchData),
    //     enabled: isSearch > 0, // isSearch가 0보다 클 때만 API 호출
    // });

    // // 로딩 상태 관리
    // if (timeLoading) {
    //     toast.loading("조회중입니다.", {
    //         id: "search-loading",
    //     });
    // } else if (!timeLoading && isSearch > 0) {
    //     toast.dismiss("search-loading");
    // }
    //
    // if (nonTimeLoading && !isSearch) {
    //     return <RoomReservationInfoSkeleton />;
    // }
    //
    // if (timeError || (nonTimeError && !isSearch)) {
    //     toast.error("조회에 실패했습니다.");
    //     return <div>Error occurred</div>;
    // }
    //
    // // isSearch 값에 따라 적절한 데이터 선택
    // const displayData = isSearch > 0 ? timeData : nonTimeData;
    const displayData = nonTimeData;
    return (
        <div className="flex flex-col gap-6 px-4">
            {Array.isArray(displayData?.data) &&
                displayData?.data.map((roomInfo: RoomReservationInfoResponseData) => (
                    <RoomReservationInfo key={roomInfo.roomId} {...roomInfo} />
                ))}
            {Array.isArray(displayData?.data) && displayData?.data.length === 0 && (
                <div className="mt-2.5 flex flex-col items-center justify-center gap-2.5">
                    <Lottie animationData={emptyAnimation} style={{ height: 200, width: 200 }} loop={true} autoplay={true} />
                    <h1>예약 가능한 시간이 없습니다.</h1>
                </div>
            )}
        </div>
    );
};

export default RoomSection;
