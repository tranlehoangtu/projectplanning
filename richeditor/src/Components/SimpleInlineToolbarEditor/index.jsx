import React, { useEffect, useMemo, useRef, useState } from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";

import editorStyles from "./editorStyles.module.css";
import "../../../node_modules/@draft-js-plugins/inline-toolbar/lib/plugin.css";
import {
    BoldButton,
    HeadlineThreeButton,
    ItalicButton,
    OrderedListButton,
    UnderlineButton,
    UnorderedListButton,
} from "@draft-js-plugins/buttons";
import { RichUtils } from "draft-js";

import "./BlockStyles.css";

function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
        return "superFancyBlockquote";
    }
    if (type === "header-three") {
        return "header-three";
    }
}

const CustomButton = (props) => {
    const { getEditorState, setEditorState } = props;

    const onMouseDown = (event) => event.preventDefault();
    const onClick = () => {
        const editorState = getEditorState();
        console.log("hello");
        setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
    };

    return (
        <div
            onMouseDown={onMouseDown}
            // className={editorStyles.headlineButtonWrapper}
        >
            <button
                onClick={onClick}
                // className={editorStyles.headlineButton}
            >
                H
            </button>
        </div>
    );
};

const text =
    "In this editor a toolbar shows up once you select part of the text …";

const SimpleInlineToolbarEditor = () => {
    const [plugins, InlineToolbar] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    }, []);

    const [editorState, setEditorState] = useState(() =>
        createEditorStateWithText("")
    );

    useEffect(() => {
        // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
        setEditorState(createEditorStateWithText(text));
    }, []);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current?.focus();
    };

    const handleClick = (e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, "header-three"));
    };

    return (
        <div className={editorStyles.editor} onClick={focus}>
            <button onClick={handleClick}>Click ME</button>
            <Editor
                // editorKey="SimpleInlineToolbarEditor"
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={myBlockStyleFn}
                plugins={plugins}
                ref={(element) => {
                    editor.current = element;
                }}
            />
            <InlineToolbar>
                {(externalProps) => (
                    <>
                        <HeadlineThreeButton {...externalProps} />
                        <UnorderedListButton {...externalProps} />
                        <OrderedListButton {...externalProps} />
                        <BoldButton {...externalProps} />
                        <ItalicButton {...externalProps} />
                        <UnderlineButton {...externalProps} />
                        <CustomButton {...externalProps} />
                    </>
                )}
            </InlineToolbar>
        </div>
    );
};

export default SimpleInlineToolbarEditor;
