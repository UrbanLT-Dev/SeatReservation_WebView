const MedamLogo = ({
    width,
    height,
    backgroundColor,
    logoColor,
}: {
    width: number;
    height: number;
    backgroundColor: string;
    logoColor: string;
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 137 162" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="68.5" cy="68.4299" r="68" fill={backgroundColor} />
            <path
                d="M71.4641 155.43C69.9245 158.097 66.0755 158.097 64.5359 155.43L51.1125 132.18C49.5729 129.513 51.4974 126.18 54.5766 126.18L81.4234 126.18C84.5026 126.18 86.4271 129.513 84.8875 132.18L71.4641 155.43Z"
                fill={backgroundColor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41 99.5C38.7909 99.5 37 97.7091 37 95.5L37 90.5L37 90.4983L37 41.5C37 39.2909 38.7909 37.5 41 37.5L45.6855 37.5C47.8946 37.5 49.6855 39.2909 49.6855 41.5L49.6855 82.5C49.6855 84.7091 51.4763 86.5 53.6855 86.5L80.8145 86.5C83.0237 86.5 84.8145 84.7091 84.8145 82.5L84.8145 41.5C84.8145 39.2909 86.6054 37.5 88.8145 37.5L93.5 37.5C95.7091 37.5 97.5 39.2909 97.5 41.5L97.5 90.5L97.5 95.5C97.5 95.7761 97.472 96.0458 97.4187 96.3061C97.2948 96.9118 97.034 97.4675 96.6701 97.9397C95.9387 98.8886 94.7907 99.5 93.5 99.5L88.8145 99.5L45.6855 99.5L41 99.5Z"
                fill={logoColor}
            />
            <rect x="79.5" y="61.9299" width="24.5" height="24.5" rx="4" transform="rotate(-180 79.5 61.9299)" fill={logoColor} />
        </svg>
    );
};

export default MedamLogo;
