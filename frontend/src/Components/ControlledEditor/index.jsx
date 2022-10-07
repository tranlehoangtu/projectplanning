import { Editor, EditorState, RichUtils } from "draft-js";
import React, { useState } from "react";
import EditorToolbar from "../EditorToolbar";

const ControlledEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    return (
        <div>
            <EditorToolbar
                toggleInlineStyle={toggleInlineStyle}
                editorState={editorState}
            />
            <Editor editorState={editorState} onChange={setEditorState} />
        </div>
    );
};

export default ControlledEditor;
