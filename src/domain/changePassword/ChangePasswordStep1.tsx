import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button.tsx";
import React, { useState } from "react";

const formSchema = z.object({
    loginName: z.string().min(1, {
        message: "이름을 입력해주세요.",
    }),
    loginId: z.string().min(1, {
        message: "아이디를 입력해주세요.",
    }),
    phoneNumber: z.string()
        .min(1, { message: "휴대폰 번호를 입력해주세요." })
        .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, {
            message: "올바른 전화번호를 입력해주세요.",
        })
});

type ChangePasswordFormData = z.infer<typeof formSchema>;

const ChangePasswordStep1 = ({ onNext }: { onNext: any }) => {
    const [isVerify, setIsVerify] = useState(false);

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loginName: "",
            loginId: "",
            phoneNumber: "",
        },
    });

    const onSubmit = (data: ChangePasswordFormData) => {
        // mutate({ data, isAutoLogin });
        console.log(data);
        setIsVerify(true);
    };

    const onChangeVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: 인증번호 검증 로직 추가
        if (e.target.value.length === 6) {
            const formData = form.getValues();
            onNext(2, formData);
        }
    };

    return (
        <div className="flex flex-col gap-6 px-5">
            <p className="text-lg leading-5.25 font-semibold text-[#333]">
                비밀번호 변경을 위해 <br />
                휴대폰 인증이 필요합니다
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12">
                    <div className="flex flex-col gap-0">
                        <FormField
                            control={form.control}
                            name="loginName"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input label="이름" placeholder="이름 입력" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                    <div className="flex items-end gap-2.5">
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="relative flex-1">
                                    <FormControl>
                                        <Input label="휴대폰 번호" placeholder="휴대폰 번호 입력" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="outline" size="lg">
                            인증
                        </Button>
                    </div>
                    <div className="flex items-center gap-0">
                        <Input onChange={onChangeVerify} disabled={!isVerify} label="인증번호" placeholder="인증번호 입력" />
                        <span className="text-error-red flex h-[64px] items-center border-b border-gray-300 pt-[20px] text-sm">02:59</span>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ChangePasswordStep1;
