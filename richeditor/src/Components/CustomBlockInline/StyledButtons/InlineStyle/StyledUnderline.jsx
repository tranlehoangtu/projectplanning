import { RichUtils } from "draft-js";

import inlineStyles from "./inlineStyles.module.css";

const StyledUnderline = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    };

    return (
        <div onMouseDown={onMouseDown} className={inlineStyles.buttonWrapper}>
            <button
                onClick={onClick}
                className={`${inlineStyles.button} ${
                    getEditorState().getCurrentInlineStyle().has("UNDERLINE") &&
                    inlineStyles.active
                }`}
                style={{ textDecoration: "underline" }}
            >
                U
            </button>
        </div>
    );
};

export default StyledUnderline;
