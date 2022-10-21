import React from "react";
import { EditorBlock } from "draft-js";

import "./styles.css";

const TodoBlock = (props) => {
    return (
        <div>
            <input type="checkbox" />
            <EditorBlock {...props} />
        </div>
    );
};

export default TodoBlock;
