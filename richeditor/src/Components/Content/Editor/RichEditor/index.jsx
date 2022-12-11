import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    convertFromRaw,
    EditorState,
    getDefaultKeyBinding,
    KeyBindingUtil,
    RichUtils,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";

// Instances
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";

// Build in Styles
import "../../../../../node_modules/@draft-js-plugins/inline-toolbar/lib/plugin.css";

// Styles
import editorStyles from "./editorStyles.module.css";
import styled from "./richEditor.module.css";

// Component
import InlineStyles from "./InlineStyles";
import DropdownStyles from "./DropdownStyles";
import TodoBlock from "./DropdownStyles/TodoBlock";
import ToggleHeading from "./DropdownStyles/ToggleHeading";

import { customStyleMaps } from "./customStyleMaps";
import { useContext } from "react";
import { ProjectContext } from "../../../../Context/ProjectContext";

// const text =
//     "In this editor a toolbar shows up once you select part of the text ...";

// Block Style Map
const BLOCK_STYLE = [
    { name: "quote-block", style: styled.quoteBlock },
    { name: "header-three", style: styled.header3 },
    { name: "caption", style: styled.caption },
    { name: "unstyled", style: styled.unstyled },
    { name: "unordered-list-item", style: styled.unor },
    { name: "ordered-list-item", style: styled.oor },
];
const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();

    const blockType = BLOCK_STYLE.find((block) => block.name === type);

    if (blockType) return blockType.style;
};

const myBlockRenderer = (contentBlock, editorState, setEditorState) => {
    const type = contentBlock.getType();

    if (type === "todo") {
        return {
            component: TodoBlock,
            props: {
                editorState,
                setEditorState,
            },
        };
    }

    if (type === "toggle-heading-1") {
        return {
            component: ToggleHeading,
            props: {
                editorState,
                setEditorState,
            },
        };
    }
};

const { hasCommandModifier } = KeyBindingUtil;

const myKeyBindingFn = (e) => {
    if (e.keyCode && (e.altKey || hasCommandModifier(e))) {
        if (e.keyCode === 49 && (e.altKey || hasCommandModifier(e))) {
            return "ordered-list-item";
        } else if (e.keyCode === 56 && (e.altKey || hasCommandModifier(e))) {
            return "unordered-list-item";
        } else if (e.keyCode === 51 && (e.altKey || hasCommandModifier(e))) {
            return "header-three";
        } else if (e.keyCode === 190 && (e.altKey || hasCommandModifier(e))) {
            return "unstyled";
        } else if (e.keyCode === 72 && (e.altKey || hasCommandModifier(e))) {
            return "hi";
        } else if (e.keyCode === 188 && (e.altKey || hasCommandModifier(e))) {
            return "caption";
        } else if (e.keyCode === 83 && hasCommandModifier(e)) {
            return "save";
        } else if (e.keyCode === 68 && (e.altKey || hasCommandModifier(e))) {
            return "load";
        }
    }

    return getDefaultKeyBinding(e);
};

const RichEditor = (props) => {
    // const { handleSave } = props;

    // Save button

    const { project } = useContext(ProjectContext);

    const [plugins, InlineToolbar] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    }, []);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(project.state))
    );

    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(convertFromRaw(project.state))
        );
    }, [project.state]);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current?.focus();
    };

    // const selection = editorState.getSelection();
    // const anchorKey = selection.getAnchorKey();
    // const currentContent = editorState.getCurrentContent();
    // const currentBlock = currentContent.getBlockForKey(anchorKey);

    const handleKeyCommand = (command) => {
        switch (command) {
            case "ordered-list-item":
                setEditorState(
                    RichUtils.toggleBlockType(editorState, "ordered-list-item")
                );
                break;
            case "unordered-list-item":
                setEditorState(
                    RichUtils.toggleBlockType(
                        editorState,
                        "unordered-list-item"
                    )
                );
                break;
            case "header-three":
                setEditorState(
                    RichUtils.toggleBlockType(editorState, "header-three")
                );
                break;
            case "unstyled":
                setEditorState(
                    RichUtils.toggleBlockType(editorState, "unstyled")
                );
                break;
            case "hi":
                setEditorState(RichUtils.toggleInlineStyle(editorState, "hi"));
                break;
            case "caption":
                setEditorState(
                    RichUtils.toggleBlockType(editorState, "caption")
                );
                break;
            default:
                break;
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    return (
        <div className={editorStyles.editor} onClick={focus}>
            <Editor
                editorKey="RichEditor"
                editorState={editorState}
                onChange={onChange}
                customStyleMap={{
                    ...customStyleMaps.colorStyleMap,
                    ...customStyleMaps.backgroundStyleMap,
                    ...customStyleMaps.fontSizeMap,
                }}
                blockStyleFn={myBlockStyleFn}
                blockRendererFn={(contentBlock) =>
                    myBlockRenderer(contentBlock, editorState, setEditorState)
                }
                keyBindingFn={myKeyBindingFn}
                handleKeyCommand={handleKeyCommand}
                plugins={plugins}
                ref={(element) => {
                    editor.current = element;
                }}
            />
            <InlineToolbar>
                {(externalProps) => {
                    const InlineStylesProps = {
                        ...externalProps,
                        colorStyleMap: customStyleMaps.colorStyleMap,
                        backgroundStyleMap: customStyleMaps.backgroundStyleMap,
                        fontSizeMap: customStyleMaps.fontSizeMap,
                        fontFamilyMap: customStyleMaps.fontFamilyMap,
                    };
                    return (
                        <div className={styled.container}>
                            <DropdownStyles {...externalProps} />
                            <InlineStyles {...InlineStylesProps} />
                        </div>
                    );
                }}
            </InlineToolbar>
        </div>
    );
};

export default RichEditor;
