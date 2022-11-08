import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

const Home = () => {
    const [values, setValues] = useState(() => ({
        currentUser: null,
    }));

    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        setValues((prev) => ({
            ...prev,
            currentUser,
        }));
    }, [navigate]);

    return <>{values.currentUser ? <Sidebar /> : "loading"}</>;
};

export default Home;
