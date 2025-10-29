import BackHeader from "@/components/ui/BackHeader";
import LoginForm from "@/domain/login/LoginForm";

const Login = () => {
    return (
        <>
            <BackHeader title="로그인" />
            <LoginForm />
        </>
    );
};

export default Login;
