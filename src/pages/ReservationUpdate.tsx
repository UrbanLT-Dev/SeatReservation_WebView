import BackHeader from "@/components/ui/BackHeader";
import MyReservationUpdate from "@/domain/reservation/MyReservationUpdate";

const ReservationUpdate = () => {
    return (
        <div>
            <BackHeader title="예약 수정" />
            <MyReservationUpdate />
        </div>
    );
};

export default ReservationUpdate;
