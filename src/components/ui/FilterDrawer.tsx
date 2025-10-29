import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ReactNode } from "react";

interface FilterDrawerProps {
    title: ReactNode;
    children: ReactNode;
    titleText?: string; // 접근성을 위한 실제 텍스트
}

const FilterDrawer = ({ title, children, titleText }: FilterDrawerProps) => {
    return (
        <Drawer>
            <DrawerTrigger asChild>{title}</DrawerTrigger>
            <DrawerContent>
                <DrawerTitle className="sr-only">{titleText}</DrawerTitle>
                <div className="mt-4 mb-10 px-4">{children}</div>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawer;
