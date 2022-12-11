import React, { useState } from "react";

// DraftJS
import { EditorState, Modifier, RichUtils } from "draft-js";

// Styles
import colorStyled from "./color.module.css";

// icons
import { AiOutlineCheck, AiOutlineDown } from "react-icons/ai";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";

var COLORS = [
    { label: "Default", style: "default", color: "inherit" },
    { label: "Gray", style: "gray", color: "rgb(120, 119, 116)" },
    { label: "Brown", style: "brown", color: "rgb(159, 107, 83)" },
    { label: "Orange", style: "orange", color: "rgb(217, 115, 13)" },
    { label: "Yellow", style: "yellow", color: "rgb(203, 145, 47)" },
    { label: "Green", style: "green", color: "rgb(68, 131, 97)" },
    { label: "Blue", style: "blue", color: "rgb(51, 126, 169)" },
    { label: "Purple", style: "purple", color: "rgb(144, 101, 176)" },
    { label: "Pink", style: "pink", color: "rgb(193, 76, 138)" },
    { label: "Red", style: "red", color: "rgb(212, 76, 71)" },
];

var BACKGROUNDS = [
    {
        label: "Default background",
        style: "default background",
        color: "inherit",
    },
    {
        label: "Gray background",
        style: "gray background",
        color: "rgb(241, 241, 239)",
    },
    {
        label: "Brown background",
        style: "brown background",
        color: "rgb(244, 238, 238)",
    },
    {
        label: "Orange background",
        style: "orange background",
        color: "rgb(251, 236, 221)",
    },
    {
        label: "Yellow background",
        style: "yellow background",
        color: "rgb(251, 243, 219)",
    },
    {
        label: "Green background",
        style: "green background",
        color: "rgb(237, 243, 236)",
    },
    {
        label: "Blue background",
        style: "blue background",
        color: "rgb(231, 243, 248)",
    },
    {
        label: "Purple background",
        style: "purple background",
        color: "rgba(244, 240, 247, 0.8)",
    },
    {
        label: "Pink background",
        style: "pink background",
        color: "rgba(249, 238, 243, 0.8)",
    },
    {
        label: "Red background",
        style: "red background",
        color: "rgb(253, 235, 236)",
    },
];

const Dropdown = (props) => {
    const { setDropdown, toggleColor, inlineStyle, wrapperRef, lastUseds } =
        props;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setDropdown(false);
            }
        }

        setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        });
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, setDropdown]);

    return (
        <div className={colorStyled.dropdownItems}>
            <div className={colorStyled.dropdownItem}>
                {lastUseds.length > 0 && (
                    <>
                        <div className={colorStyled.title}>Last Used</div>
                        {lastUseds.map((lastUsed) => (
                            <div
                                key={lastUsed.label}
                                onClick={() => toggleColor(lastUsed)}
                                className={colorStyled.colorItem}
                            >
                                <div
                                    className={colorStyled.avatar}
                                    style={{
                                        background:
                                            lastUsed.style.includes(
                                                "background"
                                            ) && lastUsed.color,
                                        color:
                                            !lastUsed.style.includes(
                                                "background"
                                            ) && lastUsed.color,
                                    }}
                                >
                                    A
                                </div>
                                <div className={colorStyled.label}>
                                    {lastUsed.label}
                                </div>
                                <div style={{ flex: 1 }}></div>
                            </div>
                        ))}
                    </>
                )}

                <div className={colorStyled.title}>Color</div>
                {COLORS.map((color) => (
                    <div
                        key={color.label}
                        onClick={() => toggleColor(color)}
                        className={colorStyled.colorItem}
                    >
                        <div
                            className={colorStyled.avatar}
                            style={{ color: color.color }}
                        >
                            A
                        </div>
                        <div className={colorStyled.label}>{color.label}</div>
                        <div style={{ flex: 1 }}></div>
                        <div>
                            {inlineStyle.has(color.style) && <AiOutlineCheck />}
                        </div>
                    </div>
                ))}
                <div className={colorStyled.title}>Background</div>
                {BACKGROUNDS.map((background) => (
                    <div
                        key={background.label}
                        onClick={() => toggleColor(background)}
                        className={colorStyled.colorItem}
                    >
                        <div
                            className={colorStyled.avatar}
                            style={{ background: background.color }}
                        >
                            A
                        </div>
                        <div className={colorStyled.label}>
                            {background.label}
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <div>
                            {inlineStyle.has(background.style) && (
                                <AiOutlineCheck />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ColorEditor = (props) => {
    const {
        getEditorState,
        setEditorState,
        colorStyleMap,
        backgroundStyleMap,
    } = props;

    const [dropdown, setDropdown] = useState(false);
    const [lastUseds, setLastUseds] = useState([]);

    const colorRef = useRef(null);

    const currentFocus = getEditorState().getSelection().getFocusKey();
    const inlineStyle = getEditorState().getCurrentInlineStyle(currentFocus);

    const currentColor = useMemo(
        () => ({
            color: COLORS.find((colorItem) =>
                Boolean(
                    inlineStyle.find(
                        (inlineItem) => inlineItem === colorItem.style
                    )
                )
            ),
            background: BACKGROUNDS.find((backgroundItem) =>
                Boolean(
                    inlineStyle.find(
                        (inlineItem) => inlineItem === backgroundItem.style
                    )
                )
            ),
        }),
        [inlineStyle]
    );

    const toggleColor = (toggledColor) => {
        if (
            !Boolean(
                lastUseds.find(
                    (lastUsed) => lastUsed.style === toggledColor.style
                )
            )
        ) {
            setLastUseds((prev) => [...prev, toggledColor]);
        }
        const editorState = getEditorState();
        const selection = editorState.getSelection();
        const isColor = Boolean(
            Object.keys(colorStyleMap).find(
                (item) => item === toggledColor.style
            )
        );
        const isBackgroundColor = Boolean(
            Object.keys(backgroundStyleMap).find(
                (item) => item === toggledColor.style
            )
        );
        let nextContentState = null;
        if (isColor) {
            nextContentState = Object.keys(colorStyleMap).reduce(
                (contentState, color) => {
                    return Modifier.removeInlineStyle(
                        contentState,
                        selection,
                        color
                    );
                },
                editorState.getCurrentContent()
            );
        }
        if (isBackgroundColor) {
            nextContentState = Object.keys(backgroundStyleMap).reduce(
                (contentState, color) => {
                    return Modifier.removeInlineStyle(
                        contentState,
                        selection,
                        color
                    );
                },
                editorState.getCurrentContent()
            );
        }
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            "change-inline-style"
        );
        const currentStyle = editorState.getCurrentInlineStyle();
        if (!currentStyle.has(toggledColor.style)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor.style
            );
        }
        setDropdown(false);
        setEditorState(nextEditorState);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            className={colorStyled.container}
            ref={colorRef}
        >
            <div
                className={colorStyled.currentStyle}
                onClick={() => setDropdown(!dropdown)}
            >
                <div
                    className={colorStyled.sub}
                    style={{
                        background:
                            Boolean(currentColor.background) &&
                            currentColor.background.color,
                        color:
                            Boolean(currentColor.color) &&
                            currentColor.color.color,
                    }}
                >
                    A
                </div>
                <AiOutlineDown />
            </div>
            {dropdown && (
                <Dropdown
                    setDropdown={setDropdown}
                    toggleColor={toggleColor}
                    colorStyleMap={colorStyleMap}
                    inlineStyle={inlineStyle}
                    wrapperRef={colorRef}
                    lastUseds={lastUseds}
                />
            )}
        </div>
    );
};

export default ColorEditor;
