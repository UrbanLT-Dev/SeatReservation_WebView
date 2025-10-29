import Calendar from "@/components/Calendar/Calendar";
import ColorButton from "@/components/form/button/ColorButton";
import FilterDrawer from "@/components/ui/FilterDrawer";
import TimeSelect from "@/components/ui/TimeSelect";
import { Button } from "@/components/ui/button";
import useSearchStore from "@/store/useSearchStore";
import Clack from "@/svg/Clock";
import ExclamationMark from "@/svg/ExclamationMark";
import ResetIcon from "@/svg/ResetIcon";
import { toast } from "sonner";

const SelectSection = () => {
    const { startTime, endTime, showAvailableOnly, isSearch, setSelectedDate, setShowAvailableOnly, setIsSearch, setStartTime, setEndTime } = useSearchStore();
    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };
    const handleSearch = () => {
        if (!startTime) {
            toast.error("시작 시간을 선택해주세요.");
            return;
        }
        if (!endTime) {
            toast.error("종료 시간을 선택해주세요.");
            return;
        }
        if (startTime >= endTime) {
            toast.error("종료시간이 시작시간보다 커야합니다");
            return;
        }
        setIsSearch(isSearch + 1);
    };
    const handleReset = () => {
        setSelectedDate(new Date().toISOString().split("T")[0]);
        setStartTime("");
        setEndTime("");
        setShowAvailableOnly(false);
        setIsSearch(0);
    };
    return (
        <div className="mt-22 flex flex-col gap-4 px-4">
            <Calendar onDateSelect={handleDateSelect} />
            <div className="mb-7.5 flex flex-col gap-2.5">
                <div className="flex w-full flex-row justify-between gap-2.5">
                    <FilterDrawer
                        title={
                            <Button type="button" variant="outline" className="h-12 px-4 text-[16px] flex-1">
                                <div className="flex w-full items-center justify-between">
                                    {startTime ? <span>{startTime}</span> : <span className="text-text-gray">시작 시간</span>}
                                    <Clack color="var(--color-text-gray)" width={17} height={16} />
                                </div>
                            </Button>
                        }
                    >
                        <TimeSelect type={"start"} />
                    </FilterDrawer>
                    <FilterDrawer
                        title={
                            <Button type="button" variant="outline" className="h-12  px-4 text-[16px] flex-1">
                                <div className="flex w-full items-center justify-between">
                                    {endTime ? <span>{endTime}</span> : <span className="text-text-gray">종료 시간</span>}
                                    <Clack color="var(--color-text-gray)" width={17} height={16} />
                                </div>
                            </Button>
                        }
                    >
                        <TimeSelect type={"end"} />
                    </FilterDrawer>
                </div>
                <div className="flex w-full flex-row gap-2.5">
                <Button
                        type="button"
                        variant="outline"
                        className="h-12 flex-1  bg-white text-text-gray"
                        onClick={handleReset}
                    >
                        <ResetIcon color="var(--color-text-gray)" />
                        초기화
                    </Button>
                    <Button
                    type="button"
                    className="bg-main-color h-12 text-white flex-1"
                    onClick={handleSearch}
                >
                    조회
                </Button>
                </div>
            </div>
            {isSearch === 0 && <ColorButton
                isSelected={showAvailableOnly}
                handleOptionClick={() => {
                    setShowAvailableOnly(!showAvailableOnly);
                }}
                option={{ value: "1", label: "예약 가능한 시간만 보기" }}
            />}
            
            <div className="mt-2.5 flex items-center gap-2.5">
                <ExclamationMark backgroundColor="var(--color-warning-orange)" exclamationColor="white" />
                <span className="text-text-gray text-sm">예약불가 선택 시 예약상세 내용을 볼 수 있습니다.</span>
            </div>
        </div>
    );
};

export default SelectSection;
