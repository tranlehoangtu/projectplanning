import { RichUtils } from "draft-js";

import inlineStyles from "./inlineStyles.module.css";

const StyledItalic = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };

    return (
        <div onMouseDown={onMouseDown} className={inlineStyles.buttonWrapper}>
            <button
                onClick={onClick}
                className={`${inlineStyles.button} ${
                    getEditorState().getCurrentInlineStyle().has("ITALIC") &&
                    inlineStyles.active
                }`}
                style={{
                    fontStyle: "italic",
                    fontFamily: '"Times New Roman", Times, serif',
                }}
            >
                i
            </button>
        </div>
    );
};

export default StyledItalic;
