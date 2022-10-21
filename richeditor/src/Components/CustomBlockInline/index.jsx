import React, { useEffect, useMemo, useRef, useState } from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
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
import { RichUtils } from "draft-js";

const BLOCK_STYLE = [
    { name: "blockquote", style: blockStyles.styleBlockQuote },
    { name: "header-three", style: "style-header-three" },
    { name: "unordered-list-item", style: blockStyles.styleUnorderedListItem },
    { name: "ordered-list-item", style: "style-ordered-list-item" },
];

const MediaComponent = (props) => {
    console.log(props);
    return <div>asd</div>;
};

const myBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "atomic") {
        return {
            component: MediaComponent,
            editable: false,
            props: {
                foo: "bar",
            },
        };
    }
};

const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();

    const blockType = BLOCK_STYLE.find((block) => block.name === type);

    if (blockType) return blockType.style;
};

const text =
    "In this editor a toolbar shows up once you select part of the text …";

const CustomBlockInline = () => {
    const [plugins, InlineToolbar] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    }, []);

    const [editorState, setEditorState] = useState(() =>
        createEditorStateWithText("")
    );

    useEffect(() => {
        setEditorState(createEditorStateWithText(text));
    }, []);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current?.focus();
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

    const handleClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, "atomic"));
    };

    return (
        <div className={editorStyles.editor} onClick={focus}>
            <button onClick={handleClick}>Click Me</button>
            <Editor
                editorKey="CustomBlockInline"
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={myBlockStyleFn}
                blockRendererFn={myBlockRenderer}
                plugins={plugins}
                ref={(element) => {
                    editor.current = element;
                }}
            />
            <InlineToolbar style={{ padding: 0, margin: 0 }}>
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
