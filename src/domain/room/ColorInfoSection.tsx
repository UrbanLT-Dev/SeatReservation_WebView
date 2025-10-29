import BoxIcon from "./BoxIcon";

const ColorInfoSection = () => {
    return (
        <div className="flex flex-row items-center justify-end gap-4">
            <div className="flex flex-row items-center gap-1">
                <BoxIcon color="background-gray" borderColor="border-gray" />
                <p className="text-text-gray text-sm">예약불가</p>
            </div>
            <div className="flex flex-row items-center gap-1">
                <BoxIcon color="white" borderColor="border-gray" />
                <p className="text-text-gray text-sm">예약가능</p>
            </div>
            <div className="flex flex-row items-center gap-1">
                <BoxIcon />
                <p className="text-text-gray text-sm">시간선택</p>
            </div>
        </div>
    );
};

export default ColorInfoSection;
