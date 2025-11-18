const seat1 = ({ state = "default" }: { state: "default" | "mine" | "selected" | "disabled" }) => {
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
        }
    }

    return (
        <svg opacity={fillColor[state].opacity} width="52" height="42" viewBox="0 0 52 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dddd_56_332)">
                <path
                    d="M17.9537 5C17.9538 3.06703 19.5208 1.5 21.4537 1.5L30.5465 1.5C32.4794 1.50008 34.0465 3.06708 34.0465 5L34.0465 7.93164L17.9537 7.93164L17.9537 5Z"
                    fill={fillColor[state].bg}
                />
                <path
                    d="M17.9537 5C17.9538 3.06703 19.5208 1.5 21.4537 1.5L30.5465 1.5C32.4794 1.50008 34.0465 3.06708 34.0465 5L34.0465 7.93164L17.9537 7.93164L17.9537 5Z"
                    stroke={fillColor[state].stroke}
                />
                <rect x="48.5" y="7.93164" width="23" height="45" rx="3.5" transform="rotate(90 48.5 7.93164)" fill={fillColor[state].bg} />
                <rect x="48.5" y="7.93164" width="23" height="45" rx="3.5" transform="rotate(90 48.5 7.93164)" stroke={fillColor[state].stroke} />
            </g>
            <defs>
                <filter
                    id="filter0_dddd_56_332"
                    x="0"
                    y="0"
                    width="52"
                    height="41.4316"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_56_332" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.09 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_56_332" result="effect2_dropShadow_56_332" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow_56_332" result="effect3_dropShadow_56_332" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="7" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.01 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow_56_332" result="effect4_dropShadow_56_332" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_56_332" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
export default seat1;
