import { KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import "./ColorPickerToolbar.css";

const COLOR_STYLES = [
    {
        label: "Default",
        style: "#37352F",
    },
    {
        label: "Gray",
        style: "#787774",
    },
    {
        label: "Brown",
        style: "#9F6B53",
    },
    {
        label: "Orange",
        style: "#D9730D",
    },
    {
        label: "Yellow",
        style: "#CB912F",
    },
    {
        label: "Green",
        style: "#448361",
    },
    {
        label: "Blue",
        style: "#337EA9",
    },
    {
        label: "Purple",
        style: "#9065B0",
    },
    {
        label: "Pink",
        style: "#C14C8A",
    },
    {
        label: "Red",
        style: "#D44C47",
    },
];

const BACKGROUND_STYLES = [
    {
        label: "Default background",
        style: "#ffffff",
    },
    {
        label: "Gray background",
        style: "#f1f1ef",
    },
    {
        label: "Brown background",
        style: "#f4eeee",
    },
    {
        label: "Orange background",
        style: "#fbecdd",
    },
    {
        label: "Yellow background",
        style: "#fbf3db",
    },
    {
        label: "Green background",
        style: "#edf3ec",
    },
    {
        label: "Blue background",
        style: "#e7f3f8",
    },
    {
        label: "Purple background",
        style: "#f6f3f9",
    },
    {
        label: "Pink background",
        style: "#faf1f5",
    },
    {
        label: "Red background",
        style: "#fdebec",
    },
];

const ColorPickerToolbar = (props) => {
    const { onChange, expanded, onExpandEvent } = props;

    return (
        <div
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="colorpicker-container"
            className="colorpicker-container"
        >
            <div className="colorpicker-dropdown" onClick={onExpandEvent}>
                <span>A</span>
                <KeyboardArrowDown />
            </div>
            {expanded && (
                <div
                    className={`colorpicker-item-container ${
                        expanded && "show"
                    }`}
                >
                    <div className="colorpicker-item-sub">COLOR</div>
                    <div className="colorpicker-item-data">
                        {COLOR_STYLES.map((item) => (
                            <div
                                className="colorpicker-item"
                                key={item.label}
                                onClick={() => onChange("color", item.style)}
                            >
                                <div className="colorpicker-item-head">
                                    <span style={{ color: item.style }}>A</span>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="colorpicker-item-sub"
                        style={{ marginTop: "22px" }}
                    >
                        BACKGROUND
                    </div>
                    <div className="colorpicker-item-data">
                        {BACKGROUND_STYLES.map((item) => (
                            <div
                                className="colorpicker-item"
                                key={item.label}
                                onClick={() => onChange("bgcolor", item.style)}
                            >
                                <div className="colorpicker-item-head">
                                    <span
                                        style={{ backgroundColor: item.style }}
                                    >
                                        A
                                    </span>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPickerToolbar;
