import { useEffect } from "react";
import { useState } from "react";

// Styles
import styled from "./DropdownStyles.module.css";

// icons
import { AiOutlineCheck, AiOutlineDown } from "react-icons/ai";
import { RichUtils } from "draft-js";

const buttons = [
    {
        id: 1,
        name: "Text",
        pics: null,
        affect: "unstyled",
        url: "/Images/Buttons/Text.png",
    },
    {
        id: 2,
        name: "Heading 1",
        pics: null,
        affect: "header-one",
        url: "/Images/Buttons/Heading-1.png",
    },
    {
        id: 3,
        name: "Heading 2",
        pics: null,
        affect: "header-two",
        url: "/Images/Buttons/Heading-2.png",
    },
    {
        id: 4,
        name: "Heading 3",
        pics: null,
        affect: "header-three",
        url: "/Images/Buttons/Heading-3.png",
    },
    {
        id: 5,
        name: "To-do list",
        pics: null,
        affect: "todo",
        url: "/Images/Buttons/Todo-List.png",
    },
    {
        id: 6,
        name: "Bulleted list",
        pics: null,
        affect: "unordered-list-item",
        url: "/Images/Buttons/Bulleted-List.png",
    },
    {
        id: 7,
        name: "Numbered list",
        pics: null,
        affect: "ordered-list-item",
        url: "/Images/Buttons/Numbered-List.png",
    },
    {
        id: 9,
        name: "Quote",
        pics: null,
        affect: "quote-block",
        url: "/Images/Buttons/Quote.png",
    },
];

const getCurrentBlock = (editorState) => {
    const currentSelection = editorState.getSelection();
    const blockKey = currentSelection.getStartKey();
    return editorState.getCurrentContent().getBlockForKey(blockKey);
};

const getBlockType = (editorState) => {
    const currentBlock = getCurrentBlock(editorState);
    const blockType = currentBlock.getType();
    return blockType;
};

// const getSelectedText = (editorState) => {
//     // Get block for current selection
// let selection = editorState.getSelection();
// const anchorKey = selection.getAnchorKey();
// const currentContent = editorState.getCurrentContent();
// const currentBlock = currentContent.getBlockForKey(anchorKey);

//     //Then based on the docs for SelectionState -
//     const start = selection.getStartOffset();
//     const end = selection.getEndOffset();
//     const selectedText = currentBlock.getText().slice(start, end);

//     console.log(selectedText);
// };

const Dropdown = (props) => {
    const { setShown, handleClick, currentBlockStyle } = props;

    useEffect(() => {
        const onWindowClick = () => {
            setShown(false);
        };
        setTimeout(() => {
            window.addEventListener("click", onWindowClick);
        });
        return () => window.removeEventListener("click", onWindowClick);
    }, [setShown]);

    return (
        <div className={styled.dropdown}>
            <div className={styled.title}>Turn into</div>
            {buttons.map((item) => (
                <div
                    key={item.id}
                    className={styled.dropdownItem}
                    onClick={() => handleClick(item.affect)}
                >
                    <img
                        src={item.url}
                        alt={item.name}
                        width="30px"
                        height="30px"
                        className={styled.image}
                    />
                    <div>{item.name}</div>
                    <div className={styled.space}></div>
                    {currentBlockStyle === item.affect && (
                        <div>
                            <AiOutlineCheck />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function DropdownStyles(props) {
    const { getEditorState, setEditorState } = props;

    const [shown, setShown] = useState(false);
    const [currentStyle, setCurrentStyle] = useState("");

    const editorState = getEditorState();
    const currentBlockStyle = getBlockType(editorState);

    useEffect(() => {
        if (currentBlockStyle === "unstyled") setCurrentStyle("Text");
        else {
            const button = buttons.find(
                (item) => item.affect === currentBlockStyle
            );
            if (button) setCurrentStyle(button.name);
        }
    }, [currentBlockStyle]);

    const handleClick = (affect) => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleBlockType(editorState, affect));
    };

    return (
        <div
            onMouseDown={(e) => e.preventDefault()}
            className={styled.container}
        >
            <span onClick={() => setShown(!shown)}>{currentStyle}</span>
            <AiOutlineDown className={styled.dropdownIcon} />

            {shown && (
                <Dropdown
                    setShown={setShown}
                    handleClick={handleClick}
                    currentBlockStyle={currentBlockStyle}
                />
            )}
        </div>
    );
}
