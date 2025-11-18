const Seat3left = ({ state = "default" }: { state: "default" | "mine" | "selected" | "disabled" }) => {
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
        <svg opacity={fillColor[state].opacity} width="43" height="58" viewBox="0 0 43 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dddd_71_1587)">
                <path d="M6.99994 32.084C5.06697 32.084 3.49994 30.517 3.49994 28.584L3.49994 19.4912C3.50002 17.5583 5.06702 15.9912 6.99994 15.9912L9.93158 15.9912L9.93158 32.084L6.99994 32.084Z" fill={fillColor[state].bg}/>
                <path d="M6.99994 32.084C5.06697 32.084 3.49994 30.517 3.49994 28.584L3.49994 19.4912C3.50002 17.5583 5.06702 15.9912 6.99994 15.9912L9.93158 15.9912L9.93158 32.084L6.99994 32.084Z" stroke={fillColor[state].stroke}/>
                <rect x="9.93158" y="1.5" width="23" height="45.0758" rx="3.5" fill={fillColor[state].bg}/>
                <rect x="9.93158" y="1.5" width="23" height="45.0758" rx="3.5" stroke={fillColor[state].stroke}/>
                <path d="M35.8632 5.03027C37.7962 5.03031 39.3632 6.5973 39.3632 8.53027V17.623C39.3631 19.556 37.7961 21.123 35.8632 21.123H32.9316V5.03027H35.8632Z" fill={fillColor[state].bg}/>
                <path d="M35.8632 5.03027C37.7962 5.03031 39.3632 6.5973 39.3632 8.53027V17.623C39.3631 19.556 37.7961 21.123 35.8632 21.123H32.9316V5.03027H35.8632Z" stroke={fillColor[state].stroke}/>
                <path d="M35.8631 26.9531C37.7961 26.9532 39.3631 28.5201 39.3631 30.4531V39.5459C39.363 41.4788 37.796 43.0459 35.8631 43.0459H32.9315V26.9531H35.8631Z" fill={fillColor[state].bg}/>
                <path d="M35.8631 26.9531C37.7961 26.9532 39.3631 28.5201 39.3631 30.4531V39.5459C39.363 41.4788 37.796 43.0459 35.8631 43.0459H32.9315V26.9531H35.8631Z" stroke={fillColor[state].stroke}/>
            </g>
            <defs>
                <filter id="filter0_dddd_71_1587" x="0" y="0" width="42.8632" height="57.0762" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_71_1587"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.09 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_71_1587" result="effect2_dropShadow_71_1587"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.05 0"/>
                    <feBlend mode="normal" in2="effect2_dropShadow_71_1587" result="effect3_dropShadow_71_1587"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="7"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.156863 0 0 0 0 0.372549 0 0 0 0.01 0"/>
                    <feBlend mode="normal" in2="effect3_dropShadow_71_1587" result="effect4_dropShadow_71_1587"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_71_1587" result="shape"/>
                </filter>
            </defs>
        </svg>

    );
};

export default Seat3left;
