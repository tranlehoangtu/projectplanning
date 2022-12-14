import React, { useState } from "react";
import Subject from "./Subject";

import {
    AiFillBug,
    AiFillStar,
    AiOutlineClockCircle,
    AiOutlineDownload,
    AiOutlineMessage,
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
import { BsThreeDots, BsTrash } from "react-icons/bs";

import "./styles.css";
import Modal from "./Modal";

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
    const [modal, setModal] = useState(false);

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

    console.log(modal);

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
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            padding: "8px 0px 8px 12px",
                                            alignItems: "center",
                                            fontSize: "14px",
                                        }}
                                        onClick={() => setModal(!modal)}
                                    >
                                        <div className="user-icon">T</div>
                                        <div className="user-name">
                                            <div style={{ color: "black" }}>
                                                Tran Le Hoang Tu
                                            </div>
                                            <div style={{ fontSize: "11px" }}>
                                                tub1805831@student.ctu.edu.vn
                                            </div>
                                        </div>
                                        <div>
                                            <FaExpand className="icon" />
                                        </div>
                                    </div>
                                    <div className="space-div"></div>
                                    <div className="fa-double-left-container">
                                        <FaAngleDoubleLeft
                                            onClick={handleClose}
                                            className="icon"
                                        />
                                    </div>
                                    {modal && <Modal setModal={setModal} />}
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
                    <div className="button">Getting Started</div>
                    <div className="space-div"></div>
                    <div className="button">Share</div>
                    <div>
                        <AiOutlineMessage className="icon" />
                    </div>
                    <div>
                        <AiOutlineClockCircle className="icon" />
                    </div>
                    <div>
                        <AiFillStar
                            className="icon"
                            style={{ color: "yellow" }}
                        />
                    </div>
                    <div>
                        <BsThreeDots className="icon" />
                    </div>
                </div>
                <div className="editor-container">
                    <div
                        style={{
                            background: "red",
                            height: "100%",
                            width: "100%",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SimpleDiv;
