import DetailPage from "@/components/DetailPage";
import ServiceModal from "@/components/modal/ServiceModal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlert } from "@/hooks/useAlert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

function App() {
    const { isOpen, title, description, cancelText, confirmText, onConfirm, close } = useAlert();
    const location = useLocation();
    // console.log(location);
    const navigationType = useNavigationType(); // 'PUSH', 'POP', 'REPLACE'

    const isBack = navigationType === "POP"; // 뒤로가기인지 확인
    if (isBack) {
        return (
            <QueryClientProvider client={queryClient}>
                <div className="h-screen w-screen bg-white">
                    <Outlet />
                    <Toaster richColors position="top-right" duration={3000} toastOptions={{ style: { fontSize: "14px" } }} />
                    <AlertDialog open={isOpen} onOpenChange={close}>
                        <AlertDialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
                            <AlertDialogHeader className="flex flex-col text-start">
                                <AlertDialogTitle>{title}</AlertDialogTitle>
                                <AlertDialogDescription>{description}</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-row justify-end gap-2">
                                <AlertDialogCancel onClick={close}>{cancelText}</AlertDialogCancel>
                                <AlertDialogAction onClick={onConfirm} className="bg-main-color">
                                    {confirmText}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <DetailPage />
                    <ServiceModal />
                </div>
            </QueryClientProvider>
        );
    }
    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen w-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: "absolute", width: "100%", height: "100%" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

                <Toaster richColors position="top-right" duration={3000} toastOptions={{ style: { fontSize: "14px" } }} />
                <AlertDialog open={isOpen} onOpenChange={close}>
                    <AlertDialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
                        <AlertDialogHeader className="flex flex-col text-start">
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                            <AlertDialogDescription>{description}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex flex-row justify-end gap-2">
                            <AlertDialogCancel onClick={close}>{cancelText}</AlertDialogCancel>
                            <AlertDialogAction onClick={onConfirm} className="bg-main-color">
                                {confirmText}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <DetailPage />
                <ServiceModal />
            </div>
        </QueryClientProvider>
    );
}

export default App;
