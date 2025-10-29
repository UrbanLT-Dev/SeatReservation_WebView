const ExclamationMark = ({
    exclamationColor = "#666666",
    backgroundColor = "#F1F1F1",
    width = 20,
    height = 20,
}: {
    exclamationColor?: string;
    backgroundColor?: string;
    width?: number;
    height?: number;
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill={backgroundColor} />
            <path
                d="M10.7831 6.23789L9.99993 10.9379L9.2168 6.23789C9.19802 6.12424 9.20419 6.00787 9.2349 5.89685C9.26561 5.78583 9.32011 5.68282 9.39463 5.59498C9.46914 5.50714 9.56188 5.43657 9.6664 5.38817C9.77093 5.33977 9.88474 5.3147 9.99993 5.3147C10.1151 5.3147 10.2289 5.33977 10.3334 5.38817C10.438 5.43657 10.5307 5.50714 10.6052 5.59498C10.6797 5.68282 10.7342 5.78583 10.765 5.89685C10.7957 6.00787 10.8018 6.12424 10.7831 6.23789Z"
                stroke={exclamationColor}
                strokeWidth="1.875"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.0001 15.0002C10.3453 15.0002 10.6251 14.7204 10.6251 14.3752C10.6251 14.0301 10.3453 13.7502 10.0001 13.7502C9.65494 13.7502 9.37512 14.0301 9.37512 14.3752C9.37512 14.7204 9.65494 15.0002 10.0001 15.0002Z"
                stroke={exclamationColor}
                strokeWidth="1.25"
            />
        </svg>
    );
};

export default ExclamationMark;
