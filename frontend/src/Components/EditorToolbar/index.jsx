import { Stack } from "@mui/material";
import React from "react";
import StyleInline from "./StyleInline";

const EditorToolbar = (props) => {
    const { toggleInlineStyle, editorState } = props;

    return (
        <Stack>
            <StyleInline
                onToggle={toggleInlineStyle}
                editorState={editorState}
            />
        </Stack>
    );
};

export default EditorToolbar;
