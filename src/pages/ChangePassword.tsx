import ChangePasswordStep1 from "@/domain/changePassword/ChangePasswordStep1.tsx";
import ChangePasswordStep2 from "@/domain/changePassword/ChangePasswordStep2.tsx";
import { SetStateAction, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [step, setStep] = useState(1);
    const [step1Data, setStep1Data] = useState(null);
    const navigate = useNavigate();
    const goBack = () => {
        if (step === 1) {
            navigate(-1);
        } else {
            setStep(1);
        }
    };

    const onNext = (nextStep: number, formData: SetStateAction<null>) => {
        setStep(nextStep);
        setStep1Data(formData);
    };

    return (
        <div>
            <div className="flex h-[52px] items-center pl-5">
                <button type="button" onClick={goBack}>
                    <ArrowLeft />
                </button>
            </div>
            {step === 1 ? <ChangePasswordStep1 onNext={onNext} /> : <ChangePasswordStep2 step1Data={step1Data} />}
        </div>
    );
};

export default ChangePassword;