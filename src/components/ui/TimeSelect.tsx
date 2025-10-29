import useSearchStore from "@/store/useSearchStore";
import { Button } from "./button";
import { DrawerClose } from "./drawer";
import { getDateOfYYYYMMDD } from "@/lib/function/date.ts";

interface TimeSelectProps {
    type: "start" | "end";
}

const TimeSelect = ({ type }: TimeSelectProps) => {
    const { selectedDate, startTime, endTime, setStartTime, setEndTime } = useSearchStore();

    const onClickSelectTime = (time: string) => {
        if (type === "start") {
            if (startTime === time) {
                setStartTime("");
            } else {
                setStartTime(time);
            }
        } else {
            if (endTime === time) {
                setEndTime("");
            } else {
                setEndTime(time);
            }
        }
    };

    // 시간 배열 생성

    const times = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const isToday = selectedDate === getDateOfYYYYMMDD(today);
        const currentTime = now.getHours() * 60 + now.getMinutes(); // 분 단위로 변환

        const allTimes = [
            { label: "오전", times: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"] },
            {
                label: "오후",
                times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"],
            },
        ];

        if (isToday) {
            return allTimes.map(section => ({
                ...section,
                times: section.times.filter(time => {
                    const [hours, minutes] = time.split(':').map(Number);
                    const timeInMinutes = hours * 60 + minutes;
                    return timeInMinutes > currentTime;
                })
            })).filter(section => section.times.length > 0);
        }

        return allTimes;
    };

    return (
        <div>
            <div className="max-h-[80vh] overflow-y-auto pb-6">
                {times().map((section, idx) => (
                    <div key={section.label} className={`${idx === 0 ? "mb-6" : ""} flex flex-col gap-2`}>
                        <div className="mb-2 font-[500]">{section.label}</div>
                        <div className="grid grid-cols-4 gap-3">
                            {section.times.map((time) => (
                                <DrawerClose asChild key={time}>
                                    <Button
                                        className={`h-9 w-full font-[400] ${(type === "start" ? startTime : endTime) === time ? "bg-main-color text-white" : ""}`}
                                        variant={(type === "start" ? startTime : endTime) === time ? "default" : "outline"}
                                        onClick={() => onClickSelectTime(time)}
                                    >
                                        {time}
                                    </Button>
                                </DrawerClose>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeSelect;
