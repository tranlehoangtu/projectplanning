import React, { useState, useEffect, useRef } from "react";

import { Modal } from "@mui/material";

import Popover from "../Popover";
import PersonalPopover from "./PersonalPopover";

import { FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";
import {
    AiOutlineMessage,
    AiOutlineExpand,
    AiOutlineSearch,
    AiOutlineSetting,
    AiOutlineStar,
} from "react-icons/ai";

import {
    BiDotsHorizontalRounded,
    BiMessageAltDetail,
    BiTime,
} from "react-icons/bi";

import { BsEmojiSmile } from "react-icons/bs";
import { getProjectsByUserId, saveProject } from "../../Services/fetchProject";

import "./styles.css";
import sidebar from "./sidebar.module.css";
import Search from "./Modal/Search";
import Update from "./Popover/Update";
import Cover from "./Cover";
import AvatarComp from "./AvatarComp";
import Comments from "./Comments";
import SidebarComment from "./SidebarComment";

const getCurrentTime = (end) => {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let eDate = new Date(end);

    return `${monthNames[eDate.getMonth()]} ${eDate.getDate()}`;
};

const Sidebar = () => {
    const [expand, setExpand] = useState(false);
    const [popovers, setPopovers] = useState(() => ({
        personal: false,
    }));
    const [datas, setDatas] = useState(() => ({
        currentUser: null,
    }));
    const [loading, setLoading] = useState(false);
    const [modals, setModals] = useState(() => ({
        search: false,
        avatar: false,
    }));

    const [projects, setProjects] = useState(() => ({
        currentProject: null,
        projects: [],
    }));

    const [visible, setVisible] = useState(false);

    const personalRef = useRef(null);

    useEffect(() => {
        const loading = async () => {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));

            const projects = await getProjectsByUserId(currentUser.id);
            const currentProject = projects.data.find(
                (item) => item.id === currentUser.lastProject
            );

            setProjects((prev) => ({
                ...prev,
                projects: [...projects.data],
                currentProject: currentProject,
            }));

            setDatas((prev) => ({
                ...prev,
                currentUser: { ...currentUser },
            }));

            console.log(currentProject.comments.length);
            // setVisible( > 0);
            setLoading(true);

            document.title = currentProject.name;
        };

        loading();
    }, []);

    const onClickOutside = () => {
        setPopovers((prev) => ({
            ...prev,
            personal: false,
        }));
    };

    const handlePersonalClick = () => {
        setPopovers((prev) => ({
            ...prev,
            personal: !prev.personal,
        }));
    };

    const handleSearchModalOpen = () => {
        setModals((prev) => ({
            ...prev,
            search: true,
        }));
    };
    const handleSearchModalClose = () => {
        setModals((prev) => ({
            ...prev,
            search: false,
        }));
    };

    const handleSave = () => {
        saveProject({ ...projects.currentProject });
    };

    // cover section
    const handleCoverChanged = (image) => {
        setProjects((prev) => ({
            ...prev,
            currentProject: { ...prev.currentProject, background: image },
        }));
    };

    // avatar section
    const handleAvatarAdd = () => {
        setModals((prev) => ({
            ...prev,
            avatar: true,
        }));

        setProjects((prev) => ({
            ...prev,
            currentProject: { ...prev.currentProject, avatar: [0, 0] },
        }));
    };

    const handleAvatarChange = (avatars) => {
        setProjects((prev) => ({
            ...prev,
            currentProject: { ...prev.currentProject, avatar: [...avatars] },
        }));
    };

    // comments section
    const updateComments = (project) => {
        setProjects((prev) => ({
            ...prev,
            currentProject: project,
        }));
    };

    // currentWork
    return (
        <>
            {loading && (
                <div className={sidebar.container}>
                    <div
                        className={sidebar.sidebarContainer}
                        style={{ width: expand ? "240px" : "0px" }}
                    >
                        <div
                            className={sidebar.sidebarContainerA}
                            style={{
                                transform: expand
                                    ? "translateX(0)"
                                    : "translateX(-240px)",
                            }}
                        >
                            <div className={sidebar.personal} ref={personalRef}>
                                <div className={sidebar.avatar}>
                                    {datas.currentUser.email
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                                <div
                                    className={sidebar.infoOptions}
                                    onClick={handlePersonalClick}
                                >
                                    <div className={sidebar.info}>
                                        <div className={sidebar.username}>
                                            {datas.currentUser.fullname}
                                        </div>
                                        <div className={sidebar.email}>
                                            {datas.currentUser.email}
                                        </div>
                                    </div>
                                    <div>
                                        <AiOutlineExpand />
                                    </div>
                                </div>
                                <div>
                                    <FaAngleDoubleLeft
                                        onClick={() => setExpand(false)}
                                        className={`${sidebar.faAngleDoubleLeft}`}
                                    />
                                </div>
                                {popovers.personal && (
                                    <Popover
                                        currentRef={personalRef.current}
                                        onClickOutside={onClickOutside}
                                        styled={{ left: "10px" }}
                                    >
                                        <PersonalPopover
                                            name={datas.currentUser.fullname}
                                            email={datas.currentUser.email}
                                        />
                                    </Popover>
                                )}
                            </div>
                            <div className={sidebar.settings}>
                                <div
                                    className={sidebar.setting}
                                    onClick={handleSearchModalOpen}
                                >
                                    <AiOutlineSearch
                                        className="icon"
                                        style={{ fontSize: "26px" }}
                                    />
                                    <span>Search</span>
                                </div>
                                <Modal
                                    open={modals.search}
                                    onClose={handleSearchModalClose}
                                >
                                    <>
                                        <Search />
                                    </>
                                </Modal>
                                <Update />
                                <div className={sidebar.setting}>
                                    <AiOutlineSetting
                                        className="icon"
                                        style={{ fontSize: "26px" }}
                                    />
                                    <span>Groups & Members</span>
                                </div>
                            </div>
                            <div>
                                <div className={sidebar.projects}>
                                    <div className={sidebar.project}>
                                        <div className={sidebar.projectType}>
                                            Favorites
                                        </div>
                                    </div>
                                    <div className={sidebar.project}>
                                        Private
                                    </div>
                                </div>
                                <div className={sidebar.configs}>
                                    <div className={sidebar.config}>
                                        Templates
                                    </div>
                                    <div className={sidebar.config}>Import</div>
                                    <div className={sidebar.config}>Trash</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={sidebar.contentContainer}>
                        <div className={sidebar.topbar}>
                            <div
                                className={sidebar.expand}
                                style={{ width: expand ? 0 : "44px" }}
                                onClick={() => {
                                    setExpand(true);
                                }}
                            >
                                <FaBars className={`${sidebar.fabar} icon`} />
                                <FaAngleDoubleRight
                                    onClick={() => {
                                        setExpand(true);
                                    }}
                                    className={`${sidebar.faAngleDoubleRight} icon`}
                                />
                            </div>
                            <div className={sidebar.represent}>
                                {projects.currentProject.avatar.length > 0 && (
                                    <div
                                        className={sidebar.miniIcon}
                                        style={{
                                            background: `url(/Images/logos/emojis.png) ${
                                                1.6949 *
                                                projects.currentProject
                                                    .avatar[0]
                                            }% ${
                                                1.6949 *
                                                projects.currentProject
                                                    .avatar[1]
                                            }% / 5900% 5900%`,
                                        }}
                                    ></div>
                                )}
                                <div className={sidebar.title}>
                                    {projects.currentProject.name}
                                </div>
                            </div>
                            <div className="space-div"></div>
                            <div className={sidebar.options}>
                                <div
                                    className={sidebar.option}
                                    style={{
                                        color: "rgba(25, 23, 17, 0.6)",
                                        fontSize: "14px",
                                    }}
                                >
                                    {getCurrentTime(
                                        projects.currentProject.editAt
                                    )}
                                </div>
                                <div className={`button ${sidebar.option}`}>
                                    Share
                                </div>
                                <div className={sidebar.option}>
                                    <AiOutlineMessage className="icon" />
                                </div>
                                <div className={sidebar.option}>
                                    <BiTime className="icon" />
                                </div>
                                <div className={sidebar.option}>
                                    <AiOutlineStar className="icon" />
                                    {/* <AiFillStar
                                        className="icon"
                                        style={{ color: "yellow" }}
                                    /> */}
                                </div>
                                <div className={sidebar.option}>
                                    <BiDotsHorizontalRounded className="icon" />
                                </div>
                            </div>
                        </div>
                        <div className={sidebar.editor}>
                            <Cover
                                projectId={projects.currentProject.id}
                                handleCoverChanged={handleCoverChanged}
                            />
                            <div
                                style={{
                                    padding: expand ? "0 340px" : "0 380px",
                                }}
                                className={sidebar.projectTitle}
                            >
                                <AvatarComp
                                    visible={
                                        projects.currentProject.avatar.length >
                                        0
                                    }
                                    projectId={projects.currentProject.id}
                                    handleAvatarChange={handleAvatarChange}
                                />
                                <div className={sidebar.changes}>
                                    {projects.currentProject.avatar.length ===
                                        0 && (
                                        <div
                                            className={sidebar.change}
                                            onClick={handleAvatarAdd}
                                        >
                                            <div>
                                                <BsEmojiSmile
                                                    className="icon"
                                                    style={{ fontSize: "26px" }}
                                                />
                                            </div>
                                            <div>Add Icon</div>
                                        </div>
                                    )}
                                    {!visible && (
                                        <div
                                            className={sidebar.change}
                                            onClick={() => setVisible(true)}
                                        >
                                            <div>
                                                <BiMessageAltDetail
                                                    className="icon"
                                                    style={{ fontSize: "26px" }}
                                                />
                                            </div>
                                            <div>Add Comment</div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    className={sidebar.input}
                                    type="text"
                                    value={projects.currentProject.name}
                                    onChange={(e) => {
                                        setProjects((prev) => ({
                                            ...prev,
                                            currentProject: {
                                                ...prev.currentProject,
                                                name: e.target.value,
                                            },
                                        }));
                                        document.title = e.target.value;
                                    }}
                                    spellCheck={false}
                                    placeholder="Untitled"
                                />
                                <Comments
                                    projectId={projects.currentProject.id}
                                    username={datas.currentUser.fullname}
                                    updateComments={updateComments}
                                    visible={visible}
                                />
                            </div>
                            <div>Editor</div>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                    <div
                        className={sidebar.commentsContainer}
                        style={{ width: "300px" }}
                    >
                        <SidebarComment />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
