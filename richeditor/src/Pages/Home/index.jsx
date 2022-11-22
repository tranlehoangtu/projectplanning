// Reacts
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Services
import { createProject, getProjectById } from "../../Services/fetchProject";
import { updateUser } from "../../Services/fetchUser";

// Contexts
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";

// Components
import Content from "../../Components/Content";
import Sidebar from "../../Components/Sidebar";

// Styles
import styledHome from "./home.module.css";
import "./styles.css";

// DraftJs
import { convertToRaw, EditorState } from "draft-js";

const Home = () => {
    const { user, setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [expand, setExpand] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const providerValue = useMemo(
        () => ({ project, setProject }),
        [project, setProject]
    );

    useEffect(() => {
        const loading = async () => {
            const pathname = location.pathname;
            let currentUser = null;
            let currentProject = null;
            if (user) {
                currentUser = user;
            } else {
                currentUser = JSON.parse(localStorage.getItem("currentUser"));
            }
            if (pathname === "/") {
                const lastProject = currentUser.lastProject;
                if (lastProject) {
                    navigate(`/${lastProject}`);
                } else {
                    const createdProject = await createProject({
                        parent: 0,
                        userId: currentUser.id,
                        state: convertToRaw(
                            EditorState.createEmpty().getCurrentContent()
                        ),
                    });
                    // set new lastproject
                    currentProject = createdProject.data;
                    currentUser = {
                        ...currentUser,
                        privates: [...currentUser.privates, currentProject.id],
                        lastProject: currentProject.id,
                    };
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify({ ...currentUser })
                    );
                    setUser({ ...currentUser });
                    updateUser({ ...currentUser });
                    navigate(`/${currentProject.id}`);
                }
            } else if (
                !project ||
                project.id !== pathname.substring(1, pathname.length)
            ) {
                const favorites = currentUser.favorites;
                const publics = currentUser.publics;
                const privates = currentUser.privates;
                const isFavorites = Boolean(
                    favorites.find(
                        (favorite) =>
                            favorite === pathname.substring(1, pathname.length)
                    )
                );
                const isPublics = Boolean(
                    publics.find(
                        (publicItem) =>
                            publicItem ===
                            pathname.substring(1, pathname.length)
                    )
                );
                const isPrivates = Boolean(
                    privates.find(
                        (privateItem) =>
                            privateItem ===
                            pathname.substring(1, pathname.length)
                    )
                );
                if (isFavorites || isPublics || isPrivates) {
                    const fetchProject = await getProjectById(
                        `${pathname.substring(1, pathname.length)}`,
                        "Home"
                    );
                    currentProject = fetchProject.data;
                    currentUser = {
                        ...currentUser,
                        lastProject: currentProject.id,
                    };
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify({ ...currentUser })
                    );
                    updateUser({ ...currentUser });
                    document.title = currentProject.name;
                    setUser(currentUser);
                    setProject(currentProject);
                    setLoading(false);
                } else {
                    navigate("/error");
                }
            }
        };
        loading();
    }, [location, user, setUser, navigate, project]);
    return (
        <>
            {!loading && (
                <>
                    <ProjectContext.Provider value={providerValue}>
                        <div className={styledHome.container}>
                            <Sidebar expand={expand} setExpand={setExpand} />
                            <Content expand={expand} setExpand={setExpand} />
                        </div>
                    </ProjectContext.Provider>
                    {/* <CommentBlock /> */}
                </>
            )}
        </>
    );
};

export default Home;
