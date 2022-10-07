import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { FormatBold } from "@mui/icons-material";

const ControlledEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleClickMe = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        console.log(command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }

        return "not-handled";
    };

    return (
        <div>
            <IconButton onClick={() => console.log("clicked")}>
                <FormatBold />
            </IconButton>
            <button onClick={handleClickMe}>Click Me</button>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Hello World"
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    );
};

export default ControlledEditor;
