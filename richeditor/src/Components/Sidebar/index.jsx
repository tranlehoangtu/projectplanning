import React, { useState } from "react";
import Subject from "./Subject";

import CustomBlockInline from "../CustomBlockInline";
import Cover from "../Cover";

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
import {
    BsEmojiSmileFill,
    BsImageFill,
    BsThreeDots,
    BsTrash,
} from "react-icons/bs";

import "./styles.css";
import sidebar from "./sidebar.module.css";
import { useRef } from "react";
import Icon from "../Icon";

const colorAndGradients = [
    { id: 9, url: "solid_red.png", name: "Solid_red" },
    { id: 10, url: "solid_yellow.png", name: "Solid_yellow" },
    { id: 8, url: "solid_beige.png", name: "Solid_beige" },
    { id: 11, url: "solid_blue.png", name: "Solid_blue" },
    { id: 1, url: "gradients_2.png", name: "Gradient 2" },
    { id: 2, url: "gradients_3.png", name: "Gradient 3" },
    { id: 3, url: "gradients_4.png", name: "Gradient 4" },
    { id: 4, url: "gradients_5.png", name: "Gradient 5" },
    { id: 5, url: "gradients_8.png", name: "Gradient 8" },
    { id: 6, url: "gradients_10.jpg", name: "Gradient 10" },
    { id: 7, url: "gradients_11.jpg", name: "Gradient 11" },
];

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

const logos = [
    {
        id: 1,
        name: "Emojis",
        content: [
            {
                id: 1,
                name: "Recent",
                content: [],
            },
            {
                id: 2,
                name: "People",
                content: [
                    [32, 52],
                    [32, 53],
                    [32, 54],
                    [32, 55],
                    [32, 56],
                    [32, 57],
                    [32, 58],
                    [32, 59],
                    [33, 0],
                    [33, 1],
                    [33, 2],
                    [33, 3],
                    [33, 4],
                    [33, 5],
                    [33, 6],
                    [33, 7],
                    [33, 8],
                    [33, 9],
                    [33, 10],
                    [33, 11],
                    [33, 12],
                    [33, 13],
                    [33, 14],
                    [33, 15],
                    [33, 16],
                    [33, 17],
                ],
            },
            {
                id: 3,
                name: "Animals and nature",
                content: [],
            },
            {
                id: 4,
                name: "Food and drink",
                content: [],
            },
            {
                id: 5,
                name: "Activity",
                content: [],
            },
            {
                id: 6,
                name: "Travels and places",
                content: [],
            },
            {
                id: 7,
                name: "Objects",
                content: [],
            },
            {
                id: 8,
                name: "Symbols",
                content: [],
            },
            {
                id: 9,
                name: "Flags",
                content: [],
            },
        ],
    },
    {
        id: 2,
        name: "Icons",
        content: [
            {
                id: 1,
                name: "Icons",
                content: [
                    [0, 0],
                    [0, 1],
                    [0, 2],
                    [0, 3],
                    [0, 4],
                    [0, 5],
                    [0, 6],
                    [1, 0],
                    [1, 1],
                    [1, 2],
                    [1, 3],
                    [1, 4],
                    [1, 5],
                    [1, 6],
                    [2, 0],
                    [2, 1],
                    [2, 2],
                    [2, 3],
                    [2, 4],
                    [2, 5],
                    [2, 6],
                ],
            },
        ],
    },
    {
        id: 3,
        name: "Customs",
        content: [],
    },
];

const icons = [
    [32, 52],
    [32, 53],
    [32, 54],
    [32, 55],
    [32, 56],
    [32, 57],
    [32, 52],
    [32, 53],
    [32, 54],
    [32, 55],
    [32, 56],
    [32, 57],
];

