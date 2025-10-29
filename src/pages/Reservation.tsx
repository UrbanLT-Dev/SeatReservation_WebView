import ReservationDetail from "@/domain/reservation/ReservationDetail";
import BackHeader from "@/components/ui/BackHeader";
import { useParams } from "react-router-dom";

const Reservation = () => {
    const { id } = useParams();
    return (
        <>
            <BackHeader title="예약 정보" />
            <ReservationDetail reservationId={Number(id)} />
        </>
    );
};

export default Reservation;
