import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    StrikethroughS,
} from "@mui/icons-material";
import React from "react";
import StyleButton from "../StyleButton";

const INLINE_STYLES = [
    { label: <FormatBold />, style: "BOLD" },
    { label: <FormatItalic />, style: "ITALIC" },
    { label: <FormatUnderlined />, style: "UNDERLINE" },
    { label: <StrikethroughS />, style: "STRIKETHROUGH" },
    // { label: "Monospace", style: "CODE" },
];

const StyleInline = (props) => {
    const { onToggle, editorState } = props;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div>
            {INLINE_STYLES.map((item, index) => (
                <StyleButton
                    key={index}
                    active={currentStyle.has(item.style)}
                    label={item.label}
                    onToggle={onToggle}
                    style={item.style}
                />
            ))}
        </div>
    );
};

export default StyleInline;
