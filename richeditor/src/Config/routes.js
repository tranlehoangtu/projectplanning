import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import Sidebar from "../Components/Sidebar";

import ProtectedRoute from "../Pages/ProtectedRoute";

const routes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/:id",
        element: (
            <ProtectedRoute>
                <Sidebar />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
];

export default routes;
