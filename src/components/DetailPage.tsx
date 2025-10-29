import { useEffect, useRef, useState } from "react";
import { useDetailStore } from "@/store/useDetailStore";
import CloseIcon from "@/svg/CloseIcon";

const DetailPage = () => {
    const { isOpen, title, content, close } = useDetailStore();
    const modalRef = useRef<HTMLDivElement>(null);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // 스크롤 잠금 효과
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            modalRef.current.style.transform = "translateY(100%)";
            requestAnimationFrame(() => {
                if (modalRef.current) {
                    modalRef.current.style.transform = "translateY(0)";
                }
            });
        } else {
            if (modalRef.current) {
                modalRef.current.style.transform = "translateY(100%)";
            }
        }
    }, [isOpen]);

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.style.transform = "translateY(100%)";
            setTimeout(close, 300);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartY(e.touches[0].clientY);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0) {
            // 아래로 드래그할 때만
            setCurrentY(diff);
            if (modalRef.current) {
                modalRef.current.style.transform = `translateY(${diff}px)`;
            }
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        if (currentY > 100) {
            // 일정 거리 이상 드래그했을 때
            handleClose();
        } else {
            // 원래 위치로 돌아가기
            if (modalRef.current) {
                modalRef.current.style.transform = "translateY(0)";
            }
        }
        setCurrentY(0);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed bottom-0 z-1000 h-full w-full bg-white transition-transform duration-300 ease-out"
            style={{
                maxHeight: "calc(100vh - env(safe-area-inset-top))",
                touchAction: "pan-y",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex h-16 w-full items-center bg-white">
                <div className="flex-1 text-center">
                    <p className="text-xl font-bold">{title}</p>
                </div>
                <div className="absolute right-6" onClick={handleClose}>
                    <CloseIcon />
                </div>
            </div>

            <div className="h-full overflow-y-auto pb-4">{content}</div>
        </div>
    );
};

export default DetailPage;
