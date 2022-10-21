import { RichUtils } from "draft-js";

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
        <div onMouseDown={onMouseDown} className="button-wrapper">
            <button
                onClick={onClick}
                className={`button ${
                    getEditorState()
                        .getCurrentInlineStyle()
                        .has("STRIKETHROUGH") && "active"
                }`}
                style={{ textDecoration: "line-through" }}
            >
                S
            </button>
        </div>
    );
};

export default StyledStrikeThrough;
