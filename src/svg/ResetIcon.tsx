const ResetIcon = ({ width = 16, height = 19, color = "#868686" }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.9483 5.70818C12.2993 5.0571 11.5281 4.54074 10.6789 4.18879C9.82967 3.83683 8.91926 3.65622 8 3.65735C6.14356 3.65759 4.36321 4.39516 3.05051 5.70787C1.73781 7.02057 1.00023 8.80091 1 10.6574C1.00023 12.5146 1.73752 14.2959 3.04997 15.61C4.36242 16.9241 6.14274 17.6636 8 17.6662C9.85741 17.6636 11.6379 16.924 12.9503 15.6097C14.2628 14.2954 15 12.5139 15 10.6565"
                stroke={color}
                strokeMiterlimit="10"
                strokeLinecap="round"
            />
            <path
                d="M12.3082 1.33386L13.1469 4.73984C13.2214 5.04175 13.173 5.36085 13.0125 5.62715C12.8519 5.89345 12.5923 6.0852 12.2906 6.16032L8.87488 6.99725"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ResetIcon;
