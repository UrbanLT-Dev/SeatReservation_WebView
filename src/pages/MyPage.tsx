import NonBackHeader from "@/components/ui/NonBackHeader";
import MyInfoSection from "@/domain/myPage/MyInfoSection";
import AppInfoSection from "@/domain/myPage/AppInfoSection";
import AppDescription from "@/domain/myPage/AppDescription";
const MyPage = () => {
    return (
        <div className="bg-background-gray h-full">
            <NonBackHeader title="마이페이지" />
            <div className="bg-background-gray flex flex-col gap-4 px-5 pt-5">
                <MyInfoSection />
                <AppInfoSection />
                <AppDescription />
            </div>
            {/*<Footer />*/}
        </div>
    );
};

export default MyPage;
