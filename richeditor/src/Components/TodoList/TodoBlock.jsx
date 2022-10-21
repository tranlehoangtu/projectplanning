import React from "react";
import { EditorBlock, EditorState, RichUtils } from "draft-js";

import "./styles.css";

const TodoBlock = (props) => {
    const { blockProps } = props;

    const handleChange = () => {
        const { editorState, setEditorState } = blockProps;
        const currentContent = editorState.getCurrentContent();
        const currentContentBlock = currentContent.getBlockForKey(
            props.offsetKey.slice(0, 5)
        );
        const selection = editorState.getSelection().merge({
            anchorKey: props.offsetKey.slice(0, 5),
            anchorOffset: 0,
            focusKey: props.offsetKey.slice(0, 5),
            focusOffset: currentContentBlock.getText().length,
        });
        setEditorState(
            RichUtils.toggleInlineStyle(
                EditorState.forceSelection(editorState, selection),
                "STRIKETHROUGH"
            )
        );
    };

    return (
        <div>
            <input
                type="checkbox"
                onChange={handleChange}
                onMouseDown={(e) => e.preventDefault}
            />
            {/* <label className="container">
                <input type="checkbox" />
                <span className="checkmark"></span>
            </label> */}
            <div className="editor-wrap">
                <EditorBlock {...props} />
            </div>
        </div>
    );
};

export default TodoBlock;
