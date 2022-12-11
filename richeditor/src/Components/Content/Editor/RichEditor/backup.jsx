import React, { useEffect, useRef, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState, RichUtils } from "draft-js";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createImagePlugin from "@draft-js-plugins/image";

// Styles
import "../../../../../node_modules/@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "../../../../../node_modules/@draft-js-plugins/image/lib/plugin.css";
import editorStyles from "./editorStyles.module.css";
import styled from "./richEditor.module.css";

// Component
import InlineStyles from "./InlineStyles";
import DropdownStyles from "./DropdownStyles";
import TodoBlock from "./DropdownStyles/TodoBlock";
import ToggleHeading from "./DropdownStyles/ToggleHeading";

import { customStyleMaps } from "./customStyleMaps";

const text =
    "In this editor a toolbar shows up once you select part of the text ...";

const initialState = {
    entityMap: {
        0: {
            type: "IMAGE",
            mutability: "IMMUTABLE",
            data: {
                src: "/Images/Buttons/Text.png",
            },
        },
    },
    blocks: [
        {
            key: "9gm3s",
            text: "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: "ov7r",
            text: " ",
            type: "atomic",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
                {
                    offset: 0,
                    length: 1,
                    key: 0,
                },
            ],
            data: {},
        },
        {
            key: "e23a8",
            text: "See advanced examples further down …",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
    ],
};

// Block Style Map
const BLOCK_STYLE = [
    { name: "quote-block", style: styled.quoteBlock },
    { name: "header-three", style: styled.header3 },
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

const inlineToolbarPlugin = createInlineToolbarPlugin();
const imagePlugin = createImagePlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, imagePlugin];

const RichEditor = (props) => {
    // const { state } = props;

    // const [plugins, InlineToolbar] = useMemo(() => {
    //     const inlineToolbarPlugin = createInlineToolbarPlugin();

    //     return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    // }, []);

    const [editorState, setEditorState] = useState(() =>
        // createEditorStateWithText("")
        EditorState.createEmpty()
    );

    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(convertFromRaw(initialState))
        );
        // setEditorState(createEditorStateWithText(text));
    }, []);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current?.focus();
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    console.log(convertToRaw(editorState.getCurrentContent()));

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
