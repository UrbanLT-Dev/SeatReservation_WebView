const Arrow = ({ color = "#868686", width = 8, height = 16 }: { color?: string; width?: number; height?: number }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 1L0.5 8L7.5 15" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Arrow;
