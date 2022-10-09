import React from "react";
import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ControlledEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    return (
        <div className="App">
            <header className="App-header">Rich Text Editor Example</header>
            <Editor editorState={editorState} />
        </div>
    );
};

export default ControlledEditor;
