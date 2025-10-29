import BackHeader from "@/components/ui/BackHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import MyReservationDetail from "@/domain/reservation/MyReservationDetail";
import { useAlert } from "@/hooks/useAlert";
import { reservationApi } from "@/lib/api/reservationApi";
import CloseIcon from "@/svg/CloseIcon";
import Hambugger from "@/svg/Hambugger";
import UpdateIcon from "@/svg/UpdateIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const QrPage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["reservation", id],
        queryFn: () => reservationApi.reservationDetail(Number(id)),
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    if (!data?.data)
        return (
            <div>
                <BackHeader title="예약 내역 상세" />
            </div>
        );
    return (
        <div>
            <BackHeader title="예약 내역 상세" rightComponent={data?.data.status === "COMPLETE" && <RightComponent />} />
            <MyReservationDetail data={data.data} />
        </div>
    );
};

const RightComponent = () => {
    const { open, close } = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const handleUpdate = () => {
        navigate(`/reservation/update/${id}`);
    };

    const { mutate } = useMutation({
        mutationFn: () => reservationApi.reservationCancel(Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservationHistory"] });
            toast.success("예약이 취소되었습니다.");
            navigate(-1);
            setTimeout(() => {
                document.body.style.pointerEvents = "auto";
            }, 300);
        },
        onError: (error) => {
            // console.error("예약 취소 실패:", error);
            toast.error(`예약 취소에 실패했습니다.\n\n에러: ${error.message || error}`);
        },
    });
    const handleDelete = () => {
        open({
            title: "예약 취소",
            description: "예약을 취소하시겠습니까?",
            confirmText: "확인",
            cancelText: "취소",
            onConfirm: () => {
                mutate();
            },
            onCancel: () => {
                close();
            },
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <button>
                    <Hambugger />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col items-center justify-center p-2.5 gap-2.5" >
                <DropdownMenuItem onSelect={handleUpdate} className="cursor-pointer">
                    <div className="flex flex-row items-center gap-2.5">
                        <UpdateIcon color="var(--color-disabled-gray)" />
                        <p>수정</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleDelete} className="cursor-pointer">
                    <div className="flex flex-row items-center gap-2.5">
                        <CloseIcon color="var(--color-disabled-gray)" />
                        <p>취소</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default QrPage;
