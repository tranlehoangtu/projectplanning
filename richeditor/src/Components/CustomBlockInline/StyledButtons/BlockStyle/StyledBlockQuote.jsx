import { RichUtils } from "draft-js";
import React from "react";

import inlineStyles from "../InlineStyle/inlineStyles.module.css";

const StyledBlockQuote = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
    };

    return (
        <div onMouseDown={onMouseDown} className="button-wrapper">
            <button
                onClick={onClick}
                className={`${inlineStyles.button} ${
                    getEditorState()
                        .getCurrentInlineStyle()
                        .has("blockquote") && inlineStyles.active
                }`}
            >
                {`<>`}
            </button>
        </div>
    );
};

export default StyledBlockQuote;
