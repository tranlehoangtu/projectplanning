import React, { useState } from "react";
import {
    FaBars,
    FaAngleDoubleRight,
    FaExpandAlt,
    FaAngleDoubleLeft,
    FaEllipsisH,
    FaPlus,
} from "react-icons/fa";

import {
    AiOutlineClockCircle,
    AiOutlineSearch,
    AiOutlineSetting,
    AiOutlineFileDone,
    AiOutlineNotification,
    AiFillBug,
} from "react-icons/ai";

import { MdKeyboardArrowRight } from "react-icons/md";
import SubjectRender from "./SubjectRender";
// import CustomBlockInline from "../CustomBlockInline";

import styles from "./styles.module.css";
import "./styles.css";
import { ResizableBox } from "react-resizable";

const favorites = [
    {
        id: 1,
        name: "Getting Started",
        mainIcon: <AiFillBug className={styles.subjectMainIcon} />,
        childrens: [
            {
                id: 1,
                name: "Getting First",
                mainIcon: (
                    <AiOutlineNotification className={styles.subjectMainIcon} />
                ),
                childrens: [],
            },
            {
                id: 2,
                name: "Getting Second",
                mainIcon: <AiFillBug className={styles.subjectMainIcon} />,
                childrens: [
                    {
                        id: 1,
                        name: "Getting Child First",
                        mainIcon: (
                            <AiOutlineNotification
                                className={styles.subjectMainIcon}
                            />
                        ),
                        childrens: [],
                    },
                    {
                        id: 2,
                        name: "Getting Child Second",
                        mainIcon: (
                            <AiFillBug className={styles.subjectMainIcon} />
                        ),
                        childrens: [],
                    },
                ],
            },
        ],
    },
];

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [resizing, setResizing] = useState(false);

    return (
        <>
            <div className={styles.sidebarContainer}>
                <div style={{ display: "flex" }}>
                    <div className={styles.bar}>
                        <div>
                            <FaBars
                                className={styles.icon}
                                id={styles.barIcon}
                            />
                            <FaAngleDoubleRight
                                className={styles.icon}
                                id={styles.doubleRightIcon}
                                onClick={() => setExpanded(true)}
                            />
                        </div>
                        {/* <div
                        className={styles.title}
                        style={{
                            marginLeft: expanded && `${width}px`,
                        }}
                    >
                        Untitled
                    </div> */}
                    </div>
                    {/* Working Here */}
                    <ResizableBox
                        width={220}
                        height={200}
                        axis="x"
                        className={`${styles.sidebar} ${
                            expanded ? styles.expandedSidebar : ""
                        }`}
                        onResizeStart={() => setResizing(true)}
                        onResizeStop={() => setResizing(false)}
                        // style={{ left: 0, top: 0 }}
                        style={{
                            marginTop: expanded && 0,
                            transform: expanded && "translateX(0)",
                            transition: resizing ? "" : "all 0.5s ease",
                        }}
                    >
                        <div>
                            <div className={styles.sidebarHead}>
                                <div className={styles.sidebarHeadInfo}>
                                    <div
                                        className={`${styles.userInfo} ${
                                            expanded
                                                ? styles.expandedUserInfo
                                                : ""
                                        }`}
                                    >
                                        <span>T</span>
                                        <h4>Tran Le Hoang Tu</h4>
                                        <FaExpandAlt className={styles.icon} />
                                    </div>
                                    <FaAngleDoubleLeft
                                        className={styles.icon}
                                        id={styles.doubleLeftIcon}
                                        onClick={() => setExpanded(false)}
                                    />
                                </div>
                                <div className={styles.sidebarUnorder}>
                                    <div className={styles.sidebarUnorderItem}>
                                        <AiOutlineSearch />
                                        <span>Search</span>
                                    </div>
                                    <div className={styles.sidebarUnorderItem}>
                                        <AiOutlineClockCircle />
                                        <span>Updates</span>
                                    </div>
                                    <div className={styles.sidebarUnorderItem}>
                                        <AiOutlineSetting />
                                        <span>Settings & Members Settings</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.subjects}>
                                <div className={styles.subject}>
                                    <h5 className={styles.subjectTitle}>
                                        Favorites
                                    </h5>
                                    <div className={styles.subjectContent}>
                                        {favorites.map((favor) => (
                                            <SubjectRender
                                                favor={favor}
                                                key={favor.id}
                                            />
                                        ))}
                                        <div className={styles.subjectItem}>
                                            <div
                                                className={
                                                    styles.subjectSubTitle
                                                }
                                            >
                                                <MdKeyboardArrowRight
                                                    className={`${styles.subjectIcon} ${styles.subjectDropdown}`}
                                                />
                                                <AiOutlineFileDone
                                                    className={
                                                        styles.subjectMainIcon
                                                    }
                                                />
                                                <span>Reading List</span>
                                            </div>
                                            <div
                                                className={
                                                    styles.subjectOptions
                                                }
                                            >
                                                <FaEllipsisH
                                                    className={`${styles.subjectIcon} ${styles.subjectOption}`}
                                                />
                                                <FaPlus
                                                    className={`${styles.subjectIcon} ${styles.subjectMore}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ResizableBox>
                    <div>
                        <h1>Untitled</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
