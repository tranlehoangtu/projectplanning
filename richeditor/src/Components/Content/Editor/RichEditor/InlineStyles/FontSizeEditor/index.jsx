// Reacts
import { EditorState, Modifier, RichUtils } from "draft-js";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";

// Styles
import styledFontSize from "./fontSize.module.css";

const FONT_SIZES = [
    { label: "8", style: "f8", fontSize: "8px" },
    { label: "9", style: "f9", fontSize: "9px" },
    { label: "10", style: "f10", fontSize: "10px" },
    { label: "11", style: "f11", fontSize: "11px" },
    { label: "12", style: "f12", fontSize: "12px" },
    { label: "14", style: "f14", fontSize: "14px" },
    { label: "16", style: "f16", fontSize: "16px" },
    { label: "18", style: "f18", fontSize: "18px" },
    { label: "20", style: "f20", fontSize: "20px" },
    { label: "22", style: "f22", fontSize: "22px" },
    { label: "24", style: "f24", fontSize: "24px" },
];

const Dropdown = (props) => {
    const { setDropdown, toggleFontSize, fontSizeRef } = props;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                fontSizeRef.current &&
                !fontSizeRef.current.contains(event.target)
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
    }, [fontSizeRef, setDropdown]);

    return (
        <div className={styledFontSize.dropdownItems}>
            <div className={styledFontSize.dropdownItem}>
                {FONT_SIZES.length > 0 && (
                    <>
                        {FONT_SIZES.map((item) => (
                            <div
                                key={item.label}
                                onClick={() => toggleFontSize(item)}
                                className={styledFontSize.colorItem}
                            >
                                <div>{item.label}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

const FontSizeEditor = (props) => {
    const { getEditorState, fontSizeMap, setEditorState } = props;

    const [dropdown, setDropdown] = useState(false);
    const fontSizeRef = useRef(null);

    const currentFocus = getEditorState().getSelection().getFocusKey();
    const inlineStyle = getEditorState().getCurrentInlineStyle(currentFocus);

    const toggleFontSize = (fontSized) => {
        const editorState = getEditorState();
        const selection = editorState.getSelection();

        const nextContentState = Object.keys(fontSizeMap).reduce(
            (contentState, fontSize) => {
                return Modifier.removeInlineStyle(
                    contentState,
                    selection,
                    fontSize
                );
            },
            editorState.getCurrentContent()
        );
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            "change-inline-style"
        );
        const currentStyle = editorState.getCurrentInlineStyle();
        if (!currentStyle.has(fontSized.style)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                fontSized.style
            );
        }
        setDropdown(false);
        setEditorState(nextEditorState);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            className={styledFontSize.container}
            ref={fontSizeRef}
        >
            <div
                className={styledFontSize.currentStyle}
                onClick={() => setDropdown(!dropdown)}
            >
                <div className={styledFontSize.sub}>
                    {FONT_SIZES.find((fontsize) =>
                        inlineStyle.has(fontsize.style)
                    )
                        ? FONT_SIZES.find((fontsize) =>
                              inlineStyle.has(fontsize.style)
                          ).label
                        : "18"}
                </div>
                <AiOutlineDown />
            </div>

            {dropdown && (
                <Dropdown
                    setDropdown={setDropdown}
                    toggleFontSize={toggleFontSize}
                    fontSizeMap={fontSizeMap}
                    inlineStyle={inlineStyle}
                    fontSizeRef={fontSizeRef}
                />
            )}
        </div>
    );
};

export default FontSizeEditor;
