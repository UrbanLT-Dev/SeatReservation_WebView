export const categoryOptions = () => {
    return [
        {
            label: "전체",
            value: "all",
        },
        {
            label: "예약완료",
            value: "COMPLETE",
        },
        {
            label: "예약취소",
            value: "CANCEL",
        },
        {
            label: "시용완료",
            value: "USED",
        },
    ];
};
export const periodOptions = () => {
    return [
        {
            label: "최근 1개월",
            value: 1,
        },
        {
            label: "최근 3개월",
            value: 3,
        },
        {
            label: "최근 6개월",
            value: 6,
        },
        {
            label: "최근 12개월",
            value: 12,
        },
    ];
};
