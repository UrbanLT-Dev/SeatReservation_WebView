import BackHeader from "@/components/ui/BackHeader";
import { useNavigate } from "react-router-dom";
import HistoryContent from "@/domain/history/HistoryContent";

const History = () => {
    return (
        <div>
            <BackHeader title="예약 내역" rightComponent={<RightComponent />} />
            <HistoryContent />
        </div>
    );
};

const RightComponent = () => {
    const navigate = useNavigate();
    return (
        <div className="text-main-color font-bold" onClick={() => navigate("/main")}>
            예약하기
        </div>
    );
};

export default History;
