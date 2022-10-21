import { RichUtils } from "draft-js";
import React from "react";

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
                className={`button ${
                    getEditorState()
                        .getCurrentInlineStyle()
                        .has("blockquote") && "active"
                }`}
            >
                {`<>`}
            </button>
        </div>
    );
};

export default StyledBlockQuote;
