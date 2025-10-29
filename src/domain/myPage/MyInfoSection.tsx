import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { myInfoApi } from "@/lib/api/memberApi";
import { useQuery } from "@tanstack/react-query";

const MyInfoSection = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["myInfo"],
        queryFn: () => myInfoApi.myInfo(),
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;
    return (
        <div className="flex flex-col gap-4 bg-white p-4">
            <div className="flex flex-row items-center gap-2.5">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                    <ImageWithSkeleton src={data?.data.imageUrl ?? ""} alt="회의실 이미지" />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-[500]">{data?.data.memberName}</h1>
                    <p className="text-text-gray">
                        {data?.data.departmentName} / {data?.data.jobTitleName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyInfoSection;
