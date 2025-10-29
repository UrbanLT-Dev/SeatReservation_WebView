import Clack from "@/svg/Clock";
import * as Select from "@radix-ui/react-select";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface MySelectProps {
    options: string[];
    onChange: (value: string) => void;
    value: string;
    label: string;
}

const MySelect = ({ options, onChange, value, label }: MySelectProps) => {
    return (
        <Select.Root onValueChange={onChange} value={value}>
            <Select.Trigger
                className={`border-border-gray ${value ? "text-text-black" : "text-text-gray"} flex h-12 w-full flex-row items-center justify-between rounded-lg border-1 p-4`}
            >
                <Select.Value placeholder={label} />
                <Clack color="#868686" width={17} height={16} />
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={5}
                    className="animate-in fade-in-0 zoom-in-95 z-50 rounded-lg border bg-white shadow-md"
                    style={{ width: "var(--radix-select-trigger-width)" }}
                >
                    <ScrollArea className="h-[200px] w-full p-0">
                        <Select.Group className="w-full">
                            <Select.Label className="text-text-gray px-4 py-2">{label}</Select.Label>
                            {options.map((option) => (
                                <Select.Item
                                    key={option}
                                    value={option}
                                    className="text-text-gray active:bg-background-gray relative flex cursor-pointer items-center px-4 py-2"
                                >
                                    <Select.ItemText>{option}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </ScrollArea>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default MySelect;
