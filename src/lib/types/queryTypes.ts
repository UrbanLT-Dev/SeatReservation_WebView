import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse, ApiResponse } from "./api";

// 공통 에러 타입
export type CustomApiError = AxiosError<ApiErrorResponse>;

// Mutation 타입 헬퍼
export type MutationOptions<TData, TVariables> = Omit<UseMutationOptions<ApiResponse<TData>, CustomApiError, TVariables>, "mutationFn">;

// Query 타입 헬퍼
export type QueryOptions<TData> = Omit<UseQueryOptions<ApiResponse<TData>, CustomApiError>, "queryKey" | "queryFn">;

// 기본 에러 핸들링 함수
export const defaultErrorHandler = (error: CustomApiError) => {
    // console.error("API Error:", error.response?.data.data.value);
    return error.response?.data.data.value ?? "오류가 발생했습니다.";
};
