import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/loginApi";
import MedamLogo from "@/svg/MedamLogo";
import { removeAccessToken } from "@/lib/utils/tokenUtils.ts";
import { useEffect } from "react";

const Intro = () => {
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ["loginCheck"],
        queryFn: () => loginApi.loginCheck(),
        retry: false,
    });

    useEffect(() => {
        if (!isLoading) {
            if (data?.status === 200) {
                navigate("/main");
            } else {
                removeAccessToken();
            }
        }

        if (error) {
            removeAccessToken();
        }
    }, [data, error, isLoading, navigate]);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-10 px-4">
            <MedamLogo width={137} height={162} backgroundColor="var(--color-main-color)" logoColor="white" />
            <section className="flex flex-col items-center justify-center gap-2.5">
                <h2 className="text-[20px]">미팅을 담다</h2>
                <h1 className="text-[40px] font-bold">미담</h1>
            </section>
            <Button onClick={() => navigate("/login")} className="bg-main-color h-12 w-full text-white">
                로그인
            </Button>
        </div>
    );
};

export default Intro;
