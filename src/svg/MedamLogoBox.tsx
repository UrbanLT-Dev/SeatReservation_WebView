const MedamLogoBox = ({
    width = 40,
    height = 40,
    backgroundColor = "var(--color-main-color)",
    logoColor = "white",
}: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    logoColor?: string;
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width={width} height={height} rx="7.40741" fill={backgroundColor} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8516 27.1497L11.8516 25.8274L11.8516 25.8269L11.8516 12.8687C11.8516 12.2844 12.3252 11.8108 12.9094 11.8108L14.1486 11.8108C14.7328 11.8108 15.2064 12.2844 15.2064 12.8687L15.2064 23.7116C15.2064 24.2959 15.68 24.7695 16.2643 24.7695L23.4389 24.7695C24.0231 24.7695 24.4967 24.2959 24.4967 23.7117L24.4967 12.8687C24.4967 12.2844 24.9703 11.8108 25.5546 11.8108L26.7937 11.8108C27.3779 11.8108 27.8516 12.2844 27.8516 12.8687L27.8516 25.8274L27.8516 27.1497L27.8516 27.1497C27.8516 27.7339 27.3779 28.2075 26.7937 28.2075L12.9094 28.2075C12.3252 28.2075 11.8516 27.7339 11.8516 27.1497Z"
                fill={logoColor}
            />
            <rect
                x="23.0908"
                y="18.2715"
                width="6.47934"
                height="6.47934"
                rx="1.05785"
                transform="rotate(-180 23.0908 18.2715)"
                fill={logoColor}
            />
        </svg>
    );
};

export default MedamLogoBox;
