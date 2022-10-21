import { RichUtils } from "draft-js";

const StyledBold = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    return (
        <div onMouseDown={onMouseDown} className="button-wrapper">
            <button
                onClick={onClick}
                className={`button ${
                    getEditorState().getCurrentInlineStyle().has("BOLD") &&
                    "active"
                }`}
                style={{ fontWeight: "bold" }}
            >
                B
            </button>
        </div>
    );
};

export default StyledBold;
