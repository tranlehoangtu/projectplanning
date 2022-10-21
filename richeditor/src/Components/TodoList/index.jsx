import {
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
    convertToRaw,
} from "draft-js";
import React, { useState } from "react";
import { Map } from "immutable";

import "./styles.css";
import TodoBlock from "./TodoBlock";

const TODO_BLOCK = "todo";

const blockRenderMap = Map({
    [TODO_BLOCK]: {
        element: "div",
    },
}).merge(DefaultDraftBlockRenderMap);

const blockStyleFn = (block) => {
    switch (block.getType()) {
        case TODO_BLOCK:
            return "block-todo";
        default:
            return "";
    }
};

const myBlockRenderer = (contentBlock, editorState, setEditorState) => {
    const type = contentBlock.getType();
    if (type === TODO_BLOCK) {
        return {
            component: TodoBlock,
            // editable: false,
            props: {
                editorState,
                setEditorState,
            },
        };
    }
};

const TodoList = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, TODO_BLOCK));
    };

    const handleContentClick = () => {
        // var selectionState = editorState.getSelection();

        // var anchorKey = selectionState.getAnchorKey();
        // var currentContent = editorState.getCurrentContent();
        // var currentContentBlock = currentContent.getBlockForKey(anchorKey);
        // var start = selectionState.getStartOffset();
        // var end = selectionState.getEndOffset();
        // var selectedText = currentContentBlock.getText().slice(start, end);
        // const selection = editorState.getSelection().merge({
        //     anchorKey,
        //     anchorOffset: 0,

        //     focusOffset: currentContentBlock.getText().length,
        //     focusKey: currentContent.getLastBlock().getKey(),
        // });

        // let newEditorState = EditorState.acceptSelection(
        //     editorState,
        //     selection
        // );
        // newEditorState = EditorState.forceSelection(
        //     newEditorState,
        //     newEditorState.getSelection()
        // );

        // setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));

        // console.log(convertToRaw(editorState.getCurrentContent()));

        const currentContent = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);

        const selection = editorState.getSelection().merge({
            anchorKey: anchorKey,
            anchorOffset: 0,

            focusKey: anchorKey,
            focusOffset: currentContentBlock.getText().length,
        });
        const obj = {
            currentContent,
            selectionState,
            anchorKey,
            currentContentBlock,
        };

        console.log(anchorKey);
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    const headerClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
    };

    return (
        <div>
            <button onClick={handleClick} style={{ display: "inline-block" }}>
                ToggleTodoBlock
            </button>
            <button onClick={headerClick} style={{ display: "inline-block" }}>
                ToggleHeader
            </button>
            <button
                onClick={handleContentClick}
                style={{ display: "inline-block" }}
            >
                Show Content
            </button>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                blockRenderMap={blockRenderMap}
                blockStyleFn={blockStyleFn}
                blockRendererFn={(contentBlock) =>
                    myBlockRenderer(contentBlock, editorState, setEditorState)
                }
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    );
};

export default TodoList;
