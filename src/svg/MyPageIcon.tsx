const MyPageIcon = ({ width, height, color }: { width: number; height: number; color: string }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.1667" cy="12.72" r="11.5" stroke={color} />
            <path d="M8.16666 7.71997L8.16666 11.72" stroke={color} strokeLinecap="round" />
            <path d="M16.1667 7.71997L16.1667 11.72" stroke={color} strokeLinecap="round" />
            <path
                d="M8.16666 16.8738V16.8738C10.7047 18.0452 13.6286 18.0452 16.1667 16.8738V16.8738"
                stroke={color}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default MyPageIcon;
