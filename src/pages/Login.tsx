import LoginForm from "@/domain/login/LoginForm";
import NonBackHeader from "@/components/ui/NonBackHeader.tsx";

const Login = () => {
    return (
        <>
            <NonBackHeader title="로그인" />
            <LoginForm />
        </>
    );
};

export default Login;
