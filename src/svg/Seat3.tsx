const Seat3 = ({ state = "default" }: { state: "default" | "mine" | "selected" | "disabled" }) => {
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
        <svg opacity={fillColor[state].opacity} width="53" height="48" viewBox="0 0 53 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dddd_56_322)">
                <path
                    d="M17.9917 5C17.9917 3.06703 19.5587 1.5 21.4917 1.5L30.5845 1.5C32.5174 1.50008 34.0844 3.06708 34.0845 5L34.0845 7.93164L17.9917 7.93164L17.9917 5Z"
                    fill={fillColor[state].bg}
                />
                <path
                    d="M17.9917 5C17.9917 3.06703 19.5587 1.5 21.4917 1.5L30.5845 1.5C32.5174 1.50008 34.0844 3.06708 34.0845 5L34.0845 7.93164L17.9917 7.93164L17.9917 5Z"
                    stroke={fillColor[state].stroke}
                />
                <rect x="48.5758" y="7.93164" width="23" height="45.0758" rx="3.5" transform="rotate(90 48.5758 7.93164)" fill={fillColor[state].bg} />
                <rect
                    x="48.5758"
                    y="7.93164"
                    width="23"
                    height="45.0758"
                    rx="3.5"
                    transform="rotate(90 48.5758 7.93164)"
                    stroke={fillColor[state].stroke}
                />
                <path
                    d="M45.0458 33.8633C45.0457 35.7962 43.4788 37.3633 41.5458 37.3633L32.453 37.3633C30.5201 37.3632 28.953 35.7962 28.953 33.8633L28.953 30.9316L45.0458 30.9316L45.0458 33.8633Z"
                    fill={fillColor[state].bg}
                />
                <path
                    d="M45.0458 33.8633C45.0457 35.7962 43.4788 37.3633 41.5458 37.3633L32.453 37.3633C30.5201 37.3632 28.953 35.7962 28.953 33.8633L28.953 30.9316L45.0458 30.9316L45.0458 33.8633Z"
                    stroke={fillColor[state].stroke}
                />
                <path
                    d="M23.1227 33.8633C23.1226 35.7962 21.5557 37.3633 19.6227 37.3633L10.5299 37.3633C8.597 37.3632 7.02994 35.7962 7.02991 33.8633L7.02991 30.9316L23.1227 30.9316L23.1227 33.8633Z"
                    fill={fillColor[state].bg}
                />
                <path
                    d="M23.1227 33.8633C23.1226 35.7962 21.5557 37.3633 19.6227 37.3633L10.5299 37.3633C8.597 37.3632 7.02994 35.7962 7.02991 33.8633L7.02991 30.9316L23.1227 30.9316L23.1227 33.8633Z"
                    stroke={fillColor[state].stroke}
                />
            </g>
            <defs>
                <filter
                    id="filter0_dddd_56_322"
                    x="0"
                    y="0"
                    width="52.0758"
                    height="47.8633"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_56_322" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.09 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_56_322" result="effect2_dropShadow_56_322" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow_56_322" result="effect3_dropShadow_56_322" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="7" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.01 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow_56_322" result="effect4_dropShadow_56_322" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_56_322" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default Seat3;
