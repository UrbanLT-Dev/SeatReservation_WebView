import NonBackHeader from "@/components/ui/NonBackHeader";
import MyInfoSection from "@/domain/myPage/MyInfoSection";
import AppInfoSection from "@/domain/myPage/AppInfoSection";
import AppDescription from "@/domain/myPage/AppDescription";
import Footer from "@/components/ui/Footer";
const MyPage = () => {
    return (
        <div className="h-full bg-background-gray">
            <div className="pt-16">
                <NonBackHeader title="내 정보" />
                <div className="bg-background-gray flex flex-col gap-4 pb-20">
                    <MyInfoSection />
                    <AppInfoSection />
                    <AppDescription />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MyPage;
