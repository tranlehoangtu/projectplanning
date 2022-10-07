import React, { useEffect, useState } from "react";
import { convertFromRaw, Editor, EditorState, RichUtils } from "draft-js";
import { Button, Stack } from "@mui/material";
import { getBlock } from "../../Services/getMapping";

const StyleButton = (props) => {
    const { label, style, onToggle, active } = props;

    return (
        <Button
            variant={active ? "contained" : "outlined"}
            onMouseDown={(e) => {
                e.preventDefault();
                onToggle(style);
            }}
        >
            {label}
        </Button>
    );
};

const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
];

const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" },
];

const InlineStyleControls = (props) => {
    const { onToggle, editorState } = props;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div>
            {INLINE_STYLES.map((item, index) => (
                <StyleButton
                    key={index}
                    active={currentStyle.has(item.style)}
                    label={item.label}
                    onToggle={onToggle}
                    style={item.style}
                />
            ))}
        </div>
    );
};

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

const ControlledEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return "handled";
        }

        return "not-handled";
    };

    return (
        <Stack>
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <Stack sx={{ padding: "6px", bgcolor: "lightblue" }}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                />
            </Stack>
        </Stack>
    );
};

export default ControlledEditor;
