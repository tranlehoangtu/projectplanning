import { EditorBlock } from "draft-js";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const ToggleHeading = (props) => {
    // const { blockProps } = props;

    const [drop, setDrop] = useState(true);

    return (
        <div style={{ color: "red" }}>
            <div onClick={() => setDrop(!drop)}>
                <AiFillCaretDown />
            </div>
            {drop && <EditorBlock {...props} />}
        </div>
    );
};

export default ToggleHeading;
