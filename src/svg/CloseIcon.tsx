const CloseIcon = ({ width = 18, height = 18, color = "#212121" }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M1 17L17 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default CloseIcon;
