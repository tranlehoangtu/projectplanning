import { RichUtils } from "draft-js";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

import blockStyles from "./blockStyles.module.css";

const BLOCK_STYLES = [
    {
        label: "Text",
        img: "Text.png",
        style: "unstyled",
    },
    {
        label: "Heading 1",
        img: "Heading-1.png",
        style: "header-one",
    },
    {
        label: "Heading 2",
        img: "Heading-2.png",
        style: "header-two",
    },
    {
        label: "Heading 3",
        img: "Heading-3.png",
        style: "header-three",
    },
    {
        label: "Bulleted list",
        img: "Bulleted-List.png",
        style: "unordered-list-item",
    },
    {
        label: "Numbered list",
        img: "Numbered-List.png",
        style: "ordered-list-item",
    },
    {
        label: "Todo list",
        img: "Todo-List.png",
        style: "ordered-list-item",
    },
];

const StyledButton = (props) => {
    const {
        visible,
        setVisible,
        getEditorState,
        setEditorState,
        currentBlockType,
    } = props;

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener("click", onWindowClick);
        });
        const onWindowClick = () => {
            setVisible(false);
        };

        return () => {
            window.removeEventListener("click", onWindowClick);
        };
    }, [setVisible]);

    const handleBlockClick = (blockStyle) => {
        setEditorState(RichUtils.toggleBlockType(getEditorState(), blockStyle));
    };

    return (
        <div
            className={`${blockStyles.dropdownContainer} ${
                visible ? blockStyles.show : ""
            }`}
        >
            <div className={blockStyles.dropdownTitle}>TURN INTO</div>
            <div className={blockStyles.dropdownButtons}>
                {BLOCK_STYLES.map((block) => (
                    <div
                        className={blockStyles.dropdownButton}
                        key={block.label}
                        onClick={() => handleBlockClick(block.style)}
                    >
                        <div className={blockStyles.dropdownButtonHead}>
                            <img src={`/Images/${block.img}`} alt="text" />
                            <div className={blockStyles.dropdownButtonHeadText}>
                                {block.label}
                            </div>
                        </div>
                        <div className={blockStyles.dropdownButtonFoot}>
                            {block.label === currentBlockType && <FaCheck />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StyledText = (props) => {
    const { getEditorState } = props;

    const getCurrentBlockType = () => {
        const editorState = getEditorState();
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        const styleBlock = BLOCK_STYLES.find(
            (styleBlock) => styleBlock.style === blockType
        );

        if (styleBlock) return styleBlock.label;

        return null;
    };

    const [visible, setVisible] = useState(false);
    const onMouseDown = (event) => event.preventDefault();
    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <>
            <div className={blockStyles.container} onMouseDown={onMouseDown}>
                <div
                    className={blockStyles.containerTitle}
                    onClick={handleClick}
                >
                    {getCurrentBlockType() || "Text"} <FaAngleDown />
                </div>
                {visible && (
                    <StyledButton
                        visible={visible}
                        setVisible={setVisible}
                        currentBlockType={getCurrentBlockType()}
                        {...props}
                    />
                )}
            </div>
        </>
    );
};

export default StyledText;
