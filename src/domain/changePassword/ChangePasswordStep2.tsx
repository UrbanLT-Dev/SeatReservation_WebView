import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import Input from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    password: z.string().min(8, {
        message: "비밀번호는 최소 8자 이상이어야 합니다.",
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/, {
        message: "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.",
    }),
    confirmPassword: z.string().min(1, {
        message: "비밀번호 확인을 입력해주세요.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
});

type ChangePasswordFormData = z.infer<typeof formSchema>;

const ChangePasswordStep2 = ({ step1Data }: { step1Data: any }) => {
    console.log(step1Data);
    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: ChangePasswordFormData) => {
        console.log("새 비밀번호:", data.password);
    }

    return (
        <div className="flex flex-col gap-6 px-5">
            <p className="text-lg leading-5.25 font-semibold text-[#333]">새 비밀번호를 입력해주세요.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12">
                    <div className="flex flex-col gap-0">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input label="새 비밀번호" placeholder="8자리 이상 입력" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-0">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input label="새 비밀번호 확인" placeholder="8자리 이상 입력" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="h-13.5 rounded-xl" size="lg">비밀번호 변경</Button>
                </form>
            </Form>
        </div>
    );
};

export default ChangePasswordStep2;
