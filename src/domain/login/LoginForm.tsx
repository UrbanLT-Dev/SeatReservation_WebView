import MyButton from "@/components/form/button/MyButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { loginApi, LoginApiError } from "@/lib/api/loginApi";
import { ApiResponse } from "@/lib/types/api";
import useLoginInfoStore from "@/store/useLoginInfoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
    loginId: z.string().min(1, {
        message: "아이디를 입력해주세요.",
    }),
    password: z.string().min(1, {
        message: "비밀번호를 입력해주세요.",
    }),
});

type LoginFormData = z.infer<typeof formSchema>;

const LoginForm = () => {
    const { setCenterId } = useLoginInfoStore();
    const navigate = useNavigate();
    const { isAutoLogin, setAutoLogin, login, getAccessToken } = useAuth();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loginId: "",
            password: "",
        },
    });

    // 자동 로그인 처리
    useEffect(() => {
        const autoLogin = localStorage.getItem("autoLogin");
        const accessToken = getAccessToken();
        if (autoLogin === "true" && accessToken) {
            // 이미 accessToken이 있으면 바로 메인으로 이동
            navigate("/main");
        }
    }, [navigate, getAccessToken]);

    const { mutate, isPending } = useMutation({
        mutationFn: (params: { data: LoginFormData; isAutoLogin: boolean }) => loginApi.login(params.data),
        onSuccess: (response: ApiResponse<{ accessToken: string }>, variables) => {
            // 로그인 성공 시 처리
            login(response.data.toString(), variables.isAutoLogin);
            toast.success("로그인에 성공했습니다.");
            loginApi.loginInfo().then((response) => {
                sessionStorage.setItem("centerId", response.data.centerId.toString());
                setCenterId(response.data.centerId);
            });
            navigate("/main"); // 로그인 후 메인 페이지로 이동
        },
        onError: (error: LoginApiError) => {
            if (error.response?.status === 500 || error.response?.status === 400) {
                toast.error(error.response?.data.data.value || "로그인에 실패했습니다.");
            } else {
                toast.error("로그인에 실패했습니다.");
            }
        },
    });

    const handleAutoLoginChange = (checked: boolean) => {
        setAutoLogin(checked);
    };

    const onSubmit = (data: LoginFormData) => {
        mutate({ data, isAutoLogin });
    };

    return (
        <div className="mt-10 flex flex-col gap-6 px-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12.5">
                    <div className="flex flex-col gap-0">
                        <FormField
                            control={form.control}
                            name="loginId"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input label="아이디" placeholder="아이디 입력" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input label="비밀번호" placeholder="비밀번호 입력" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-row items-center gap-2.5">
                            <Checkbox checked={isAutoLogin} onCheckedChange={handleAutoLoginChange}>
                                자동 로그인
                            </Checkbox>
                            <Label className="text-text-gray text-sm">자동 로그인</Label>
                        </div>
                        <MyButton title="로그인" isPending={isPending} onClick={() => {}} type="submit" />
                    </div>
                </form>
            </Form>
            <div className="flex items-center justify-center gap-5">
                <span className="text-[#666] text-sm font-normal">비밀번호가 기억나지 않나요?</span>
                <i className="border-r border-[#D1D5DB] block h-2.5" />
                <button
                    className="text-sm font-medium text-[#28285F] underline underline-offset-2"
                    onClick={() => {
                        navigate("/change-password");
                    }}
                >
                    비밀번호 변경
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
