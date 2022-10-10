import { Check, KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import "./BlockToolbar.css";

const BLOCK_STYLES = [
    { label: "Text", style: "Normal", url: "/Images/Text.png" },
    { label: "Heading 1", style: "H1", url: "/Images/Heading-1.png" },
    { label: "Heading 2", style: "H2", url: "/Images/Heading-2.png" },
    { label: "Heading 3", style: "H3", url: "/Images/Heading-3.png" },
];
const BlockToolbar = (props) => {
    const { expanded, onExpandEvent, currentState, onChange } = props;

    const getCurrentBlockStyle = () => {
        return BLOCK_STYLES.find(
            (block) => block.style === currentState.blockType
        );
    };

    return (
        <div
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="block-container"
            className="block-container"
        >
            <div className="block-dropdown" onClick={onExpandEvent}>
                <span>
                    {getCurrentBlockStyle()
                        ? getCurrentBlockStyle().label
                        : "Text"}
                </span>
                <KeyboardArrowDown />
            </div>
            {expanded && (
                <div className={`block-item-container ${expanded && "show"}`}>
                    <div className="block-item-sub">TURN INTO</div>
                    <div className="block-item-data">
                        {BLOCK_STYLES.map((item) => (
                            <div
                                className="block-item"
                                key={item.label}
                                onClick={() => onChange(item.style)}
                            >
                                <div className="block-item-head">
                                    <img src={item.url} alt={item.label} />
                                    {item.label}
                                </div>
                                {item.style === currentState.blockType && (
                                    <div className="block-item-foot">
                                        <Check />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlockToolbar;
