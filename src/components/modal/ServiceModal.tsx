import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useServiceModalStore } from "@/store/useServiceModalStore";
import Service from "@/components/modal/UI/service";

const ServiceModal = () => {
    const { isOpen, close } = useServiceModalStore();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent style={{borderRadius: '0'}} className="overflow-auto max-w-none w-[100vw] h-[100vh] flex flex-col p-0 gap-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[state=closed]:fade-out-100 data-[state=open]:fade-in-100 duration-400" >
                <DialogHeader className="mb-9 h-13 w-full flex-shrink-0 relative">
                    <div className="flex items-center justify-center p-4">
                        <DialogTitle className="text-xl font-bold">
                            개인정보처리방침
                        </DialogTitle>
                        <button className="absolute top-[50%] right-4 translate-x-0 translate-y-[-50%]" onClick={close}>
                            <div className="relative h-6 w-6">
                                <span className="bg-text-black absolute top-[50%] left-[50%] h-[2px] w-full translate-x-[-50%] rotate-45" />
                                <span className="bg-text-black absolute top-[50%] left-[50%] h-[2px] w-full translate-x-[-50%] rotate-135" />
                            </div>
                        </button>
                    </div>
                </DialogHeader>
                <div className="flex-1 px-4 pb-5">
                    <Service />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceModal;
