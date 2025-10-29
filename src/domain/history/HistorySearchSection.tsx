import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import FilterDrawer from "@/components/ui/FilterDrawer";
import { categoryOptions, periodOptions } from "@/lib/function/category";
import useHistorySearchStore from "./store/useSearch";
import Arrow from "@/svg/Arrow";
import Check from "@/svg/Check";

const HistorySearchSection = () => {
    const { status, period, setStatus, setPeriod } = useHistorySearchStore();
    return (
        <div className="flex w-full flex-row justify-between p-4 pt-20">
            <FilterDrawer
                titleText="카테고리 선택"
                title={
                    <Button type="button" variant="outline" className="h-12 w-[48%] px-4 text-[16px]">
                        <div className="flex w-full items-center justify-between">
                            {status ? (
                                <span>{categoryOptions().find((option) => option.value === status)?.label}</span>
                            ) : (
                                <span className="text-text-gray">카테고리 선택</span>
                            )}
                            <div className="rotate-270">
                                <Arrow color="var(--color-text-gray)" width={17} height={16} />
                            </div>
                        </div>
                    </Button>
                }
            >
                <div className="flex flex-col gap-[32px]">
                    <h1 className="pb-4 text-[16px] font-[500]">카테고리 선택</h1>
                    {categoryOptions().map((option) => (
                        <DrawerClose asChild key={option.value}>
                            <div
                                className={`flex flex-row items-center justify-between ${option.value === status ? "text-main-color font-bold" : "font-[400]"}`}
                                onClick={() => setStatus(option.value)}
                            >
                                <h1>{option.label}</h1>
                                {option.value === status && <Check color="var(--color-main-color)" width={16} height={16} />}
                            </div>
                        </DrawerClose>
                    ))}
                </div>
            </FilterDrawer>
            <FilterDrawer
                titleText="기간 선택"
                title={
                    <Button type="button" variant="outline" className="h-12 w-[48%] px-4 text-[16px]">
                        <div className="flex w-full items-center justify-between">
                            {period ? (
                                <span>{periodOptions().find((option) => option.value === period)?.label}</span>
                            ) : (
                                <span className="text-text-gray">기간 선택</span>
                            )}
                            <div className="rotate-270">
                                <Arrow color="var(--color-text-gray)" width={17} height={16} />
                            </div>
                        </div>
                    </Button>
                }
            >
                <div className="flex flex-col gap-[32px]">
                    <h1 className="pb-4 text-[16px] font-[500]">카테고리 선택</h1>
                    {periodOptions().map((option) => (
                        <DrawerClose asChild key={option.value}>
                            <div
                                className={`flex flex-row items-center justify-between ${option.value === period ? "text-main-color font-bold" : "font-[400]"}`}
                                onClick={() => setPeriod(option.value)}
                            >
                                <h1>{option.label}</h1>
                                {option.value === period && <Check color="var(--color-main-color)" width={16} height={16} />}
                            </div>
                        </DrawerClose>
                    ))}
                </div>
            </FilterDrawer>
        </div>
    );
};

export default HistorySearchSection;
