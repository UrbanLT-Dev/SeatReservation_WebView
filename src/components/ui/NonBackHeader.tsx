const NonBackHeader = ({ title, onClick }: { title: string; onClick?: () => void }) => {
    return (
        <div className="fixed top-0 left-0 z-9 flex h-16 w-full items-center justify-between bg-white px-4">
            <p className="text-xl font-bold">{title}</p>
            {onClick && (
                <p className="text-main-color font-bold" onClick={onClick}>
                    예약 내역
                </p>
            )}
        </div>
    );
};

export default NonBackHeader;
