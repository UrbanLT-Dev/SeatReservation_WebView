// import PushSettingSection from "./PushSettingSection";
import AppVersionSection from "./AppVersionSection";
import LogOutSection from "./LogOutSection";
const AppInfoSection = () => {
    return (
        <div className="flex flex-col gap-4 bg-white">
            {/*<PushSettingSection />*/}
            <AppVersionSection />
            <LogOutSection />
        </div>
    );
};

export default AppInfoSection;
