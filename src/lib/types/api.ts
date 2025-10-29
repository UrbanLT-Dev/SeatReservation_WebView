export interface ApiResponse<T> {
    msg: string;
    status: number;
    data: T;
}

export interface ApiErrorResponse {
    msg: string;
    status: number;
    data: {
        key: string;
        value: string;
    };
}
