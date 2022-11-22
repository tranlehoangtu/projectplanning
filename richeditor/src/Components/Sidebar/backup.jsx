// Reacts
import React, { useState, useEffect, useRef, useContext } from "react";

// Mui
import { Modal } from "@mui/material";

// Components
import Popover from "../Popover";
import PersonalPopover from "./PersonalPopover";
import Search from "./Modal/Search";
import Update from "./Popover/Update";

// Icons
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { FaAngleDoubleLeft } from "react-icons/fa";

// Services
import { getProjectsByUserId } from "../../Services/fetchProject";

// Styles
import "./styles.css";
import sidebar from "./sidebar.module.css";

// Contexts
import { UserContext } from "../../Context/UserContext";
// import { ProjectContext } from "../../Context/ProjectContext";

const Sidebar = (props) => {
    const { user } = useContext(UserContext);
    // const { project, setProject } = useContext(ProjectContext);

    const { expand, setExpand } = props;

    const [popovers, setPopovers] = useState(() => ({
        personal: false,
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

    const personalRef = useRef(null);

    useEffect(() => {
        const loading = async () => {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));

            const projects = await getProjectsByUserId(currentUser.id);

            setProjects((prev) => ({
                ...prev,
                projects: [...projects.data],
            }));

            setLoading(true);
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
    // currentWork
    return (
        <>
            {loading && (
                <div
                    className={sidebar.sidebarContainer}
                    style={{
                        width: expand ? "240px" : "0px",
                    }}
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
                                {user.fullname.charAt(0).toUpperCase()}
                            </div>
                            <div
                                className={sidebar.infoOptions}
                                onClick={handlePersonalClick}
                            >
                                <div className={sidebar.info}>
                                    <div className={sidebar.username}>
                                        {user.fullname}
                                    </div>
                                    <div className={sidebar.email}>
                                        {user.email}
                                    </div>
                                </div>

                                <div>
                                    <FaAngleDoubleLeft
                                        onClick={() => setExpand(false)}
                                        className={`${sidebar.faAngleDoubleLeft}`}
                                    />
                                </div>
                            </div>
                            {popovers.personal && (
                                <Popover
                                    currentRef={personalRef.current}
                                    onClickOutside={onClickOutside}
                                    styled={{ left: "10px" }}
                                >
                                    <PersonalPopover
                                        name={user.fullname}
                                        email={user.email}
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
                                <div className={sidebar.project}>Private</div>
                            </div>
                            <div className={sidebar.configs}>
                                <div className={sidebar.config}>Templates</div>
                                <div className={sidebar.config}>Import</div>
                                <div className={sidebar.config}>Trash</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
