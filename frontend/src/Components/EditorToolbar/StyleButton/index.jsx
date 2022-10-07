import React from "react";
import { styled } from "@mui/system";

const StyledButton = styled("button")({
    backgroundColor: "inherit",
    border: "none",
    padding: "6px",
    fontWeight: 400,
});

const StyleButton = (props) => {
    const { label, style, onToggle, active } = props;

    return (
        <StyledButton
            onMouseDown={(e) => {
                e.preventDefault();
                onToggle(style);
            }}
            style={{ color: active ? "blue" : "#000" }}
        >
            {label}
        </StyledButton>
    );
};

export default StyleButton;
