import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useUserInfoStore } from "@/store/useUserInfoStore.ts";

const MyInfoSection = () => {
    const memberName = useUserInfoStore((state) => state.memberName);
    const departmentName = useUserInfoStore((state) => state.departmentName);
    const jobTitleName = useUserInfoStore((state) => state.jobTitleName);
    const imageUrl = useUserInfoStore((state) => state.imageUrl);

    return (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-xl">
            <div className="flex flex-row items-center gap-2.5">
                <div className="h-15 w-15 overflow-hidden rounded-full">
                    {
                        !imageUrl ? (
                                <svg width="60" height="60" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="14.5" fill="#CDCDEA" stroke="#F1F1F1"/>
                                    <path d="M20.25 21.5625C20.4489 21.5625 20.6397 21.4835 20.7803 21.3428C20.921 21.2022 21 21.0114 21 20.8125V19.878C21.003 17.7735 18.0195 16.125 15 16.125C11.9805 16.125 9 17.7735 9 19.878V20.8125C9 21.0114 9.07902 21.2022 9.21967 21.3428C9.36032 21.4835 9.55109 21.5625 9.75 21.5625H20.25ZM17.703 11.1405C17.703 11.4955 17.6331 11.847 17.4972 12.1749C17.3614 12.5028 17.1623 12.8008 16.9113 13.0518C16.6603 13.3028 16.3623 13.5019 16.0344 13.6377C15.7064 13.7736 15.355 13.8435 15 13.8435C14.645 13.8435 14.2935 13.7736 13.9656 13.6377C13.6377 13.5019 13.3397 13.3028 13.0887 13.0518C12.8377 12.8008 12.6386 12.5028 12.5028 12.1749C12.3669 11.847 12.297 11.4955 12.297 11.1405C12.297 10.4236 12.5818 9.7361 13.0887 9.22919C13.5956 8.72228 14.2831 8.4375 15 8.4375C15.7169 8.4375 16.4044 8.72228 16.9113 9.22919C17.4182 9.7361 17.703 10.4236 17.703 11.1405Z" fill="#28285F" stroke="#28285F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                            : (
                            <ImageWithSkeleton src={imageUrl ?? ""} alt="회의실 이미지" />
                        )
                    }

                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-[700] text-base">{memberName || "성함"}</h1>
                    <p className="text-text-gray text-sm">
                        {departmentName || "회사"} / {jobTitleName || "직급"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyInfoSection;
