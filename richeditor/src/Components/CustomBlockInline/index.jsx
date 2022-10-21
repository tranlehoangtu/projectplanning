import React, { useMemo, useRef, useState } from "react";
import Editor from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";

// import {
//     BlockquoteButton,
//     BoldButton,
//     HeadlineThreeButton,
//     ItalicButton,
//     OrderedListButton,
//     UnderlineButton,
//     UnorderedListButton,
// } from "@draft-js-plugins/buttons";
import {
    StyledBlockQuote,
    StyledItalic,
    StyledStrikeThrough,
    StyledBold,
    StyledUnderline,
    StyledText,
} from "./StyledButtons";

import editorStyles from "./editorStyles.module.css";
import "../../../node_modules/@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "./styles.css";
import blockStyles from "./blockStyles.module.css";
import { EditorState } from "draft-js";
import StyledTodoBlock from "./StyledButtons/BlockStyle/StyledTodoBlock";

const BLOCK_STYLE = [
    { name: "blockquote", style: blockStyles.styleBlockQuote },
    { name: "header-three", style: "style-header-three" },
    { name: "unordered-list-item", style: blockStyles.styleUnorderedListItem },
    { name: "ordered-list-item", style: "style-ordered-list-item" },
    { name: "todo", style: "todo-block" },
    { name: "unstyled", style: "style-unstyle" },
];

const myBlockRenderer = (contentBlock, editorState, setEditorState) => {
    const type = contentBlock.getType();
    console.log("type: " + type);
    if (type === "todo") {
        return {
            component: StyledTodoBlock,
            // editable: false,
            props: {
                editorState,
                setEditorState,
            },
        };
    }
};
const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();

    const blockType = BLOCK_STYLE.find((block) => block.name === type);

    if (blockType) return blockType.style;
};

const CustomBlockInline = () => {
    const [plugins, InlineToolbar] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    }, []);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    // useEffect(() => {
    //     setEditorState(createEditorStateWithText(text));
    // }, []);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    // const getCurrentBlockType = () => {
    //     // const selection = editorState.getSelection();
    //     // const blockType = editorState
    //     //     .getCurrentContent()
    //     //     .getBlockForKey(selection.getStartKey())
    //     //     .getDepth();

    //     // return blockType;
    //     const contentState = editorState.getCurrentContent();
    //     const blockMap = contentState.getBlockMap();
    //     // const blocks = blockMap
    //     //     .filter((block) => block.getDepth() > MAX_LIST_DEPTH)
    //     //     .map((block) => block.set("depth", MAX_LIST_DEPTH));

    //     blockMap.map((item) => console.log(item));
    // };

    return (
        <div className={editorStyles.editor}>
            <Editor
                editorKey="CustomBlockInline"
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={myBlockStyleFn}
                blockRendererFn={(contentBlock) =>
                    myBlockRenderer(contentBlock, editorState, setEditorState)
                }
                plugins={plugins}
                ref={(element) => {
                    editor.current = element;
                }}
            />
            <InlineToolbar
                style={{ padding: 0, margin: 0, whiteSpace: "nowrap" }}
            >
                {(externalProps) => (
                    <>
                        <StyledText {...externalProps} />
                        <StyledBold {...externalProps} />
                        <StyledItalic {...externalProps} />
                        <StyledUnderline {...externalProps} />
                        <StyledStrikeThrough {...externalProps} />
                        <StyledBlockQuote {...externalProps} />
                    </>
                )}
            </InlineToolbar>
        </div>
    );
};

export default CustomBlockInline;
