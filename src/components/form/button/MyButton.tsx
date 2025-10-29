import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface MyButtonProps {
    title: string;
    isPending: boolean;
    onClick: () => void;
    type: "submit" | "button";
    isDisabled?: boolean;
}
const MyButton = ({ title, isPending, onClick, type, isDisabled = false }: MyButtonProps) => {
    return (
        <Button
            type={type}
            className={`${isDisabled ? "bg-disabled-gray" : "bg-main-color"} h-12 w-full text-white`}
            disabled={isPending || isDisabled}
            onClick={onClick}
        >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {title}
        </Button>
    );
};

export default MyButton;