const Sidebar = () => {
    const [expand, setExpand] = useState(false);
    const [show, setShow] = useState(false);
    const [temp, setTemp] = useState(false);
    const [modal, setModal] = useState(false);

    const [values, setValues] = useState(() => {
        return {
            title: "Untitled",
            popover: { icon: false, cover: false },
            activated: { icon: false, cover: false },
            imageUrl: "",
            logos: logos,
            current: { background: null, logo: null },
        };
    });

    let imageRef = useRef(null);
    let iconContainerRef = useRef(null);

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

    const addCoverClicked = () => {
        const coverImage = imageRef.current;

        coverImage.style.opacity = 1;
        coverImage.style.height = "30vh";
        const item =
            colorAndGradients[
                Math.floor(Math.random() * colorAndGradients.length)
            ];
        setValues((prev) => ({
            ...prev,
            popover: { ...prev.popover, cover: true },
            imageUrl: `/Images/Cover/${item.url}`,
        }));
    };

    const removeCoverClicked = () => {
        const coverImage = imageRef.current;

        coverImage.style.opacity = 0;
        coverImage.style.height = "20vh";

        setValues((prev) => ({
            ...prev,
            popover: { ...prev.popover, cover: false },
        }));
    };

    const handleImageClick = (event) => {
        setValues((prev) => ({
            ...prev,
            imageUrl: event.target.src,
        }));
    };

    // current function
    const addIconClicked = () => {
        const iconContainerEle = iconContainerRef.current;

        iconContainerEle.style.height = "39px";
        iconContainerEle.style.opacity = 1;

        const item = icons[Math.floor(Math.random() * icons.length)];

        setValues((prev) => ({
            ...prev,
            popover: { ...prev.popover, icon: true },
            current: { ...prev.current, logo: item },
        }));
    };

    const iconRemoveClicked = () => {
        const iconContainerEle = iconContainerRef.current;

        iconContainerEle.style.height = "20px";
        iconContainerEle.style.opacity = 0;

        setValues((prev) => ({
            ...prev,
            popover: { ...prev.popover, icon: false },
        }));
    };

    // Return sss
    return (
        <div className={sidebar.container} onMouseMove={handleMouseMove}>
            <div
                className={sidebar.sidebarContainer}
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
                    <div className={sidebar.sidebarAbsoluteContainer}>
                        <div
                            className={sidebar.sidebar}
                            style={changeBackground(expand, show)}
                        >
                            <div>
                                <div className={sidebar.userInfo}>
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
                                        <div className={sidebar.userIcon}>
                                            T
                                        </div>
                                        <div className={sidebar.username}>
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
                                    <div
                                        className={
                                            sidebar.faDoubleLeftContainer
                                        }
                                    >
                                        <FaAngleDoubleLeft
                                            onClick={handleClose}
                                            className="icon"
                                        />
                                    </div>
                                </div>
                                <div className={sidebar.sidebarSettings}>
                                    <div className={sidebar.iconContainer}>
                                        <AiOutlineSearch className="icon" />
                                        <span>Search</span>
                                    </div>
                                    <div className={sidebar.iconContainer}>
                                        <AiOutlineClockCircle className="icon" />
                                        <span>Updates</span>
                                    </div>
                                    <div className={sidebar.iconContainer}>
                                        <AiOutlineSetting className="icon" />
                                        <span>Settings & Members Settings</span>
                                    </div>
                                </div>
                            </div>
                            <div className={sidebar.subjectContainer}>
                                <div className={sidebar.subject}>
                                    <div className={sidebar.subjectTitle}>
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
                            <div className={sidebar.subjectContainer}>
                                <div className={sidebar.subject}>
                                    <div className={sidebar.subjectTitle}>
                                        Private
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
                            <div style={{ marginTop: "20px" }}>
                                <div className={sidebar.sidebarSettings}>
                                    <div className={sidebar.iconContainer}>
                                        <HiOutlineTemplate className="icon" />
                                        <span>Search</span>
                                    </div>
                                    <div className={sidebar.iconContainer}>
                                        <AiOutlineDownload className="icon" />
                                        <span>Updates</span>
                                    </div>
                                    <div className={sidebar.iconContainer}>
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
            <div className={sidebar.contentContainer}>
                <div className={sidebar.topbarContainer} onClick={handleOpen}>
                    {!expand && (
                        <div
                            className={sidebar.toggleButtonContainer}
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
                            <FaBars className={sidebar.faBarIcon} />
                            <FaAngleDoubleRight
                                className={sidebar.faDoubleRight}
                            />
                        </div>
                    )}
                    <div className="button">{values.title}</div>
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
                <div className={sidebar.editorContainer}>
                    <div className={sidebar.editorCoverContainer}>
                        <img
                            src={values.imageUrl}
                            alt="solid_beige"
                            className={sidebar.sidebarImage}
                            ref={imageRef}
                        />
                        {values.popover.cover && (
                            <Cover
                                className={sidebar.editorCoverOptions}
                                name="Change Cover"
                                activated={values.popover.cover}
                                data={colorAndGradients}
                                handleImageClick={handleImageClick}
                                removeCoverClicked={removeCoverClicked}
                            />
                        )}
                    </div>
                    <div>
                        <div
                            className={sidebar.editorIconContainer}
                            ref={iconContainerRef}
                        >
                            {values.popover.icon && (
                                <Icon
                                    logo={values.current.logo}
                                    logos={values.logos}
                                    iconRemoveClicked={iconRemoveClicked}
                                />
                            )}
                        </div>
                        <div className={sidebar.editorTitle}>
                            <input
                                type="text"
                                value={values.title}
                                onChange={(e) =>
                                    setValues((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                className={sidebar.editorInput}
                            />
                            <div className={sidebar.editorTitleOptions}>
                                {!values.popover.icon && (
                                    <div
                                        className={sidebar.iconWrapper}
                                        onClick={addIconClicked}
                                    >
                                        <BsEmojiSmileFill />
                                        <span>Add Icon</span>
                                    </div>
                                )}
                                {!values.popover.cover && (
                                    <div
                                        className={sidebar.iconWrapper}
                                        onClick={addCoverClicked}
                                    >
                                        <BsImageFill />
                                        <span>Add Cover</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className={sidebar.editorWrapper}
                        style={{ padding: expand ? "0 100px" : "0 300px" }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <div className={sidebar.editorCover}>
                                <CustomBlockInline />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
