import { getDateOfYYMMDD, getDateOfYYYYMMDD, getWeekDates } from "@/lib/function/date";
import React, { useState, useEffect } from "react";
import Arrow from "@/svg/Arrow";
import useSearchStore from "@/store/useSearchStore";

interface CalendarProps {
    onDateSelect: (date: string) => void;
}

interface SlideState {
    isSliding: boolean;
    slideDirection: "left" | "right" | null;
    nextWeeks: Date[][];
}

const WEEK_DAYS = ["월", "화", "수", "목", "금", "토", "일"] as const;
const SLIDE_ANIMATION_DURATION = 300;

const DateCell: React.FC<{
    date: Date;
    isSelected: boolean;
    onClick: () => void;
}> = ({ date, isSelected, onClick }) => (
    <div className="relative flex items-center justify-center" onClick={onClick}>
        <div
            className={`relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-full ${
                date.getDay() === 0 ? "text-error-red" : "text-text-gray"
            }`}
        >
            <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ease-in-out ${
                    isSelected ? "bg-main-color scale-100" : "bg-main-color scale-0"
                }`}
                style={{ transformOrigin: "center" }}
            />
            <span className={`relative z-10 ${isSelected ? "text-white" : ""}`}>{date.getDate()}</span>
        </div>
    </div>
);

const WeekRow: React.FC<{
    week: Date[];
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
}> = ({ week, selectedDate, onDateSelect }) => (
    <div className="grid grid-cols-7">
        {week?.map((date, dateIndex) => (
            <DateCell
                key={dateIndex}
                date={date}
                isSelected={getDateOfYYYYMMDD(date) === getDateOfYYYYMMDD(selectedDate)}
                onClick={() => onDateSelect(date)}
            />
        ))}
    </div>
);

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
    const { selectedDate, setSelectedDate } = useSearchStore();
    const today = new Date();
    const [baseDate, setBaseDate] = useState(today);
    const [weeks, setWeeks] = useState<Date[][]>([]);
    const [slideState, setSlideState] = useState<SlideState>({
        isSliding: false,
        slideDirection: null,
        nextWeeks: [],
    });

    const generateWeek = (date: Date) => getWeekDates(date);

    const updateWeeks = (date: Date) => {
        const prevWeek = generateWeek(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000));
        const thisWeek = generateWeek(date);
        const nextWeek = generateWeek(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
        return [prevWeek, thisWeek, nextWeek];
    };

    useEffect(() => {
        setWeeks(updateWeeks(baseDate));
    }, [baseDate]);

    const handleAnimationEnd = () => {
        setSlideState((prev) => ({
            ...prev,
            isSliding: false,
            slideDirection: null,
        }));
    };

    const handleSlide = (direction: "left" | "right") => {
        if (slideState.isSliding) return;

        const offset = direction === "left" ? 7 : -7;
        const newDate = new Date(baseDate.getTime() + offset * 24 * 60 * 60 * 1000);

        setSlideState({
            isSliding: true,
            slideDirection: direction,
            nextWeeks: updateWeeks(newDate),
        });

        setTimeout(() => {
            setBaseDate(newDate);
        }, SLIDE_ANIMATION_DURATION);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(getDateOfYYYYMMDD(date));
        onDateSelect(getDateOfYYYYMMDD(date));
    };

    const handleMoveToToday = () => {
        if (slideState.isSliding) return;

        const newDate = new Date();
        const direction = newDate.getTime() > baseDate.getTime() ? "left" : "right";

        setSlideState({
            isSliding: true,
            slideDirection: direction,
            nextWeeks: updateWeeks(newDate),
        });

        setTimeout(() => {
            setBaseDate(newDate);
            setSelectedDate(getDateOfYYYYMMDD(newDate));
            onDateSelect(getDateOfYYYYMMDD(newDate));
        }, SLIDE_ANIMATION_DURATION);
    };

    const getSlideAnimation = (isSliding: boolean, direction: "left" | "right" | null, type: "current" | "next") => {
        if (!isSliding) return "";
        const baseAnimation = type === "current" ? "out" : "in";
        return direction ? `slide-${direction}-${baseAnimation} ${SLIDE_ANIMATION_DURATION}ms ease-in-out` : "";
    };

    return (
        <div className="z-7 flex w-full flex-col gap-6 py-4">
            {/* 상단 날짜 영역 */}
            <div className="flex items-center justify-between px-3">
                <button onClick={() => handleSlide("right")} className="p-2 text-gray-600">
                    <Arrow color="#868686" width={8} height={16} />
                </button>
                <div onClick={handleMoveToToday} className="hover:text-main-color cursor-pointer text-[20px] font-bold transition-colors">
                    {weeks[1] && `${getDateOfYYMMDD(weeks[1][0])} ~ ${getDateOfYYMMDD(weeks[1][6])}`}
                </div>
                <button onClick={() => handleSlide("left")} className="rotate-180 p-2 text-gray-600">
                    <Arrow color="#868686" width={8} height={16} />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {/* 요일 */}
                <div className="mb-2 grid grid-cols-7">
                    {WEEK_DAYS.map((day, index) => (
                        <div key={day} className={`text-center font-[400] ${index === 6 ? "text-error-red" : "text-text-gray"}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* 날짜 슬라이드 */}
                <div className="relative overflow-hidden">
                    <div
                        className="w-full"
                        style={{
                            animation: getSlideAnimation(slideState.isSliding, slideState.slideDirection, "current"),
                        }}
                    >
                        <WeekRow week={weeks[1]} selectedDate={new Date(selectedDate)} onDateSelect={handleDateSelect} />
                    </div>
                    {slideState.isSliding && (
                        <div
                            className="absolute top-0 left-0 w-full"
                            style={{
                                animation: getSlideAnimation(slideState.isSliding, slideState.slideDirection, "next"),
                            }}
                            onAnimationEnd={handleAnimationEnd}
                        >
                            <WeekRow week={slideState.nextWeeks[1]} selectedDate={new Date(selectedDate)} onDateSelect={handleDateSelect} />
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
                @keyframes slide-left-out {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                @keyframes slide-left-in {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes slide-right-out {
                    from { transform: translateX(0); }
                    to { transform: translateX(100%); }
                }
                @keyframes slide-right-in {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                `}
            </style>
        </div>
    );
};

export default Calendar;
