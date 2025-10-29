import { privateApi } from "./sendApi";
import { ApiResponse } from "../types/api";

interface RoomReservationInfoRequest {
    searchDate: string;
    roomId?: number;
    isAvailable?: boolean;
    startTime?: string;
    endTime?: string;
}

export interface RoomReservationInfoResponseData {
    roomId: number;
    roomName: string;
    maxCapacity: number;
    maxUsageTime: number;
    reservationUnitTime: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    reservationTimes: ReservationTime[] | null;
}
export interface ReservationTime {
    reservationId: number;
    startTime: string;
    endTime: string;
    status: string;
}

export interface ReservationRequest {
    productId: number;
    productType: string;
    reservationDate: string;
    reservationStartTime: string;
    reservationEndTime: string;
}
export interface ReservationResponseData {
    reservationId: number;
    reservationStartTime: string;
    reservationEndTime: string;
}
export interface RoomDetailResponseData {
    roomName: string;
    maxCapacity: number;
    maxUsageTime: number;
    maxReservationLeadDays: number;
    maxQrScans: number;
    imageUrl: string;
    roomAvailableDetails: RoomAvailableDetail[];
}
export interface RoomAvailableDetail {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}
export const roomApi = {
    nonTimeList: async (data: RoomReservationInfoRequest) => {
        const response = await privateApi.get<ApiResponse<RoomReservationInfoResponseData>>("/room/list/non-time", {
            params: data,
        });
        return response.data;
    },
    nonTime: async (data: RoomReservationInfoRequest) => {
        const response = await privateApi.get<ApiResponse<RoomReservationInfoResponseData>>("/room/non-time", {
            params: data,
        });
        return response.data;
    },
    time: async (data: RoomReservationInfoRequest) => {
        const response = await privateApi.get<ApiResponse<RoomReservationInfoResponseData>>("/room/list/time", {
            params: data,
        });
        return response.data;
    },
    reservation: async (data: ReservationRequest) => {
        const response = await privateApi.post<ApiResponse<string>>("/reservation", data);
        return response.data;
    },
    roomDetail: async (roomId: number) => {
        const response = await privateApi.get<ApiResponse<RoomDetailResponseData>>("/room", {
            params: {
                roomId: roomId,
            },
        });
        return response.data;
    },
};
