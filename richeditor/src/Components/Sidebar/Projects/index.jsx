// Reacts
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// DraftJs
import { convertToRaw, EditorState } from "draft-js";

// Mui
import { Popover } from "@mui/material";
import { Box } from "@mui/system";

// Services
import {
    createProject,
    deleteProject,
    getAllChilds,
    getAllTreeByParentId,
    getProjectById,
    getProjectsByParentId,
    updateProject,
} from "../../../Services/fetchProject";
import { getUserById, updateUser } from "../../../Services/fetchUser";

// Icons
import { BiFileBlank } from "react-icons/bi";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillStar, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";

// Styles
import styledProjects from "./projects.module.css";

// Contexts

const RenderProject = (props) => {
    const {
        temp,
        project,
        currentProject,
        user,
        type,
        expand,
        setExpand,
        handleProjectClick,
        handleProjectPlus,
        handleDelete,
        handleRemove,
        handleRemoveFrom,
        handleMoveTo,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const cHandleDelele = () => {
        handleClose();
        handleDelete(currentProject);
    };

    const cHandleRemove = () => {
        handleClose();
        handleRemove(currentProject);
    };

    const nHandleProjectPlus = () => {
        setExpand(true);
        handleProjectPlus(currentProject);
    };

    const cHandleRemoveFrom = () => {
        handleClose();
        handleRemoveFrom(currentProject);
    };
    const cHandleMoveTo = () => {
        handleClose();
        handleMoveTo(currentProject);
    };

    return (
        <>
            <div
                className={styledProjects.project}
                style={{
                    paddingLeft: !temp ? "8px" : `${temp * 24}px`,
                    background:
                        project.id === currentProject.id &&
                        "rgba(0, 0, 0, 0.1)",
                }}
            >
                <MdKeyboardArrowRight
                    className={styledProjects.icon}
                    style={{
                        marginRight: "-4px",
                        transform: expand && "rotate(90deg)",
                    }}
                    onClick={() => setExpand(!expand)}
                />
                {currentProject.avatar.length === 0 ? (
                    <BiFileBlank />
                ) : (
                    <div
                        style={{
                            background: `url(/Images/logos/emojis.png) ${
                                1.6949 * currentProject.avatar[0]
                            }% ${
                                1.6949 * currentProject.avatar[1]
                            }% / 5900% 5900%`,

                            width: "16px",
                            height: "16px",
                        }}
                    ></div>
                )}
                <div
                    className={styledProjects.name}
                    onClick={() => handleProjectClick(currentProject)}
                >
                    {currentProject.name}
                </div>
                <div className={styledProjects.options}>
                    <BsThreeDots
                        className={styledProjects.icon}
                        onClick={handleClick}
                        style={{ fontSize: "16px" }}
                    />
                    <AiOutlinePlus
                        className={styledProjects.icon}
                        onClick={nHandleProjectPlus}
                        style={{ fontSize: "16px" }}
                    />
                </div>
            </div>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                sx={{ overflow: "visible" }}
            >
                <Box className={styledProjects.changes}>
                    <div
                        className={styledProjects.change}
                        onClick={
                            user.id === currentProject.userId
                                ? cHandleDelele
                                : cHandleRemove
                        }
                    >
                        <BsTrash
                            className={styledProjects.icon}
                            style={{ fontSize: "16px" }}
                        />
                        <span>
                            {currentProject.userId === user.id
                                ? "Delete"
                                : "Remove"}
                        </span>
                    </div>

                    {type !== "publics" && (
                        <>
                            {type === "favorites" ? (
                                <div
                                    className={styledProjects.change}
                                    onClick={cHandleRemoveFrom}
                                >
                                    <AiFillStar
                                        className={styledProjects.icon}
                                        style={{
                                            fontSize: "16px",
                                            color: "yellow",
                                        }}
                                    />
                                    <span>Remove from favorites</span>
                                </div>
                            ) : (
                                <div
                                    className={styledProjects.change}
                                    onClick={cHandleMoveTo}
                                >
                                    <AiOutlineStar
                                        className={styledProjects.icon}
                                        style={{ fontSize: "16px" }}
                                    />
                                    <span>Favorites</span>
                                </div>
                            )}
                        </>
                    )}
                </Box>
            </Popover>
        </>
    );
};

const Project = (props) => {
    const {
        user,
        setUser,
        project,
        setProject,
        projectId,
        type,
        temp,
        handleProjectPlus,
        handleProjectClick,
        handleDelete,
        handleRemove,
        handleRemoveFrom,
        handleMoveTo,
    } = props;

    const [loading, setLoading] = useState(true);
    const [expand, setExpand] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [childProjects, setChildProjects] = useState([]);

    useEffect(() => {
        const loading = async () => {
            if (project.id === projectId.id) {
                const childProjects = await getProjectsByParentId(project.id);
                setCurrentProject(project);
                setChildProjects([...childProjects.data]);
                setLoading(false);
            } else {
                const childProjects = await getProjectsByParentId(projectId.id);
                setCurrentProject(projectId);
                setChildProjects([...childProjects.data]);
                setLoading(false);
            }
            setLoading(false);
        };

        loading();
    }, [projectId, project]);

    return (
        <>
            {!loading && (
                <>
                    <RenderProject
                        currentProject={currentProject}
                        project={project}
                        setProject={setProject}
                        user={user}
                        setUser={setUser}
                        temp={temp}
                        type={type}
                        setExpand={setExpand}
                        expand={expand}
                        handleProjectClick={handleProjectClick}
                        handleProjectPlus={handleProjectPlus}
                        handleDelete={handleDelete}
                        handleRemove={handleRemove}
                        handleRemoveFrom={handleRemoveFrom}
                        handleMoveTo={handleMoveTo}
                    />
                    {expand && (
                        <>
                            {childProjects.length === 0 ? (
                                <div
                                    className={styledProjects.pageless}
                                    style={{
                                        paddingLeft: !temp
                                            ? "8px"
                                            : `${temp * 24}px`,
                                    }}
                                >
                                    No pages inside
                                </div>
                            ) : (
                                childProjects.map((item) => (
                                    <Project
                                        key={item.id}
                                        project={project}
                                        setProject={setProject}
                                        projectId={item}
                                        user={user}
                                        setUser={setUser}
                                        temp={temp + 1}
                                        type={type}
                                        handleProjectClick={handleProjectClick}
                                        handleProjectPlus={handleProjectPlus}
                                        handleDelete={handleDelete}
                                        handleRemove={handleRemove}
                                        handleRemoveFrom={handleRemoveFrom}
                                        handleMoveTo={handleMoveTo}
                                    />
                                ))
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

const Projects = (props) => {
    const { projectId, project, user, setUser, setProject, type } = props;

    const [loading, setLoading] = useState(true);
    const [expand, setExpand] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [childProjects, setChildProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loading = async () => {
            if (projectId === project.id) {
                setCurrentProject(project);
                const childProjects = await getProjectsByParentId(project.id);
                setChildProjects([...childProjects.data]);
                setLoading(false);
            } else {
                const fetchProject = await getProjectById(projectId);
                const childProjects = await getProjectsByParentId(projectId);
                setCurrentProject(fetchProject.data);
                setChildProjects([...childProjects.data]);
                setLoading(false);
            }
        };

        loading();
    }, [projectId, project]);

    const handleProjectClick = (cProject) => {
        if (project.id !== cProject.id) {
            navigate(`/${cProject.id}`);
        }
    };

    const handleProjectPlus = (cProject) => {
        createProject({
            parent: cProject.id,
            userId: cProject.userId,
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
            setProject({ ...res.data });
            setUser({
                ...nUser,
            });
            navigate(`/${res.data.id}`);
        });
    };

    const handleRemove = (cProject) => {
        const processing = async () => {
            let nUser = null;

            const childsData = await getAllChilds(cProject.id);
            const childs = [...childsData.data, cProject];

            const nlist = user[type].filter(
                (item) => !childs.find((child) => child.id === item)
            );

            nUser = {
                ...user,
                [type]: [...nlist],
            };

            let count = 0;
            count +=
                nUser.privates.length +
                nUser.publics.length +
                nUser.favorites.length;

            await updateProject(removeUserFromProject(cProject));

            if (count === 0) {
                nUser = {
                    ...nUser,
                    lastProject: "",
                };
                await updateUser({ ...nUser });

                setProject({ ...project });
                setUser({ ...nUser });

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({ ...nUser })
                );

                navigate("/");
            } else if (cProject.id === project.id) {
                let destination = "";

                if (nUser.privates.length > 0) {
                    nUser = { ...nUser, lastProject: nUser.privates[0] };
                    destination = `/${nUser.privates[0]}`;
                } else if (nUser.publics.length > 0) {
                    nUser = { ...nUser, lastProject: nUser.privates[0] };
                    destination = `/${nUser.privates[0]}`;
                } else {
                    nUser = { ...nUser, lastProject: nUser.favorites[0] };
                    destination = `/${nUser.favorites[0]}`;
                }

                await updateUser({ ...nUser });

                setProject({ ...project });
                setUser({ ...nUser });

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({ ...nUser })
                );

                navigate(destination);
            } else {
                await updateUser({ ...nUser });
                setProject({ ...project });
                setUser({ ...nUser });

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({ ...nUser })
                );
            }
        };

        const removeUserFromProject = (cProject) => {
            return {
                ...cProject,
                fullaccess: cProject.fullaccess.filter(
                    (access) => access !== user.id
                ),
                canEdits: cProject.canEdits.filter((edit) => edit !== user.id),
                canComments: cProject.canComments.filter(
                    (comment) => comment !== user.id
                ),
                canView: cProject.canView.filter((view) => view !== user.id),
            };
        };

        processing();
    };

    const handleDelete = (cProject) => {
        const processing = async () => {
            const childsData = await getAllChilds(cProject.id);
            const childs = [...childsData.data, cProject];

            let users = [user.id];

            childs.forEach((item) => {
                users = [
                    ...users,
                    ...item.fullaccess.filter(
                        (access) =>
                            !users.find((userItem) => userItem === access)
                    ),
                ];

                users = [
                    ...users,
                    ...item.canEdits.filter(
                        (access) =>
                            !users.find((userItem) => userItem === access)
                    ),
                ];

                users = [
                    ...users,
                    ...item.canComments.filter(
                        (access) =>
                            !users.find((userItem) => userItem === access)
                    ),
                ];

                users = [
                    ...users,
                    ...item.canView.filter(
                        (access) =>
                            !users.find((userItem) => userItem === access)
                    ),
                ];
            });

            let destination = "";

            for (var i = 0; i < users.length; i++) {
                let fetchUserData = null;

                if (users[i] === user.id) {
                    fetchUserData = user;
                } else {
                    const fetchedUser = await getUserById(users[i]);
                    fetchUserData = fetchedUser.data;
                }

                const nlist = fetchUserData[type].filter(
                    (item) => !childs.find((child) => child.id === item)
                );

                fetchUserData = {
                    ...fetchUserData,
                    [type]: nlist,
                };

                let count = 0;
                count +=
                    fetchUserData.privates.length +
                    fetchUserData.publics.length +
                    fetchUserData.favorites.length;

                if (count === 0) {
                    fetchUserData = {
                        ...fetchUserData,
                        lastProject: "",
                    };

                    destination = "/";
                } else if (cProject.id === project.id) {
                    if (fetchUserData.privates.length > 0) {
                        fetchUserData = {
                            ...fetchUserData,
                            lastProject: fetchUserData.privates[0],
                        };
                        destination = `/${fetchUserData.privates[0]}`;
                    } else if (fetchUserData.publics.length > 0) {
                        fetchUserData = {
                            ...fetchUserData,
                            lastProject: fetchUserData.publics[0],
                        };
                        destination = `/${fetchUserData.publics[0]}`;
                    } else {
                        fetchUserData = {
                            ...fetchUserData,
                            lastProject: fetchUserData.favorites[0],
                        };
                        destination = `/${fetchUserData.favorites[0]}`;
                    }
                }
                await updateUser({ ...fetchUserData });

                if (fetchUserData.id === user.id) {
                    setProject({ ...project });
                    setUser({ ...fetchUserData });
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify({ ...fetchUserData })
                    );
                }
            }

            for (var t = 0; t < childs.length; t++) {
                await deleteProject(childs[t].id);
            }

            navigate(destination);
        };

        processing();
    };

    const handleRemoveFrom = (cProject) => {
        const processing = async () => {
            const projectsData = await getAllTreeByParentId(cProject.id);

            const flist = user.favorites.filter(
                (item) => !projectsData.data.find((child) => child.id === item)
            );

            let nUser = {
                ...user,
                privates: [
                    ...user.privates,
                    ...projectsData.data.map((item) => item.id),
                ],
                favorites: [...flist],
            };

            await updateUser({ ...nUser });

            setProject({ ...project });
            setUser({ ...nUser });

            localStorage.setItem("currentUser", JSON.stringify({ ...nUser }));
        };

        processing();
    };

    const handleMoveTo = (cProject) => {
        const processing = async () => {
            const projectsData = await getAllTreeByParentId(cProject.id);

            const flist = user.privates.filter(
                (item) => !projectsData.data.find((child) => child.id === item)
            );

            let nUser = {
                ...user,
                favorites: [
                    ...user.favorites,
                    ...projectsData.data.map((item) => item.id),
                ],
                privates: [...flist],
            };

            await updateUser({ ...nUser });

            setProject({ ...project });
            setUser({ ...nUser });

            localStorage.setItem("currentUser", JSON.stringify({ ...nUser }));
        };

        processing();
    };

    let temp = 1;

    return (
        <>
            {!loading && currentProject.parent === "0" && (
                <div className={styledProjects.container}>
                    <RenderProject
                        user={user}
                        project={project}
                        currentProject={currentProject}
                        temp={null}
                        type={type}
                        expand={expand}
                        setExpand={setExpand}
                        handleProjectClick={handleProjectClick}
                        handleProjectPlus={handleProjectPlus}
                        handleDelete={handleDelete}
                        handleRemove={handleRemove}
                        handleRemoveFrom={handleRemoveFrom}
                        handleMoveTo={handleMoveTo}
                    />
                    {expand && (
                        <>
                            {childProjects.length === 0 ? (
                                <div
                                    className={styledProjects.pageless}
                                    style={{
                                        paddingLeft: !temp
                                            ? "8px"
                                            : `${temp * 24}px`,
                                    }}
                                >
                                    No pages inside
                                </div>
                            ) : (
                                childProjects.map((item) => (
                                    <Project
                                        key={item.id}
                                        project={project}
                                        setProject={setProject}
                                        projectId={item}
                                        user={user}
                                        setUser={setUser}
                                        temp={temp}
                                        type={type}
                                        handleProjectPlus={handleProjectPlus}
                                        handleProjectClick={handleProjectClick}
                                        handleDelete={handleDelete}
                                        handleRemove={handleRemove}
                                        handleRemoveFrom={handleRemoveFrom}
                                        handleMoveTo={handleMoveTo}
                                    />
                                ))
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
};
export default Projects;
