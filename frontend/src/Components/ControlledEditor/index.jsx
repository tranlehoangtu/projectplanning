import React, { useState } from "react";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ControlledEditor.css";
import InlineToolbar from "./InlineToolbar";
import BlockToolbar from "./BlockToolbar";
import ListToolbar from "./ListToolbar";
import ColorPickerToolbar from "./ColorPickerToolbar";

// const getSelectedText = (editorState) => {
//     var selectionState = editorState.getSelection();
//     var anchorKey = selectionState.getAnchorKey();
//     var currentContent = editorState.getCurrentContent();
//     var currentContentBlock = currentContent.getBlockForKey(anchorKey);
//     var start = selectionState.getStartOffset();
//     var end = selectionState.getEndOffset();

//     return currentContentBlock.getText().slice(start, end).length > 0;
// };

const ControlledEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    // const [isShown, setIsShown] = useState(false);

    const handleClickMe = () => {
        setEditorState(
            RichUtils.toggleBlockType(editorState, "rgb(97,189,109)")
        );
    };

    return (
        <div className="App">
            <header
                className="App-header"
                // onMouseEnter={() => setIsShown(true)}
                // onMouseLeave={() => setIsShown(false)}
            >
                Rich Text Editor Example
            </header>
            <button onClick={handleClickMe}>Click Me</button>
            {/* options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list',
            'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image',
            'remove', 'history'] */}
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ["blockType", "list", "inline", "colorPicker"],
                    blockType: { component: BlockToolbar },
                    list: { component: ListToolbar },
                    inline: { component: InlineToolbar },
                    colorPicker: { component: ColorPickerToolbar },
                }}
            />
        </div>
    );
};

export default ControlledEditor;
