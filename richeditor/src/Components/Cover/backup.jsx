import React, { useState } from "react";

import popover from "./popover.module.css";

import { AiOutlineSearch } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";

const items = [
    {
        id: 1,
        position: [0, 0],
        name: "hihihaha",
    },
    {
        id: 2,
        position: [0, 2],
        name: "hihihaha",
    },
    {
        id: 3,
        position: [0, 3],
        name: "hihihaha",
    },
];

const Popover = (props) => {
    const [active, setAcitve] = useState(2);
    const [activated, setActivated] = useState(false);

    const { name, className } = props;
    return (
        <>
            <div className={popover.container}>
                <div className={`${popover.popoverName} ${className}`}>
                    {!activated ? (
                        <span onClick={() => setActivated(true)}>{name}</span>
                    ) : (
                        <div className={popover.popoverContainer}>
                            <div className={popover.popoverOptions}>
                                <div
                                    className={`${popover.popoverOption}`}
                                    onClick={() => setAcitve(1)}
                                >
                                    Emojs
                                    {1 === active && <span></span>}
                                </div>
                                <div
                                    className={popover.popoverOption}
                                    onClick={() => setAcitve(2)}
                                >
                                    Icons
                                    {2 === active && <span></span>}
                                </div>
                                <div
                                    style={{ flexShrink: 1, flexGrow: 1 }}
                                ></div>
                                <div className={popover.popoverOption}>
                                    Remove
                                </div>
                            </div>
                            <div className={popover.inputContainer}>
                                <div
                                    className={popover.input}
                                    onFocus={function () {
                                        console.log(this);
                                    }}
                                >
                                    <AiOutlineSearch />
                                    <input
                                        type="text"
                                        placeholder="Filter..."
                                    />
                                </div>
                                <div className={popover.faRandom}>
                                    <FaRandom />
                                </div>
                            </div>
                            <div className={popover.popoverIconContainer}>
                                <div
                                    className={
                                        popover.popoverIconContainerTitle
                                    }
                                >
                                    RECENT
                                </div>
                                <div className={popover.iconsContainer}>
                                    {items.map((item) => (
                                        <div
                                            className={popover.iconContainer}
                                            key={item.id}
                                        >
                                            <div
                                                className={popover.icon}
                                                style={{
                                                    background: `url(/Images/SpriteSheet/twitter-emoji-spritesheet-64.d3a69865.png) ${
                                                        1.6949 *
                                                        item.position[0]
                                                    }% ${
                                                        1.6949 *
                                                        item.position[1]
                                                    }% / 5900%5900%`,
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={popover.popoverIconContainer}>
                                <div
                                    className={
                                        popover.popoverIconContainerTitle
                                    }
                                >
                                    PEOPLE
                                </div>
                                <div className={popover.iconContainer}>
                                    <div
                                        className={popover.icon}
                                        style={{
                                            background: `url(/Images/SpriteSheet/twitter-emoji-spritesheet-64.d3a69865.png) 0%
                                1.6949% / 5900%5900%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Popover;
