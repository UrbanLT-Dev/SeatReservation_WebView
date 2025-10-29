import MyButton from "@/components/form/button/MyButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { loginApi, LoginApiError } from "@/lib/api/loginApi";
import { ApiResponse } from "@/lib/types/api";
import useLoginInfoStore from "@/store/useLoginInfoStore";
import ExclamationMark from "@/svg/ExclamationMark";
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
        <div className="mt-16 flex flex-col gap-6 px-4 py-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2.5">
                        <FormField
                            control={form.control}
                            name="loginId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="아이디 입력" {...field} />
                                    </FormControl>
                                    <FormLabel>
                                        <div className="flex items-center gap-2.5">
                                            <ExclamationMark />
                                            <span className="text-text-gray">영문 또는 숫자</span>
                                        </div>
                                    </FormLabel>
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
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="비밀번호 입력" type="password" {...field} />
                                    </FormControl>
                                    <FormLabel className="text-text-gray">
                                        <div className="flex items-center gap-2.5">
                                            <ExclamationMark />
                                            <span className="text-text-gray">영문,숫자,특수문자 2가지 이상 조합 8자 이상</span>
                                        </div>
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2.5">
                        <Checkbox checked={isAutoLogin} onCheckedChange={handleAutoLoginChange}>
                            자동 로그인
                        </Checkbox>
                        <Label className="text-text-gray">자동 로그인</Label>
                    </div>
                    <MyButton title="로그인" isPending={isPending} onClick={() => {}} type="submit" />
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
