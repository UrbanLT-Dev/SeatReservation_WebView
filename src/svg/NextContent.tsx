const NextContent = ({ width = 13, height = 12, color = "#D1D5DB" }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 0.5C1 0.223858 0.776142 0 0.5 0C0.223858 0 0 0.223858 0 0.5V11.5C0 11.7761 0.223857 12 0.499999 12C0.500329 12 0.500658 12 0.500987 12H1L12 12C12.2761 12 12.5 11.7761 12.5 11.5C12.5 11.2239 12.2761 11 12 11L1 11V0.5Z"
                fill={color}
            />
        </svg>
    );
};

export default NextContent;
