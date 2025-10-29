import { ApiResponse, ApiErrorResponse } from "../types/api";
import { privateApi } from "./sendApi";
import { AxiosError } from "axios";
import { CustomApiError, MutationOptions } from "../types/queryTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type ReservationApiError = AxiosError<ApiErrorResponse>;

export interface ReservationDetailResponseData {
    reservationId: number;
    status: string;
    roomName: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    memberName: string;
    createdDateTime: string;
    maxQrScans: number;
    imageUrl: string | null;
    roomId: number;
}

export interface HistoryResponseData {
    reservationId: number;
    roomName: string;
    status: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    imageUrl: string;
}
export interface ReservationUpdateRequest {
    startTime: string;
    endTime: string;
}
export const reservationApi = {
    reservationDetail: async (reservaationId: number) => {
        const response = await privateApi.get<ApiResponse<ReservationDetailResponseData>>("/reservation", {
            params: {
                reservationId: reservaationId,
            },
        });
        return response.data;
    },
    reservationHistory: async (pageParam: number | undefined, status: string, period: number) => {
        const response = await privateApi.get<ApiResponse<HistoryResponseData[]>>("/reservation/list", {
            params: {
                lastId: pageParam,
                status: status,
                period: period,
            },
        });
        return response.data;
    },
    getActiveReservation: async () => {
        const response = await privateApi.get<ApiResponse<ReservationDetailResponseData>>("/reservation/active");
        return response.data;
    },
    reservationByIsAvailable: async () => {
        const response = await privateApi.get<ApiResponse<ReservationDetailResponseData[]>>(`/reservation/list`, {
            params: {
                isAvailable: true,
            },
        });
        return response.data;
    },
    reservationUpdate: async (reservationId: number, reservationData: ReservationUpdateRequest) => {
        const response = await privateApi.put<ApiResponse<string>>(`/reservation/${reservationId}`, {
            startTime: reservationData.startTime,
            endTime: reservationData.endTime,
        });
        return response.data;
    },
    reservationCancel: async (reservationId: number) => {
        const response = await privateApi.patch<ApiResponse<string>>(`/reservation/${reservationId}`);
        return response.data;
    },
};

// Query Hooks
export const useReservationDetail = (reservationId: number) => {
    return useQuery<ApiResponse<ReservationDetailResponseData>, CustomApiError>({
        queryKey: ["reservation", reservationId],
        queryFn: () => reservationApi.reservationDetail(reservationId),
    });
};

export const useReservationHistory = (pageParam: number | undefined, status: string, period: number) => {
    return useQuery<ApiResponse<HistoryResponseData[]>, CustomApiError>({
        queryKey: ["reservationHistory", pageParam, status, period],
        queryFn: () => reservationApi.reservationHistory(pageParam, status, period),
    });
};

// Mutation Hooks
export const useReservationUpdate = (reservationId: number, options?: MutationOptions<string, ReservationUpdateRequest>) => {
    return useMutation<ApiResponse<string>, CustomApiError, ReservationUpdateRequest>({
        mutationFn: (data) => reservationApi.reservationUpdate(reservationId, data),
        onSuccess: (response, variables, context) => {
            toast.success("예약이 수정되었습니다.");
            options?.onSuccess?.(response, variables, context);
        },
        onError: (error, variables, context) => {
            toast.error(error.response?.data.data.value ?? "예약 수정에 실패했습니다.");
            options?.onError?.(error, variables, context);
        },
        ...options,
    });
};

export const useReservationCancel = (reservationId: number) => {
    return useMutation<ApiResponse<string>, CustomApiError>({
        mutationFn: () => reservationApi.reservationCancel(reservationId),
        onSuccess: () => {
            toast.success("예약이 취소되었습니다.");
        },
        onError: (error) => {
            toast.error(error.response?.data.data.value ?? "예약 취소에 실패했습니다.");
        },
    });
};
