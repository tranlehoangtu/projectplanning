import React from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import { useState } from "react";
import { useEffect } from "react";

import editorStyles from "./editorStyles.module.css";
import "../../node_modules/@draft-js-plugins/side-toolbar/lib/plugin.css";
import { useRef } from "react";

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [sideToolbarPlugin];
const text =
    "Once you click into the text field the sidebar plugin will show up ...";

const SimpleSideToolbarEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        createEditorStateWithText(text)
    );

    const editor = useRef(null);

    useEffect(() => {
        setEditorState(createEditorStateWithText(text));
    }, []);

    const focus = () => {
        editor.current?.focus();
    };

    return (
        <div
            className={editorStyles.editor}
            onClick={focus}
            style={{ padding: "100px" }}
        >
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                plugins={plugins}
                ref={(element) => {
                    editor.current = element;
                }}
            />
            <SideToolbar>
                {(externalProps) => (
                    <div>
                        <h1>Hello World</h1>
                    </div>
                )}
            </SideToolbar>
        </div>
    );
};

export default SimpleSideToolbarEditor;
