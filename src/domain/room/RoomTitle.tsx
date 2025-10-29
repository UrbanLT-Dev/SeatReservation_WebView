import ExclamationMark from "@/svg/ExclamationMark";
import { useNavigate } from "react-router-dom";
const RoomTitle = ({
    roomId,
    roomName,
    maxCapacity,
    isMaxCapacity = true,
}: {
    roomId: number;
    roomName: string;
    maxCapacity?: number;
    isMaxCapacity?: boolean;
}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/room/${roomId}`)}>
            <div className="border-border-gray flex flex-row items-center justify-between border-b pb-4">
                <div className="flex flex-row gap-1">
                    <h1 className="text-xl font-bold">{roomName}</h1>
                    <ExclamationMark exclamationColor="white" backgroundColor="var(--color-main-color)" width={13} height={13} />
                </div>
                {isMaxCapacity && <h2 className="text-text-gray">수용인원 {maxCapacity}명</h2>}
            </div>
        </div>
    );
};

export default RoomTitle;
