import Login from "@/pages/Login";
import Intro from "@/pages/Intro";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "@/pages/Main";
import Reservation from "@/pages/Reservation";
import Room from "@/pages/Room";
import QrPage from "@/pages/QrPage";
import History from "@/pages/History";
import ReservationUpdate from "@/pages/ReservationUpdate";
import MyPage from "@/pages/MyPage";
import ProtectedRoute from "@/components/ProtectedRoute";

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
                path: "/main",
                element: <ProtectedRoute><Main /></ProtectedRoute>,
            },
            {
                path: "/reservation",
                children: [
                    {
                        path: ":id",
                        element: <ProtectedRoute><Reservation /></ProtectedRoute>,
                    },
                    {
                        path: "update/:id",
                        element: <ProtectedRoute><ReservationUpdate /></ProtectedRoute>,
                    },
                ],
            },
            {
                path: "/room",
                children: [
                    {
                        path: ":id",
                        element: <ProtectedRoute><Room /></ProtectedRoute>,
                    },
                ],
            },
            {
                path: "/qr/:id",
                element: <ProtectedRoute><QrPage /></ProtectedRoute>,
            },
            {
                path: "/history",
                element: <ProtectedRoute><History /></ProtectedRoute>,
            },
            {
                path: "/my-page",
                element: <ProtectedRoute><MyPage /></ProtectedRoute>,
            },
        ],
    },
]); // 라우팅 관리를 위한 코드 설정
