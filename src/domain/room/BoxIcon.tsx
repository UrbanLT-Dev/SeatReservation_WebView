const BoxIcon = ({ color = "main-color", borderColor = "main-color" }: { color?: string; borderColor?: string }) => {
    return <div className={`border-${borderColor} border-[1px] bg-${color} h-[15px] w-[15px] rounded-[4px]`}></div>;
};

export default BoxIcon;
