import Qr from "@/components/ui/Qr";
import ReservationInfo from "@/domain/reservation/ReservationInfo";
import { ReservationDetailResponseData } from "@/lib/api/reservationApi";
import KeyIcon from "@/svg/KeyIcon";
import { useParams } from "react-router-dom";

const MyReservationDetail = ({ data }: { data: ReservationDetailResponseData }) => {
    const { id } = useParams();
    const currentDate = new Date(`${data.reservationDate} ${data.endTime}`);
    const isAvailable = currentDate > new Date() && data.status === "COMPLETE";
    return (
        <div>
            <div className="mt-20 flex flex-col items-center justify-center gap-4">
                <h1 className="text-xl font-bold">{data?.roomName}</h1>
                <div className="flex flex-col">
                    <Qr value={id ?? ""} isAvailable={isAvailable} />
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <KeyIcon />
                    <p className="text-text-gray">{id}</p>
                </div>
            </div>
            {data && <ReservationInfo {...data} isRoomName={false} />}
        </div>
    );
};

export default MyReservationDetail;
