import React, { useState, useEffect, useRef } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";

import icon from "./icon.module.css";

const Icon = (props) => {
    const { logo, logos, iconRemoveClicked } = props;

    const [values, setValues] = useState(() => ({
        shown: false,
        selected: 1,
        logo: null,
        emojis: logos.find((item) => item.name === "Emojis"),
        icons: logos.find((item) => item.name === "Icons"),
    }));

    let ref = useRef(null);
    let inputRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (!ref.current.contains(event.target)) {
                setValues((prev) => ({
                    ...prev,
                    shown: false,
                }));
            }
        };

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleInputFocus = () => {
        const iconContainer = document.getElementById("icon-container");

        iconContainer.style.border = "1px solid #2383e2";
        iconContainer.style.boxShadow =
            "box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px";
    };

    const handleInputBlur = () => {
        inputRef.current.style.border = "1px solid #fff";
        inputRef.current.style.boxShadow = "none";
    };

    const handleRandomClicked = () => {
        const type =
            logos[0].content[1].content[
                Math.floor(Math.random() * logos[0].content[1].content.length)
            ];
        setValues((prev) => ({
            ...prev,
            logo: type,
        }));
    };

    return (
        <div className={icon.iconAbsoluteWrapper} ref={ref}>
            <div
                className={icon.iconContent}
                style={{
                    background: values.logo
                        ? `url(/Images/logos/emojis.png) ${
                              1.6949 * values.logo[(0, 0)]
                          }% ${1.6949 * values.logo[(0, 1)]}% / 5900% 5900%`
                        : `url(/Images/logos/emojis.png) ${
                              1.6949 * logo[(0, 0)]
                          }% ${1.6949 * logo[(0, 1)]}% / 5900% 5900%`,
                    pointerEvents: logo ? "auto" : "none",
                    cursor: logo ? "pointer" : "none",
                }}
                onClick={() =>
                    setValues((prev) => ({ ...prev, shown: !prev.shown }))
                }
            ></div>
            {values.shown && (
                <div className={icon.iconContainer}>
                    <div className={icon.options}>
                        {logos.map((item) => (
                            <div
                                key={item.id}
                                className={icon.option}
                                onClick={() =>
                                    setValues((prev) => ({
                                        ...prev,
                                        selected: item.id,
                                    }))
                                }
                            >
                                <span>{item.name}</span>
                                {values.selected === item.id && (
                                    <div className={icon.active}></div>
                                )}
                            </div>
                        ))}
                        <div style={{ flexShrink: "1", flexGrow: "1" }}></div>
                        <div
                            className={icon.option}
                            onClick={iconRemoveClicked}
                        >
                            Remove
                        </div>
                    </div>
                    <div className={icon.search}>
                        <div
                            className={icon.input}
                            ref={inputRef}
                            id="icon-container"
                        >
                            <span className={icon.inputSearchIcon}>
                                <AiOutlineSearch />
                            </span>
                            <input
                                type="text"
                                className={icon.inputBox}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Filter..."
                                autoFocus
                            />
                        </div>
                        <div className={icon.random}>
                            <span className={icon.randomIcon}>
                                <FaRandom onClick={handleRandomClicked} />
                            </span>
                        </div>
                    </div>
                    {values.selected === "6369372c983b686842790c12" && (
                        <div className={icon.logoContainer}>
                            {values.emojis.content.map((emoji) => {
                                if (emoji.content.length > 0) {
                                    return (
                                        <div
                                            key={emoji.id}
                                            className={icon.type}
                                        >
                                            <div className={icon.typeName}>
                                                {emoji.name}
                                            </div>
                                            <div className={icon.icons}>
                                                {emoji.content.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className={
                                                                icon.iconCon
                                                            }
                                                            onClick={() => {
                                                                setValues(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        logo: item,
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            <div
                                                                className={
                                                                    icon.icon
                                                                }
                                                                style={{
                                                                    background: `url(/Images/logos/emojis.png) ${
                                                                        1.6949 *
                                                                        item[0]
                                                                    }% ${
                                                                        1.6949 *
                                                                        item[1]
                                                                    }% / 5900% 5900%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={emoji.id}
                                        style={{ display: "absolute" }}
                                    ></div>
                                );
                            })}
                        </div>
                    )}
                    {values.selected === "636938db983b686842790c18" && (
                        <div className={icon.logoContainer}>
                            {values.icons.content.map((iconItem) => {
                                if (iconItem.content.length > 0) {
                                    return (
                                        <div
                                            key={iconItem.id}
                                            className={icon.type}
                                        >
                                            <div className={icon.typeName}>
                                                {iconItem.name}
                                            </div>
                                            <div className={icon.icons}>
                                                {iconItem.content.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className={
                                                                icon.iconCon
                                                            }
                                                            onClick={() => {
                                                                setValues(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        logo: item,
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            <div
                                                                className={
                                                                    icon.icon
                                                                }
                                                                style={{
                                                                    background: `url(/Images/logos/icons.png) ${
                                                                        item[0] *
                                                                        5.3
                                                                    }% ${
                                                                        item[1] *
                                                                        16.5888
                                                                    }% / 3300% 1100%`,
                                                                    width: "20px",
                                                                    height: "20px",
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={iconItem.id}
                                        style={{ display: "absolute" }}
                                    ></div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Icon;
