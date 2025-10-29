import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import HistoryItem from "./HistoryItem";
import HistoryItemSkeleton from "./HistoryItemSkeleton";
import { reservationApi } from "@/lib/api/reservationApi";
import { ApiResponse } from "@/lib/types/api";
import { HistoryResponseData } from "@/lib/api/reservationApi";
import useHistorySearchStore from "./store/useSearch";
import Lottie from "lottie-react";
import emptyAnimation from "../../../public/assets/empty.json";
const HistoryListSection = () => {
    const { status, period } = useHistorySearchStore();
    const observerRef = useRef<HTMLDivElement>(null);
    const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<
        ApiResponse<HistoryResponseData[]>,
        Error,
        { pages: ApiResponse<HistoryResponseData[]>[] },
        [string, string, number],
        number | undefined
    >({
        queryKey: ["reservationHistory", status, period],
        queryFn: ({ pageParam }) => {
            return reservationApi.reservationHistory(pageParam, status, period);
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.data || lastPage.data.length === 0) {
                return undefined;
            }
            const nextParam = lastPage.data[lastPage.data.length - 1].reservationId;
            return nextParam;
        },
        initialPageParam: undefined,
    });
    const historyList = data?.pages.flatMap((page) => page.data) || [];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);

    if (isLoading)
        return (
            <div className="flex flex-col">
                {Array.from({ length: 5 }).map((_, index) => (
                    <HistoryItemSkeleton key={index} />
                ))}
            </div>
        );
    if (isError) return <div>Error</div>;
    return (
        <div className="bg-background-gray h-[calc(100vh-144px)] overflow-y-auto">
            {historyList.length > 0 ? (
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-4">
                        {historyList.map((item: HistoryResponseData) => (
                            <HistoryItem key={item.reservationId} {...item} />
                        ))}
                    </div>
                    <div ref={observerRef} className="h-4" />
                </div>
            ) : (
                <div className="mt-4 h-[calc(100vh-10rem)] bg-white text-center">
                    <div className="flex flex-col items-center justify-center">
                        <Lottie animationData={emptyAnimation} style={{ height: 200, width: 200 }} loop={true} autoplay={true} />
                        <h1>조회된 결과가 없습니다.</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryListSection;
