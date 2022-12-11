import React, { useState } from "react";
import { EditorBlock } from "draft-js";

import { Checkbox } from "@mui/material";

const TodoBlock = (props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div>
            <Checkbox
                sx={{
                    padding: "0",
                    display: "inline-block",
                    marginRight: "4px",
                }}
                onClick={handleChange}
                checked={checked}
            />
            <div
                className={`editor-wrap ${checked ? "strike" : ""}`}
                style={{ display: "inline-block" }}
            >
                <EditorBlock {...props} />
            </div>
        </div>
    );
};

export default TodoBlock;
