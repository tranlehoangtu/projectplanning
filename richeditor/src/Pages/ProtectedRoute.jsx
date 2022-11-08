import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const location = useLocation();
    return (
        <>
            {currentUser ? (
                <>{children}</>
            ) : (
                <Navigate to="/login" state={{ from: location }} replace />
            )}
        </>
    );
};

export default ProtectedRoute;
