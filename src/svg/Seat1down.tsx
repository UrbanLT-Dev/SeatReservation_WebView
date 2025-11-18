const seat1down = ({ state = "default" }: { state: "default" | "mine" | "selected" | "disabled" }) => {
    const fillColor = {
        default: {
            bg: "#CDCDEA",
            stroke: "#28285F",
            opacity: 1,
        },
        mine: {
            bg: "#188D6D",
            stroke: "#ffffff",
            opacity: 1,
        },
        selected: {
            bg: "#28285F",
            stroke: "#ffffff",
            opacity: 1,
        },
        disabled: {
            bg: "#F0F0F9",
            stroke: "#CCCCEB",
            opacity: 0.3,
        },
    };

    return (
        <svg opacity={fillColor[state].opacity} width="53" height="42" viewBox="0 0 53 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dddd_71_1602)">
                <path
                    d="M34.0842 27.2129C34.0842 29.1459 32.5172 30.7129 30.5842 30.7129L21.4915 30.7129C19.5585 30.7128 17.9915 29.1458 17.9915 27.2129L17.9915 24.2812L34.0842 24.2812L34.0842 27.2129Z"
                    fill={fillColor[state].bg}
                />
                <path
                    d="M34.0842 27.2129C34.0842 29.1459 32.5172 30.7129 30.5842 30.7129L21.4915 30.7129C19.5585 30.7128 17.9915 29.1458 17.9915 27.2129L17.9915 24.2812L34.0842 24.2812L34.0842 27.2129Z"
                    stroke={fillColor[state].stroke}
                />
                <rect x="3.5" y="24.2813" width="22.781" height="45.0758" rx="3.5" transform="rotate(-90 3.5 24.2813)" fill={fillColor[state].bg} />
                <rect x="3.5" y="24.2813" width="22.781" height="45.0758" rx="3.5" transform="rotate(-90 3.5 24.2813)" stroke={fillColor[state].stroke} />
            </g>
            <defs>
                <filter
                    id="filter0_dddd_71_1602"
                    x="0"
                    y="0"
                    width="52.0757"
                    height="41.2129"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_71_1602" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.09 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_71_1602" result="effect2_dropShadow_71_1602" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow_71_1602" result="effect3_dropShadow_71_1602" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="7" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.01 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow_71_1602" result="effect4_dropShadow_71_1602" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_71_1602" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
export default seat1down;
