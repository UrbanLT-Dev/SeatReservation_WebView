import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { convertStatusToKorean, statusToColor } from "@/lib/function/string";
import Arrow from "@/svg/Arrow";
import { HistoryResponseData } from "@/lib/api/reservationApi";
import { getTimeToString } from "@/lib/function/time";
import { useNavigate } from "react-router-dom";

const HistoryItem = ({
    reservationId,
    roomName,
    status,
    reservationDate,
    startTime,
    endTime,
    maxCapacity,
    imageUrl,
}: HistoryResponseData) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-white p-4" onClick={() => navigate(`/qr/${reservationId}`)}>
            <div className="border-border-gray flex flex-row items-center justify-between border-b pb-4">
                <div className="flex flex-row items-center gap-2.5">
                    <Button variant="ghost" className={`${statusToColor(status)} h-6 text-[12px] font-[500] text-white`}>
                        {convertStatusToKorean(status)}
                    </Button>
                    <h1 className="font-bold">{reservationDate}</h1>
                </div>
                <div className="rotate-180">
                    <Arrow />
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg">
                    <ImageWithSkeleton src={imageUrl} alt="회의실 이미지" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1 leading-6">
                    <h1 className="font-bold">{roomName}</h1>
                    <div className="flex flex-row justify-between">
                        <p className="text-text-gray">시간</p>
                        <p>
                            {getTimeToString(startTime)} ~ {getTimeToString(endTime)}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-text-gray">수용 인원</p>
                        <p>{maxCapacity}명</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;
