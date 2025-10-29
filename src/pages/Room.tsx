import BackHeader from "@/components/ui/BackHeader";
import RoomDetail from "@/domain/room/RoomDetail";
import { useParams } from "react-router-dom";

const Room = () => {
    const { id } = useParams();
    return (
        <>
            <BackHeader title="회의실 정보" />
            <RoomDetail roomId={Number(id)} />
        </>
    );
};

export default Room;
