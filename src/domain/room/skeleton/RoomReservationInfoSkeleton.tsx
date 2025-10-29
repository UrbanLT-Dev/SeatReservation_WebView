import MySkeleton from "@/components/ui/MySkeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RoomReservationInfoSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 px-4">
            <SkeletonTheme baseColor="var(--color-background-gray)" highlightColor="#F7F7F7">
                {/* 룸 타이틀 영역 */}
                <div className="border-border-gray border-b pb-4">
                    <MySkeleton height={24} />
                </div>

                {/* 컬러 인포 섹션 */}
                <MySkeleton height={24} />

                {/* 시간 버튼 그리드 */}
                <div className="grid grid-cols-3 gap-2.5">
                    {[...Array(9)].map((_, index) => (
                        <MySkeleton key={index} height={40} />
                    ))}
                </div>

                {/* 예약 버튼 */}
                <div className="mt-4">
                    <MySkeleton height={48} />
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default RoomReservationInfoSkeleton;
