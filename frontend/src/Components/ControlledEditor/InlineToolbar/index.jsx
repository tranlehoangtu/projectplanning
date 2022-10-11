import React from "react";
import "./InlineToolbar.css";

const InlineButton = (props) => {
    const { style, className, label, handleClick, active, tooltip, name } =
        props;

    return (
        <div
            key={style}
            className={active ? `${className} active` : className}
            onClick={() => handleClick(style)}
        >
            {label}
            <span className="tooltip">
                <div>{name}</div>
                <div style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                    {tooltip}
                </div>
            </span>
        </div>
    );
};

const INLINE_STYLES = [
    {
        label: "B",
        style: "bold",
        className: "inline-bold",
        tooltip: "Ctrl+B",
        name: "Bold",
    },
    {
        label: "i",
        style: "italic",
        className: "inline-italic",
        tooltip: "Ctrl+I",
        name: "Italic",
    },
    {
        label: "U",
        style: "underline",
        className: "inline-underline",
        tooltip: "Ctrl+U",
        name: "Underline",
    },
    {
        label: "S",
        style: "strikethrough",
        className: "inline-strike-through",
        tooltip: "Ctrl+Unknown",
        name: "Strike-through",
    },
];

const InlineToolbar = (props) => {
    const { onChange, currentState } = props;

    const handleClick = (style) => {
        onChange(style);
    };

    return (
        <div className="inline-container">
            {INLINE_STYLES.map((item) => (
                <InlineButton
                    key={item.style}
                    style={item.style}
                    className={item.className}
                    label={item.label}
                    tooltip={item.tooltip}
                    active={currentState[item.style]}
                    handleClick={handleClick}
                    name={item.name}
                />
            ))}
        </div>
    );
};

export default InlineToolbar;
