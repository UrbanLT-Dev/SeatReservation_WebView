import { useState } from "react";
import { toast } from "sonner";

interface UseTimeSelectProps {
    reservationUnitTime?: number;
    maxUsageTime?: number;
    enabled?: boolean;
    initialStartTime?: string;
    initialEndTime?: string;
}

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

export const useTimeSelect = ({
    reservationUnitTime = 0,
    maxUsageTime = 0,
    enabled = false,
    initialStartTime,
    initialEndTime,
}: UseTimeSelectProps) => {
    const [selectedTimes, setSelectedTimes] = useState<number[]>(() => {
        if (!initialStartTime || !initialEndTime || !enabled) return [];

        const startMinutes = timeToMinutes(initialStartTime);
        const endMinutes = timeToMinutes(initialEndTime);
        const times: number[] = [];

        for (let time = startMinutes; time < endMinutes; time += reservationUnitTime) {
            times.push(time);
        }

        return times;
    });

    const handleTimeSelect = (time: number) => {
        if (!enabled) return;

        if (selectedTimes.includes(time)) {
            // 이미 선택된 시간을 클릭한 경우, 해당 시간 이후의 선택을 모두 해제
            setSelectedTimes(selectedTimes.filter((t) => t !== time));
            return;
        }
        // 선택된 시간이 없는 경우, 새로운 시간 선택
        if (selectedTimes.length === 0) {
            setSelectedTimes([time]);
            return;
        }

        // 연속된 시간만 선택 가능
        const lastSelected = Math.max(...selectedTimes);
        if (time !== lastSelected + reservationUnitTime) {
            toast.warning("연속된 시간만 선택할 수 있습니다.");
            setSelectedTimes([time]);
            return;
        }

        if ((selectedTimes.length + 1) * reservationUnitTime > maxUsageTime) {
            toast.error(`최대 ${maxUsageTime}분까지만 예약할 수 있습니다.`);
            return;
        }

        setSelectedTimes([...selectedTimes, time]);
    };

    return {
        selectedTimes,
        handleTimeSelect,
        setSelectedTimes,
    };
};
