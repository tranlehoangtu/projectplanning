import { RichUtils } from "draft-js";

import inlineStyles from "./inlineStyles.module.css";

const StyledBold = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    return (
        <div onMouseDown={onMouseDown} className={inlineStyles.buttonWrapper}>
            <button
                onClick={onClick}
                className={`${inlineStyles.button} ${
                    getEditorState().getCurrentInlineStyle().has("BOLD") &&
                    inlineStyles.active
                }`}
                style={{ fontWeight: "bold" }}
            >
                B
            </button>
        </div>
    );
};

export default StyledBold;
