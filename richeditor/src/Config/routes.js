import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import Safe from "../Pages/Safe";

import ProtectedRoute from "../Pages/ProtectedRoute";

const routes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Safe />
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
                <Home />
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
