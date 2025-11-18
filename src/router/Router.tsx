import Login from "@/pages/Login";
import Intro from "@/pages/Intro";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "@/pages/Main";
import ProtectedRoute from "@/components/ProtectedRoute";
import MyPage from "@/pages/MyPage.tsx";
import ChangePassword from "@/pages/ChangePassword.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Intro />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/change-password",
                element: <ProtectedRoute><ChangePassword /></ProtectedRoute>,
            },
            {
                path: "/main",
                element: <ProtectedRoute><Main /></ProtectedRoute>,
            },
            {
                path: "/my-page",
                element: <ProtectedRoute><MyPage /></ProtectedRoute>,
            }
        ],
    },
]); // 라우팅 관리를 위한 코드 설정
