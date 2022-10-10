import { Check, KeyboardArrowDown } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

const BLOCK_TYPES = [
    { label: "Text", style: "unstyled", img: "Text.png" },
    { label: "Heading 1", style: "header-one", img: "Heading-1.png" },
    { label: "Heading 2", style: "header-two", img: "Heading-2.png" },
    { label: "Heading 3", style: "header-three", img: "Heading-3.png" },
    // { label: "Heading 4", style: "header-four" },
    // { label: "Heading 5", style: "header-five" },
    // { label: "Heading 6", style: "header-six" },
    // { label: "Blockquote", style: "blockquote" },
    {
        label: "Bulleted List",
        style: "unordered-list-item",
        img: "Bulleted-List.png",
    },
    {
        label: "Numbered List",
        style: "ordered-list-item",
        img: "Numbered-List.png",
    },
    // { label: "Code Block", style: "code-block" },
];

const StyledInlineButton = styled("button")({
    fontSize: "16px",
    backgroundColor: "inherit",
    border: "none",
    fontWeight: 400,
    ":hover": {
        cursor: "pointer",
        backgroundColor: "rgb(55, 53, 47, 0.2)",
    },
});

const StyleButton = (props) => {
    const { label, style, onToggle, active, img } = props;

    return (
        <StyledInlineButton
            onMouseDown={(e) => {
                e.preventDefault();
                onToggle(style);
            }}
            style={{
                color: active ? "#007fff" : "#000",
                width: "100%",
            }}
        >
            <Stack
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack direction="row" gap={1} alignItems="center">
                    <img
                        src={`images/${img}`}
                        alt={style}
                        loading="lazy"
                        width="40px"
                    />
                    <span>{label}</span>
                </Stack>
                {active && <Check />}
            </Stack>
        </StyledInlineButton>
    );
};

const StyleBlock = (props) => {
    const { onToggle, editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    const [isShown, setIsShown] = useState(false);

    return (
        <Stack
            direction="row"
            sx={{
                borderRight: "1px solid grey",
                position: "relative",
                ":hover": { cursor: "pointer" },
            }}
            // onMouseEnter={() => setIsShown(true)}
            // onMouseLeave={() => setIsShown(false)}
        >
            <Typography onClick={() => setIsShown(!isShown)}>
                Turn Into
            </Typography>
            <KeyboardArrowDown
                onClick={() => setIsShown(!isShown)}
                sx={{ color: "rgba(0,0,0,0.3)" }}
            />
            {isShown && (
                <Paper
                    style={{
                        position: "absolute",
                        top: "44px",
                        left: "-10px",
                        padding: "8px 12px",
                        width: "180px",
                    }}
                >
                    {BLOCK_TYPES.map((item) => (
                        <div key={item.label}>
                            <StyleButton
                                active={item.style === blockType}
                                label={item.label}
                                onToggle={onToggle}
                                style={item.style}
                                img={item.img}
                            />
                        </div>
                    ))}
                </Paper>
            )}
        </Stack>
    );
};

export default StyleBlock;

// {isShown && (
//     <>
//         {BLOCK_TYPES.map((item) => (
//             <StyleButton
//                 key={item.label}
//                 active={item.style === blockType}
//                 label={item.label}
//                 onToggle={onToggle}
//                 style={item.style}
//             />
//         ))}
//     </>
// )}
