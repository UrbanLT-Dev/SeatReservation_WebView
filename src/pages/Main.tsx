import Footer from "@/components/ui/Footer";
import NonBackHeader from "@/components/ui/NonBackHeader";
import RoomSection from "@/domain/main/RoomSection";
import SeatSection from "@/domain/main/SeatSection";
import SelectSection from "@/domain/main/SelectSection";
import { useNavigate } from "react-router-dom";
const Main = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NonBackHeader title="좌석 예약" onClick={() => navigate("/history")} />
            <div className="flex flex-col gap-8 pb-25">
                <SelectSection />
                {/*<SeatSection />*/}
                <RoomSection />
                <Footer />
            </div>
        </div>
    );
};

export default Main;
