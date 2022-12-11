import { EditorBlock, EditorState } from "draft-js";
import React from "react";

const updateDataOfBlock = (editorState, block, newData) => {
    const contentState = editorState.getCurrentContent();
    const newBlock = block.merge({
        data: newData,
    });
    const newContentState = contentState.merge({
        blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
    });
    return EditorState.push(editorState, newContentState, "change-block-type");
};

const TodoBlock = (props) => {
    const data = props.block.getData();
    const checked = data.get("checked") === true;

    console.log("here");
    const updateData = () => {
        const { block, blockProps } = props;

        // This is the reason we needed a higher-order function for blockRendererFn
        const { onChange, getEditorState } = blockProps;
        const data = block.getData();
        const checked = data.has("checked") && data.get("checked") === true;
        const newData = data.set("checked", !checked);
        onChange(updateDataOfBlock(getEditorState(), block, newData));
    };

    return (
        <div className={checked ? "block-todo-completed" : ""}>
            <input type="checkbox" checked={checked} onChange={updateData} />
            <EditorBlock {...props} />
        </div>
    );
};

export default TodoBlock;
