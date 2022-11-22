// Reacts
import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// DraftJs
import { convertToRaw, EditorState } from "draft-js";

// Mui
import { Modal, Popover } from "@mui/material";
import { Box } from "@mui/system";

// Components
import PersonalPopover from "./PersonalPopover";
import Projects from "./Projects";
import Search from "./Modal/Search";

// Icons
import {
    AiOutlineExpand,
    AiOutlinePlus,
    AiOutlineSearch,
} from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

// Services
import { updateUser } from "../../Services/fetchUser";
import { createProject } from "../../Services/fetchProject";

// Styles
import "./styles.css";
import sidebar from "./sidebar.module.css";

// Contexts
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // bgcolor: "#fff",
    // width: 400,
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
};

const Sidebar = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

    const { expand, setExpand } = props;

    const [loading, setLoading] = useState(true);
    const [anchorEls, setAnchorEls] = useState(() => ({
        personal: null,
    }));
    const [modals, setModals] = useState(() => ({
        search: false,
    }));

    const [expands, setExpands] = useState(() => ({
        favorites: true,
        privates: true,
        publics: true,
    }));

    const opens = useMemo(
        () => ({ personal: Boolean(anchorEls.personal) }),
        [anchorEls]
    );

    const personalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loading = async () => {
            console.log("Sidebar: Rendering");
            setLoading(false);
        };
        loading();
    }, []);

    const handlePersonalClick = (event) => {
        setAnchorEls((prev) => ({
            ...prev,
            personal: personalRef.current,
        }));
    };

    const handlePersonalClose = () => {
        setAnchorEls((prev) => ({
            ...prev,
            personal: null,
        }));
    };

    // Search Modal
    const handleSearchClose = () => {
        setModals((prev) => ({
            ...prev,
            search: false,
        }));
    };

    const handleSearchClick = () => {
        setModals((prev) => ({
            ...prev,
            search: true,
        }));
    };

    const handlePlusClick = (type) => {
        createProject({
            parent: 0,
            userId: user.id,
            state: convertToRaw(EditorState.createEmpty().getCurrentContent()),
        }).then((res) => {
            const nUser = {
                ...user,
                [type]: [...user[type], res.data.id],
                lastProject: res.data.id,
            };

            localStorage.setItem("currentUser", JSON.stringify({ ...nUser }));
            updateUser({
                ...nUser,
            });
            setUser({
                ...nUser,
            });
            navigate(`/${res.data.id}`);
        });
    };

    let temp = 0;
    // currentWork
    return (
        <>
            {!loading && (
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
                                {user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className={sidebar.info}>
                                <div className={sidebar.username}>
                                    {user.fullname} Lorem ipsum dolor, sit amet
                                    consectetur adipisicing elit. Soluta,
                                    blanditiis.
                                </div>
                                <div className={sidebar.email}>
                                    {user.email}
                                </div>
                            </div>
                            <div>
                                <AiOutlineExpand
                                    className={`icon`}
                                    style={{ fontSize: "24px" }}
                                    onClick={handlePersonalClick}
                                />
                            </div>
                            <div>
                                <FaAngleDoubleLeft
                                    onClick={() => setExpand(false)}
                                    className={`icon`}
                                    style={{ fontSize: "24px" }}
                                />
                            </div>
                            <Popover
                                open={opens.personal}
                                anchorEl={anchorEls.personal}
                                onClose={handlePersonalClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                            >
                                <PersonalPopover user={user} />
                            </Popover>
                        </div>
                        <div className={sidebar.settings}>
                            <div
                                className={sidebar.setting}
                                onClick={handleSearchClick}
                            >
                                <AiOutlineSearch
                                    className="icon"
                                    style={{ fontSize: "26px" }}
                                />
                                <div className={sidebar.name}>Search</div>
                            </div>
                            <Modal
                                open={modals.search}
                                onClose={handleSearchClose}
                            >
                                <Box sx={style}>
                                    <Search user={user} />
                                </Box>
                            </Modal>
                            <div
                                className={sidebar.setting}
                                // onClick={handleSearchModalOpen}
                            >
                                <HiOutlineClock
                                    className="icon"
                                    style={{ fontSize: "26px" }}
                                />
                                <div className={sidebar.name}>Updates</div>
                            </div>
                            <div
                                className={sidebar.setting}
                                // onClick={handleSearchModalOpen}
                            >
                                <IoMdSettings
                                    className="icon"
                                    style={{ fontSize: "26px" }}
                                />
                                <div className={sidebar.name}>
                                    Settings & Members
                                </div>
                            </div>
                            {/* <Modal
                                open={modals.search}
                                onClose={handleSearchModalClose}
                            >
                                <>
                                    <Search />
                                </>
                            </Modal>
                            <Update /> */}
                            {/* <div className={sidebar.setting}>
                                <AiOutlineSetting
                                    className="icon"
                                    style={{ fontSize: "26px" }}
                                />
                                <span>Groups & Members</span>
                            </div> */}
                        </div>
                        <div className={sidebar.types}>
                            <div className={sidebar.type}>
                                <div
                                    style={{
                                        padding: "0 10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        className={sidebar.typeName}
                                        onClick={() =>
                                            setExpands((prev) => ({
                                                ...prev,
                                                favorites: !prev.favorites,
                                            }))
                                        }
                                    >
                                        Favorites
                                    </div>
                                    <div className="space-div"></div>
                                    <div
                                        onClick={() =>
                                            handlePlusClick("favorites")
                                        }
                                    >
                                        <AiOutlinePlus
                                            className="icon"
                                            style={{ fontSize: "24px" }}
                                        />
                                    </div>
                                </div>
                                {expands.favorites &&
                                    user.favorites.map((item) => (
                                        <Projects
                                            key={item}
                                            project={project}
                                            setProject={setProject}
                                            projectId={item}
                                            user={user}
                                            setUser={setUser}
                                            temp={temp}
                                            type={"favorites"}
                                        />
                                    ))}
                            </div>
                            <div className={sidebar.type}>
                                <div
                                    style={{
                                        padding: "0 10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        className={sidebar.typeName}
                                        onClick={() =>
                                            setExpands((prev) => ({
                                                ...prev,
                                                privates: !prev.privates,
                                            }))
                                        }
                                    >
                                        Privates
                                    </div>
                                    <div className="space-div"></div>
                                    <div
                                        onClick={() =>
                                            handlePlusClick("privates")
                                        }
                                    >
                                        <AiOutlinePlus
                                            className="icon"
                                            style={{ fontSize: "24px" }}
                                        />
                                    </div>
                                </div>
                                {expands.privates &&
                                    user.privates.map((item) => (
                                        <Projects
                                            key={item}
                                            project={project}
                                            setProject={setProject}
                                            projectId={item}
                                            user={user}
                                            setUser={setUser}
                                            temp={temp}
                                            type={"privates"}
                                        />
                                    ))}
                            </div>
                            <div className={sidebar.type}>
                                <div
                                    style={{
                                        padding: "0 10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        className={sidebar.typeName}
                                        onClick={() =>
                                            setExpands((prev) => ({
                                                ...prev,
                                                publics: !prev.publics,
                                            }))
                                        }
                                    >
                                        Publics
                                    </div>
                                    <div className="space-div"></div>
                                    <div
                                        onClick={() =>
                                            handlePlusClick("publics")
                                        }
                                    >
                                        <AiOutlinePlus
                                            className="icon"
                                            style={{ fontSize: "24px" }}
                                        />
                                    </div>
                                </div>
                                {expands.publics &&
                                    user.publics.map((item) => (
                                        <Projects
                                            key={item}
                                            project={project}
                                            setProject={setProject}
                                            projectId={item}
                                            user={user}
                                            setUser={setUser}
                                            temp={temp}
                                            type={"publics"}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
