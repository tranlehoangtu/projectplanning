import { KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import "./BlockToolbar.css";

const BLOCK_STYLES = [
    { label: "Heading 1", style: "H1" },
    { label: "Heading 2", style: "H2" },
    { label: "Heading 3", style: "H3" },
];
const BlockToolbar = (props) => {
    const { expanded, onExpandEvent, currentState, onChange } = props;

    console.log({ expanded, onExpandEvent, currentState, onChange });

    return (
        <div>
            <div>
                {/* {
                    BLOCK_STYLES.find(
                        (block) => block.style === currentState.blockType
                    ).label
                } */}
                <KeyboardArrowDown />
            </div>
            {expanded &&
                BLOCK_STYLES.map((item) => (
                    <div className="block-item" key={item.label}>
                        {item.label}
                    </div>
                ))}
        </div>
    );
};

export default BlockToolbar;
