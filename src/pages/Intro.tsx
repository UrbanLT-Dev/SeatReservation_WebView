import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();
    //
    // const { data, error, isLoading } = useQuery({
    //     queryKey: ["loginCheck"],
    //     queryFn: () => loginApi.loginCheck(),
    //     retry: false,
    // });
    //
    // useEffect(() => {
    //     if (!isLoading) {
    //         if (data?.status === 200) {
    //             navigate("/main");
    //         } else {
    //             removeAccessToken();
    //         }
    //     }
    //
    //     if (error) {
    //         removeAccessToken();
    //     }
    // }, [data, error, isLoading, navigate]);

    useEffect(() => {
        navigate("/login")
    }, []);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-10 px-4" style={{ background: "linear-gradient(180deg, #56BE9B 0%, #28285F 100%)" }}>
            <img className="w-57.7 h-7.7" src="/assets/logo.svg" alt="logo" />
        </div>
    );
};

export default Intro;
