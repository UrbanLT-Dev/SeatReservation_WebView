import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rightIcon?: React.ReactNode;
    onIconClick?: () => void;
}

const Input = ({ label, error, className, type = "text", rightIcon, onIconClick, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";

    const handleIconClick = () => {
        if (isPasswordType) {
            setShowPassword(!showPassword);
        } else if (onIconClick) {
            onIconClick();
        }
    };

    return (
        <div className="w-full">
            {label && <label className="mb-0 block font-medium text-gray-400 text-sm">{label}</label>}
            <div className="relative">
                <input
                    type={isPasswordType ? (showPassword ? "text" : "password") : type}
                    className={cn(
                        "h-11 w-full border-b border-gray-300 text-base transition-all outline-none",
                        "placeholder:text-gray-400",
                        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        rightIcon && "pr-12",
                        className,
                    )}
                    {...props}
                />
                {(rightIcon || isPasswordType) && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-500" onClick={handleIconClick}>
                        {isPasswordType ? showPassword ? <Eye size={20} /> : <EyeOff color="#212121" size={20} /> : rightIcon}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
