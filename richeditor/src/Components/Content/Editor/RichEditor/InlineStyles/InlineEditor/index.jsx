import { RichUtils } from "draft-js";
import React from "react";

// Styles
import styled from "./inline.module.css";

const buttons = [
    {
        id: 1,
        name: "b",
        style: "bStyle",
        affect: "BOLD",
    },
    {
        id: 2,
        name: "i",
        style: "iStyle",
        affect: "ITALIC",
    },
    {
        id: 3,
        name: "u",
        style: "uStyle",
        affect: "UNDERLINE",
    },
    // {
    //     id: 4,
    //     name: "S",
    //     style: "sStyle",
    //     affect: "STRIKETHROUGH",
    // },
    {
        id: 4,
        name: "Hi",
        style: "sStye",
        affect: "hi",
    },
];

const InlineEditor = (props) => {
    const { getEditorState, setEditorState } = props;

    const currentFocus = getEditorState().getSelection().getFocusKey();
    const inlineStyle = getEditorState().getCurrentInlineStyle(currentFocus);

    const onMouseDown = (e) => {
        e.preventDefault();
    };

    const handleClick = (affect) => {
        const editorState = getEditorState();
        setEditorState(RichUtils.toggleInlineStyle(editorState, affect));
    };

    return (
        <div className={styled.container} onMouseDown={onMouseDown}>
            {buttons.map((item) => (
                <div
                    className={`${styled.icon} ${styled[item.style]}`}
                    style={{
                        color:
                            inlineStyle.has(item.affect) && "rgb(35, 131, 226)",
                    }}
                    key={item.id}
                    onClick={() => handleClick(item.affect)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default InlineEditor;
