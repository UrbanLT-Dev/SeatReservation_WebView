import { useQuery } from "@tanstack/react-query";
import { myInfoApi } from "@/lib/api/memberApi.ts";
import { useUserInfoStore } from "@/store/useUserInfoStore.ts";
import { useLocation, useNavigate } from "react-router-dom";
const NonBackHeader = ({ title }: { title: string }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["myInfo"],
        queryFn: () => myInfoApi.myInfo(),
    });

    if (data && data.data) {
        setUserInfo({
            memberName: data.data.memberName,
            departmentName: data.data.departmentName,
            jobTitleName: data.data.jobTitleName,
            imageUrl: data.data.imageUrl,
        });
    }


    return (
        <div className="flex h-16 w-full items-center justify-between border-b-1 border-b-gray-200 bg-white px-4">
            <div className="flex items-center justify-center gap-2.5">
                <img className="h-[20.329px] w-[138px]" src="/assets/logo.png" alt={title} />
                <p className="mt-1.5 text-xs font-bold text-[#188D6D]">{title}</p>
            </div>
            {(() => {
                if(pathname === "/login" || pathname === "/change-password") {
                    return null;
                }

                if (pathname === "/my-page") {
                    return (
                        <button type="button" onClick={() => navigate("/main")} className="text-base font-bold text-[#28285F]">
                            예약 하기
                        </button>
                    );
                }

                if (!isLoading && !isError && data?.data?.imageUrl) {
                    return <img src={data.data.imageUrl} alt="Profile" onClick={() => navigate("/my-page")} className="h-7.5 w-7.5 rounded-full object-cover cursor-pointer" />;
                }

                return (
                    <div className="h-7.5 w-7.5 cursor-pointer" onClick={() => navigate("/my-page")} aria-hidden>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="14.5" fill="#CDCDEA" stroke="#F1F1F1" />
                            <path
                                d="M20.25 21.5625C20.4489 21.5625 20.6397 21.4835 20.7803 21.3428C20.921 21.2022 21 21.0114 21 20.8125V19.878C21.003 17.7735 18.0195 16.125 15 16.125C11.9805 16.125 9 17.7735 9 19.878V20.8125C9 21.0114 9.07902 21.2022 9.21967 21.3428C9.36032 21.4835 9.55109 21.5625 9.75 21.5625H20.25ZM17.703 11.1405C17.703 11.4955 17.6331 11.847 17.4972 12.1749C17.3614 12.5028 17.1623 12.8008 16.9113 13.0518C16.6603 13.3028 16.3623 13.5019 16.0344 13.6377C15.7064 13.7736 15.355 13.8435 15 13.8435C14.645 13.8435 14.2935 13.7736 13.9656 13.6377C13.6377 13.5019 13.3397 13.3028 13.0887 13.0518C12.8377 12.8008 12.6386 12.5028 12.5028 12.1749C12.3669 11.847 12.297 11.4955 12.297 11.1405C12.297 10.4236 12.5818 9.7361 13.0887 9.22919C13.5956 8.72228 14.2831 8.4375 15 8.4375C15.7169 8.4375 16.4044 8.72228 16.9113 9.22919C17.4182 9.7361 17.703 10.4236 17.703 11.1405Z"
                                fill="#28285F"
                                stroke="#28285F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                );
            })()}
        </div>
    );
};

export default NonBackHeader;
