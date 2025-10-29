import { useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import MySkeleton from "./MySkeleton";

function ImageWithSkeleton({ src, alt }: { src: string; alt?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative h-full w-full">
            {!isLoaded && (
                <div className="absolute inset-0 z-8">
                    <SkeletonTheme baseColor="#f1f1f1" highlightColor="#F7F7F7">
                        <div className="h-full w-full">
                            <MySkeleton />
                        </div>
                    </SkeletonTheme>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                className={`h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
}

export default ImageWithSkeleton;
