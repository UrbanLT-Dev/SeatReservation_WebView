export const convertStatusToKorean = (status: string) => {
    switch (status) {
        case "COMPLETE":
            return "예약 완료";
        case "CANCEL":
            return "예약 취소";
        case "USED":
            return "사용 완료";
        default:
            return status;
    }
};
export const statusToColor = (status: string) => {
    switch (status) {
        case "COMPLETE":
            return "bg-main-color";
        case "CANCEL":
            return "bg-warning-orange";
        case "USED":
            return "bg-disabled-gray";
        default:
            return "bg-main-color";
    }
};
