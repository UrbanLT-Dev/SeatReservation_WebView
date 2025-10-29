const Clock = ({ color = "#868686", width = 17, height = 18 }: { color: string; width: number; height: number }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.5 17.29C12.9183 17.29 16.5 13.7083 16.5 9.29004C16.5 4.87176 12.9183 1.29004 8.5 1.29004C4.08172 1.29004 0.5 4.87176 0.5 9.29004C0.5 13.7083 4.08172 17.29 8.5 17.29Z"
                stroke={color}
                strokeWidth="0.888889"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.61111 5.73438V10.1788H12.0556" stroke={color} strokeWidth="0.888889" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Clock;
