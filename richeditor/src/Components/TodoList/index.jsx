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

const myBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === TODO_BLOCK) {
        return {
            component: TodoBlock,
            // editable: false,
            props: {
                foo: "bar",
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
            // anchorKey,
            // anchorOffset: 0,

            // focusOffset: currentContentBlock.getText().length,
            focusKey: "7b8up",
        });

        const newState = EditorState.forceSelection(editorState, selection);

        // setEditorState(RichUtils.toggleInlineStyle(newState, "BOLD"));

        setEditorState(newState);

        const obj = {
            currentContent,
            selectionState,
            anchorKey,
            currentContentBlock,
        };

        console.log(obj.selectionState.getAnchorKey());
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
                blockRendererFn={myBlockRenderer}
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    );
};

export default TodoList;
