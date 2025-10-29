import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import NextContent from "@/svg/NextContent";
import { useState } from "react";

interface PushSetting {
    id: string;
    label: string;
    enabled: boolean;
    isChild?: boolean;
}

const PushSettingSection = () => {
    const [pushSettings, setPushSettings] = useState<PushSetting[]>([
        { id: "all", label: "전체 푸쉬 알림", enabled: false, isChild: false },
        { id: "notice", label: "공지 알림", enabled: false, isChild: true },
        { id: "reservation", label: "다가오는 예약 알림", enabled: false, isChild: true },
    ]);

    const handleToggle = (id: string, checked: boolean) => {
        setPushSettings((prev) => {
            const newSettings = [...prev];
            const targetIndex = newSettings.findIndex((setting) => setting.id === id);

            if (id === "all") {
                // 전체 토글 시 모든 항목 변경
                return newSettings.map((setting) => ({
                    ...setting,
                    enabled: checked,
                }));
            } else {
                // 개별 항목 토글
                newSettings[targetIndex].enabled = checked;

                // 모든 하위 항목이 활성화되면 전체도 활성화, 하나라도 비활성화되면 전체도 비활성화
                const allChildrenEnabled = newSettings.filter((setting) => setting.isChild).every((setting) => setting.enabled);

                newSettings[0].enabled = allChildrenEnabled;

                return newSettings;
            }
        });
    };

    return (
        <div className="border-border-gray flex flex-col gap-4 border-b p-4 pb-4">
            {pushSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.id} className="flex items-center gap-2">
                        {setting.isChild && <NextContent />}
                        {setting.label}
                    </Label>
                    <Switch
                        id={setting.id}
                        checked={setting.enabled}
                        onCheckedChange={(checked) => handleToggle(setting.id, checked)}
                        className="data-[state=checked]:bg-main-color h-[26px] w-[53px] [&>span]:h-[20px] [&>span]:w-[20px] [&>span]:data-[state=checked]:translate-x-[29px]"
                    />
                </div>
            ))}
        </div>
    );
};

export default PushSettingSection;
