import { getStartTimeColor, getTimeToString } from "@/domain/main/mainFunction";
import useSearchStore from "@/store/useSearchStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface ReservationTimeButtonProps {
    time: number;
    status: string;
    reservationUnitTime: number;
    isSelected?: boolean;
    onClick?: () => void;
    reservationId?: number;
}

const ReservationTimeButton = ({ time, status, reservationUnitTime, isSelected, onClick, reservationId }: ReservationTimeButtonProps) => {
    const { showAvailableOnly } = useSearchStore();
    const navigate = useNavigate();
    if (showAvailableOnly && status === "COMPLETE") {
        return null;
    }
    const handleClick = () => {
        if (reservationId) {
            navigate(`/reservation/${reservationId}`);
        }
    };
    return (
        <div>
            <Button
                type="button"
                className={`${getStartTimeColor(status)} h-12 w-full border-[1px] ${
                    status === "COMPLETE" || status === "USED"
                        ? "bg-background-gray border-border-gray text-text-gray"
                        : isSelected
                          ? "bg-main-color"
                          : "text-text-gray border-border-gray bg-white"
                }`}
                // disabled={status === "COMPLETE"}
                onClick={status === "COMPLETE" || status === "USED" ? handleClick : onClick}
            >
                <div className="flex flex-row items-center gap-1">
                    <p
                        className={`text-[16px] font-bold ${isSelected ? "text-white" : status === "COMPLETE" ? "text-text-gray" : "text-black"}`}
                    >
                        {getTimeToString(time)}
                    </p>
                    <p className={`text-[14px] ${isSelected ? "text-white" : "text-text-gray"}`}>~</p>
                    <p className={`text-[14px] ${isSelected ? "text-white" : "text-text-gray"}`}>
                        {getTimeToString(time + reservationUnitTime)}
                    </p>
                </div>
            </Button>
        </div>
    );
};

export default ReservationTimeButton;
