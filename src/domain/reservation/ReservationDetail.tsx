import { reservationApi } from "@/lib/api/reservationApi";
import { useQuery } from "@tanstack/react-query";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import ReservationInfo from "@/domain/reservation/ReservationInfo";

interface ReservationDetailProps {
    reservationId: number;
}

const ReservationDetail = ({ reservationId }: ReservationDetailProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["reservationDetail", reservationId],
        queryFn: () => reservationApi.reservationDetail(reservationId),
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }
    if (!data?.data) {
        return null;
    }
    return (
        <div className="mt-16 flex flex-col gap-5">
            <ImageWithSkeleton src={data.data.imageUrl ?? ""} alt="reservation" />
            <ReservationInfo {...data.data} />
        </div>
    );
};

export default ReservationDetail;
