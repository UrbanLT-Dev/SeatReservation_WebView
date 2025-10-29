import { getTimeToString } from "@/lib/function/time";
import { Button } from "../../components/ui/button";
import { getDateOfYYYYMMDDHHMMSS } from "@/lib/function/date";
import { convertStatusToKorean, statusToColor } from "@/lib/function/string";
import { ReservationDetailResponseData } from "@/lib/api/reservationApi";

interface ReservationInfoProps extends ReservationDetailResponseData {
    isRoomName?: boolean;
}

const ReservationInfo = ({
    roomName,
    status,
    reservationDate,
    startTime,
    endTime,
    maxCapacity,
    memberName,
    createdDateTime,
    maxQrScans,
    isRoomName = true,
}: ReservationInfoProps) => {
    return (
        <div className="flex flex-col gap-4 px-4">
            <h1 className="border-border-gray border-b pb-4 text-xl font-bold">{isRoomName && roomName}</h1>
            <article className="flex flex-col gap-4 pt-4">
                <article className="flex flex-row justify-between gap-4">
                    <p className="text-text-gray">예약 상태</p>
                    <Button variant="ghost" className={`${statusToColor(status)} h-6 text-[12px] font-[500] text-white`}>
                        {convertStatusToKorean(status)}
                    </Button>
                </article>
                <ReservationDetailItem label="날짜" value={reservationDate ?? ""} />
                <ReservationDetailItem label="시간" value={getTimeToString(startTime) + " ~ " + getTimeToString(endTime)} />
                <ReservationDetailItem label="수용 인원" value={maxCapacity} />
                <ReservationDetailItem label="예약자" value={memberName} />
                <ReservationDetailItem label="등록시간" value={getDateOfYYYYMMDDHHMMSS(new Date(createdDateTime ?? ""))} />
                <ReservationDetailItem label="최대 키 사용 횟수" value={maxQrScans} />
            </article>
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

export default ReservationInfo;
