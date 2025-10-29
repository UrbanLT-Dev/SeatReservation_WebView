import Check from "@/svg/Check";

const ColorButton = ({
    isSelected,
    handleOptionClick,
    option,
}: {
    isSelected: boolean;
    handleOptionClick: (value: string) => void;
    option: { value: string; label: string };
}) => {
    return (
        <div
            className={`flex h-[44px] w-full cursor-pointer flex-row items-center gap-[10px] rounded-[10px] ${
                isSelected ? "border-main-color bg-main-color/15 border-[2px]" : "bg-background-gray"
            } "transition-transform p-[16px] active:scale-[0.95]`}
            onClick={() => handleOptionClick(option.value)}
        >
            <div
                className={`flex h-[24px] w-[24px] items-center justify-center rounded-full ${isSelected ? "border-main-color bg-main-color" : "border-[1px] border-gray-300 bg-white"}`}
            >
                {isSelected && <Check color="white" width={10} height={7} />}
            </div>
            <p className={`text-[14px] ${isSelected && "font-bold"}`}>{option.label}</p>
        </div>
    );
};

export default ColorButton;
