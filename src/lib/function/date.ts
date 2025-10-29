// 날짜를 yy-MM-dd 형식으로 변환
const getDateOfYYMMDD = (date: Date): string => {
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
// 날짜를 yyyy-MM-dd 형식으로 변환
const getDateOfYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
// 날짜를 yyyy-MM-dd 형식으로 변환
const getDateOfYYYYMMDDHHMMSS = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
// 해당 주의 날짜들 구하기
const getWeekDates = (date: Date) => {
    const monday = getMonday(new Date(date));
    const dates: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const newDate = new Date(monday);
        newDate.setDate(monday.getDate() + i);
        dates.push(newDate);
    }

    return dates;
};

// 주어진 날짜의 월요일을 구함
const getMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // 일요일일 경우 처리
    return new Date(date.setDate(diff));
};

const dateToDayOfWeek = (date: string) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    switch (dayOfWeek) {
        case 0:
            return "일";
        case 1:
            return "월";
        case 2:
            return "화";
        case 3:
            return "수";
        case 4:
            return "목";
        case 5:
            return "금";
        case 6:
            return "토";
    }
};

export { getDateOfYYMMDD, getDateOfYYYYMMDD, getDateOfYYYYMMDDHHMMSS, getWeekDates, dateToDayOfWeek };
