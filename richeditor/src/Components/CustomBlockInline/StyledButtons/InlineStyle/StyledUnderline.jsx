import { RichUtils } from "draft-js";

const StyledUnderline = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    };

    return (
        <div onMouseDown={onMouseDown} className="button-wrapper">
            <button
                onClick={onClick}
                className={`button ${
                    getEditorState().getCurrentInlineStyle().has("UNDERLINE") &&
                    "active"
                }`}
                style={{ textDecoration: "underline" }}
            >
                U
            </button>
        </div>
    );
};

export default StyledUnderline;
