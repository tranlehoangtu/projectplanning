import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Safe = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        navigate(`/${currentUser.lastProject}`);
    });
};

export default Safe;
