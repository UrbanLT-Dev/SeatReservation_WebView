import MySkeleton from "@/components/ui/MySkeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const HistoryItemSkeleton = () => {
    return (
        <SkeletonTheme>
            <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
                <div className="border-border-gray border-b pb-4">
                    <MySkeleton className="h-4" width={250} />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg">
                        <MySkeleton className="h-20 w-20 rounded-lg" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-1 leading-6">
                        <MySkeleton className="h-4" width={100} />
                        <MySkeleton className="h-4 w-[48%]" />
                        <MySkeleton className="h-4 w-[48%]" />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default HistoryItemSkeleton;
