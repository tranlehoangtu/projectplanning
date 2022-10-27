import React, { useState } from "react";
import Subject from "./Subject";

import {
    AiFillBug,
    AiOutlineClockCircle,
    AiOutlineDownload,
    AiOutlineNotification,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaBars,
    FaExpand,
} from "react-icons/fa";
import { HiOutlineTemplate } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";

import "./styles.css";

const favorites = [
    {
        id: 1,
        name: "Getting StartedGetting",
        mainIcon: <AiFillBug className="icon" />,
        childrens: [
            {
                id: 1,
                name: "Getting First",
                mainIcon: <AiOutlineNotification className="icon" />,
                childrens: [],
            },
            {
                id: 2,
                name: "Getting Second",
                mainIcon: <AiFillBug className="icon" />,
                childrens: [
                    {
                        id: 1,
                        name: "Getting Child First",
                        mainIcon: <AiOutlineNotification className="icon" />,
                        childrens: [],
                    },
                    {
                        id: 2,
                        name: "Getting Child Second",
                        mainIcon: <AiFillBug className="icon" />,
                        childrens: [],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "Getting Second",
        mainIcon: <AiFillBug className="icon" />,
        childrens: [
            {
                id: 1,
                name: "Getting Child First",
                mainIcon: <AiOutlineNotification className="icon" />,
                childrens: [],
            },
            {
                id: 2,
                name: "Getting Child Second",
                mainIcon: <AiFillBug className="icon" />,
                childrens: [],
            },
        ],
    },
];

const SimpleDiv = () => {
    const [expand, setExpand] = useState(false);
    const [show, setShow] = useState(false);
    const [temp, setTemp] = useState(false);

    const changeBackground = () => {
        if (show && !expand) {
            return {
                transform: "translate(0, 40px)",
                height: "calc(100vh - 40px)",
            };
        } else if (expand) {
            return {
                transform: "translate(0,0)",
            };
        }

        return {
            transform: "translate(-220px, 40px)",
            height: "calc(100vh - 40px)",
        };
    };

    const handleOpen = () => {
        setExpand(true);
        setTemp(true);
    };

    const handleClose = () => {
        setShow(true);
        setExpand(false);
    };

    const handleMouseMove = (props) => {
        if (temp && !expand) {
            setShow(false);
            setTemp(false);
        }
    };

    return (
        <div className="container" onMouseMove={handleMouseMove}>
            <div
                className="sidebar-container"
                style={{
                    width: expand ? "220px" : "0",
                }}
            >
                <div
                    style={{
                        overflow: "hidden",
                        height: expand ? "100vh" : "calc(100vh - 40px)",
                    }}
                >
                    <div className="sidebar-absolute-container">
                        <div
                            className="sidebar"
                            style={changeBackground(expand, show)}
                        >
                            <div>
                                <div className="user-info">
                                    <div className="user-icon">T</div>
                                    <div className="user-name">
                                        Tran Le Hoang Tu Tran Le Hoang Tu
                                    </div>
                                    <div>
                                        <FaExpand className="icon" />
                                    </div>
                                    <div className="space-div"></div>
                                    <div className="fa-double-left-container">
                                        <FaAngleDoubleLeft
                                            onClick={handleClose}
                                            className="icon fa-double-left"
                                        />
                                    </div>
                                </div>
                                <div className="sidebar-settings">
                                    <div className="icon-container">
                                        <AiOutlineSearch className="icon" />
                                        <span>Search</span>
                                    </div>
                                    <div className="icon-container">
                                        <AiOutlineClockCircle className="icon" />
                                        <span>Updates</span>
                                    </div>
                                    <div className="icon-container">
                                        <AiOutlineSetting className="icon" />
                                        <span>Settings & Members Settings</span>
                                    </div>
                                </div>
                            </div>
                            <div className="subject-container">
                                <div className="subject">
                                    <div className="subject-title">
                                        Favorites
                                    </div>
                                    {favorites.map((favor) => {
                                        return (
                                            <Subject
                                                key={favor.id}
                                                favor={favor}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="subject-container">
                                <div className="subject">
                                    <div className="subject-title">Private</div>
                                    {favorites.map((favor) => {
                                        return (
                                            <Subject
                                                key={favor.id}
                                                favor={favor}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <div className="sidebar-settings">
                                    <div className="icon-container">
                                        <HiOutlineTemplate className="icon" />
                                        <span>Search</span>
                                    </div>
                                    <div className="icon-container">
                                        <AiOutlineDownload className="icon" />
                                        <span>Updates</span>
                                    </div>
                                    <div className="icon-container">
                                        <BsTrash className="icon" />
                                        <span>Settings & Members Settings</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ color: "red", marginTop: "40px" }}>
                                Side left
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-container">
                <div className="topbar-container" onClick={handleOpen}>
                    {!expand && (
                        <div
                            className="toggle-button-container"
                            onMouseEnter={() => {
                                if (temp) {
                                    return;
                                }
                                setShow(true);
                            }}
                            onMouseLeave={() => {
                                if (temp) {
                                    return;
                                }
                                setShow(false);
                            }}
                        >
                            <FaBars className="fa-bar-icon" />
                            <FaAngleDoubleRight className="fa-double-right" />
                        </div>
                    )}
                    <div>Getting Started</div>
                    <div className="space-div"></div>
                    <div>Share</div>
                    <div>Message</div>
                    <div>Clock</div>
                    <div>Star</div>
                    <div>Three Dot</div>
                </div>
                <div className="editor-container">
                    <h1>Editor</h1>
                </div>
            </div>
        </div>
    );
};

export default SimpleDiv;
