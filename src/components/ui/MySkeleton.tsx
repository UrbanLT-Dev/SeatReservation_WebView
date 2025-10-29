import Skeleton from "react-loading-skeleton";

const MySkeleton = ({ width, height, className }: { width?: number; height?: number; className?: string }) => {
    return <Skeleton width={width} className={`rounded-lg ${className}`} height={height} />;
};

export default MySkeleton;
