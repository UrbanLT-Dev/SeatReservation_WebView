import AppVersionSection from "./AppVersionSection";
import LogOutSection from "./LogOutSection";
import PasswordChangeSection from "./PasswordChangeSection.tsx";
const AppInfoSection = () => {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl text-sm">
            <PasswordChangeSection />
            <AppVersionSection />
            <LogOutSection />
        </div>
    );
};

export default AppInfoSection;
