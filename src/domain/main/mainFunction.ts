import { ReservationTime } from "@/lib/api/roomApi";

export const minutesToTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};
export const stringToMinutes = (time: string | undefined): number => {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};
export const getCurrentTime = (startTime: number, reservationUnitTime: number, selectedDate: string) => {
    const currentDate = new Date(selectedDate);
    const now = new Date();
    const nowTime = stringToMinutes(now.getHours() + ":" + now.getMinutes());
    if (
        startTime > nowTime ||
        currentDate.getFullYear() !== now.getFullYear() ||
        currentDate.getMonth() !== now.getMonth() ||
        currentDate.getDate() !== now.getDate()
    ) {
        return startTime;
    }
    if (now.getMinutes() < reservationUnitTime) {
        return stringToMinutes(now.getHours() + ":00");
    } else {
        return stringToMinutes(now.getHours() + ":" + 30);
    }
};
export const getReservationTimeList = (
    startTime: string | undefined,
    endTime: string | undefined,
    reservationUnitTime: number,
    reservationTimes: ReservationTime[],
    selectedDate: string,
) => {
    // startTime이나 endTime이 없으면 빈 배열 반환
    if (!startTime || !endTime) {
        return [];
    }
    const reservationTimeList = [];
    let currentTime = getCurrentTime(stringToMinutes(startTime), reservationUnitTime, selectedDate);
    const endTimeMinutes = stringToMinutes(endTime);

    while (currentTime < endTimeMinutes) {
        let isReserved = false;

        // 현재 시간이 예약된 시간대에 포함되는지 확인
        if (reservationTimes && reservationTimes.length > 0) {
            for (const reservation of reservationTimes) {
                const reservationStart = stringToMinutes(reservation.startTime);
                const reservationEnd = stringToMinutes(reservation.endTime);

                if (currentTime >= reservationStart && currentTime < reservationEnd && (reservation.status === "COMPLETE" || reservation.status === "USED")) {
                    reservationTimeList.push({
                        time: currentTime,
                        status: reservation.status,
                        reservationId: reservation.reservationId,
                    });
                    isReserved = true;
                    break;
                }
            }
        }
        // 예약되지 않은 시간대는 AVAILABLE로 추가
        if (!isReserved) {
            reservationTimeList.push({
                time: currentTime,
                status: "AVAILABLE",
            });
        }

        currentTime += reservationUnitTime;
    }

    return reservationTimeList;
};
export const getReservationData = (
    productId: number,
    productType: string,
    reservationDate: string,
    reservationStartTime: string,
    reservationEndTime: string,
) => {
    const reservationData = {
        productId: productId,
        productType: productType,
        reservationDate: reservationDate,
        reservationStartTime: reservationStartTime,
        reservationEndTime: reservationEndTime,
    };
    return reservationData;
};
export const getTimeToString = (time: number) => {
    return (
        Math.floor(time / 60)
            .toString()
            .padStart(2, "0") +
        ":" +
        (time % 60).toString().padStart(2, "0")
    );
};

export const getStartTimeColor = (status: string) => {
    if (status === "AVAILABLE") {
        return "bg-white";
    } else {
        return "bg-background-gray";
    }
};
