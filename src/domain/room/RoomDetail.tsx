import { roomApi } from "@/lib/api/roomApi";
import { getTimeToString } from "@/lib/function/time";
import { useQuery } from "@tanstack/react-query";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

interface RoomDetailProps {
    roomId: number;
    isShowImage?: boolean;
}
const RoomDetail = ({ roomId, isShowImage = true }: RoomDetailProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["roomDetail", roomId],
        queryFn: () => roomApi.roomDetail(roomId),
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }
    return (
        <div className="mt-16 flex flex-col gap-5">
            {isShowImage && <ImageWithSkeleton src={data?.data.imageUrl ?? ""} alt="reservation" />}
            <div className="flex flex-col gap-4 px-4">
                {isShowImage && <h1 className="border-border-gray border-b pb-4 text-xl font-bold">{data?.data.roomName}</h1>}
                <article className="flex flex-col gap-4 pt-4">
                    <article className="flex flex-row justify-between gap-4">
                        <p className="text-text-gray">예약 가능 시간</p>
                        <div className="flex flex-col gap-4">
                            {data?.data.roomAvailableDetails.map((detail) => (
                                <div key={detail.dayOfWeek} className="flex flex-row gap-2 font-[500]">
                                    <p>{detail.dayOfWeek}요일</p>
                                    <p>
                                        {getTimeToString(detail.startTime)} ~ {getTimeToString(detail.endTime)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>
                    <ReservationDetailItem label="수용 인원" value={data?.data.maxCapacity ?? ""} />
                    <ReservationDetailItem label="최대 사용 시간" value={data?.data.maxUsageTime + "분"} />
                    <ReservationDetailItem label="최대 리드 타임" value={data?.data.maxReservationLeadDays + "일"} />
                    <ReservationDetailItem label="최대 키 사용 횟수" value={data?.data.maxQrScans ?? ""} />
                </article>
            </div>
        </div>
    );
};

const ReservationDetailItem = ({ label, value }: { label: string; value: string | number }) => {
    return (
        <article className="flex flex-row justify-between">
            <p className="text-text-gray">{label}</p>
            <p className="font-[500]">{value}</p>
        </article>
    );
};

export default RoomDetail;
