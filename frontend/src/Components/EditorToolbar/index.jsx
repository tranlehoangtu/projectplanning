import { Paper, Stack } from "@mui/material";
import React from "react";
import StyleBlock from "./StyleBlock";
import StyleInline from "./StyleInline";

const EditorToolbar = (props) => {
    const { toggleInlineStyle, toggleBlockType, editorState } = props;

    return (
        <Paper sx={{ padding: "8px 12px", display: "inline-block" }}>
            <Stack direction="row" alignItems="center" sx={{ height: "32px" }}>
                <StyleBlock
                    onToggle={toggleBlockType}
                    editorState={editorState}
                />
                <StyleInline
                    onToggle={toggleInlineStyle}
                    editorState={editorState}
                />
            </Stack>
        </Paper>
    );
};

export default EditorToolbar;
