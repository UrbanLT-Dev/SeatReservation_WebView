const UpdateIcon = ({ width = 24, height = 24, color = "#9CA3AF" }: { width?: number; height?: number; color?: string }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.0784 3.55885C17.7204 3.20102 17.2349 3 16.7288 3C16.2226 3 15.7372 3.20102 15.3792 3.55885L13.8091 5.12975L18.8706 10.1908L20.4406 8.6218C20.618 8.44454 20.7586 8.23409 20.8546 8.00246C20.9506 7.77083 21 7.52256 21 7.27184C21 7.02111 20.9506 6.77284 20.8546 6.54121C20.7586 6.30958 20.618 6.09913 20.4406 5.92188L18.0784 3.55885ZM17.521 11.5403L12.4595 6.47923L4.02699 14.9111L3 21L9.08938 19.9721L17.521 11.5403Z"
                fill={color}
            />
        </svg>
    );
};

export default UpdateIcon;
