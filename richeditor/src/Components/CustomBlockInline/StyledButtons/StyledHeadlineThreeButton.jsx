import { RichUtils } from "draft-js";

const StyledHeadlineThreeButton = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleBlockType(editorState, "header-three"));
    };

    return (
        <div onMouseDown={onMouseDown} className="button-wrapper">
            <button onClick={onClick} className="button">
                H3
            </button>
        </div>
    );
};

export default StyledHeadlineThreeButton;
