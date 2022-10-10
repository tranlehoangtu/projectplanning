import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    StrikethroughS,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledInlineButton = styled("button")({
    backgroundColor: "inherit",
    border: "none",
    padding: "6px 4px 0 4px",
    fontWeight: 400,
    ":hover": {
        cursor: "pointer",
        backgroundColor: "rgb(55, 53, 47, 0.2)",
    },
});

const StyleButton = (props) => {
    const { label, style, onToggle, active } = props;

    return (
        <StyledInlineButton
            onMouseDown={(e) => {
                e.preventDefault();
                onToggle(style);
            }}
            style={{ color: active ? "#007fff" : "#000" }}
        >
            {label}
        </StyledInlineButton>
    );
};

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
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ display: "inline-block" }}
        >
            {INLINE_STYLES.map((item, index) => (
                <StyleButton
                    key={index}
                    active={currentStyle.has(item.style)}
                    label={item.label}
                    onToggle={onToggle}
                    style={item.style}
                />
            ))}
        </Stack>
    );
};

export default StyleInline;
