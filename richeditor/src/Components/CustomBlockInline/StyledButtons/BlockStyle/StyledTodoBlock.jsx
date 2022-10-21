import React, { useState } from "react";
import { EditorBlock } from "draft-js";

import "./styles.css";
import { Checkbox } from "@mui/material";

const StyledTodoBlock = (props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div>
            <Checkbox
                sx={{
                    position: "absolute",
                    padding: "0",
                }}
                onClick={handleChange}
                checked={checked}
            />
            <div className={`editor-wrap ${checked ? "strike" : ""}`}>
                <EditorBlock {...props} />
            </div>
        </div>
    );
};

export default StyledTodoBlock;
