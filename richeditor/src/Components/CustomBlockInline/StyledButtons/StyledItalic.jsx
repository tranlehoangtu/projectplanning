import { RichUtils } from "draft-js";

const StyledItalic = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };

    return (
        <div onMouseDown={onMouseDown} className="button-wrapper">
            <button
                onClick={onClick}
                className={`button ${
                    getEditorState().getCurrentInlineStyle().has("ITALIC") &&
                    "active"
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
