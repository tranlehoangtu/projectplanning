import { Button } from "@mui/material";
import React from "react";
import { FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styledError from "./error.module.css";

const Error = (props) => {
    const { setError, setLoading } = props;

    const navigate = useNavigate();
    const handleClick = () => {
        setError(false);
        setLoading(true);

        navigate(`/`);
    };

    return (
        <div className={styledError.container}>
            <FaBan
                className="icon"
                style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    fontSize: "86px",
                }}
            />
            <h2>This content does not exist</h2>
            <Button variant="contained" size="small" onClick={handleClick}>
                Back to my content
            </Button>
        </div>
    );
};

export default Error;
