import { RichUtils } from "draft-js";

import inlineStyles from "./inlineStyles.module.css";

const StyledStrikeThrough = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH")
        );
    };

    return (
        <div onMouseDown={onMouseDown} className={inlineStyles.buttonWrapper}>
            <button
                onClick={onClick}
                className={`${inlineStyles.button} ${
                    getEditorState()
                        .getCurrentInlineStyle()
                        .has("STRIKETHROUGH") && inlineStyles.active
                }`}
                style={{ textDecoration: "line-through" }}
            >
                S
            </button>
        </div>
    );
};

export default StyledStrikeThrough;
