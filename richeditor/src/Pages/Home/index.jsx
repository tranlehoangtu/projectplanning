// Reacts
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Services
import { createProject, getProjectById } from "../../Services/fetchProject";
import { getUserById, updateUser } from "../../Services/fetchUser";

// Contexts
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";

// Components
import Content from "../../Components/Content";
import Sidebar from "../../Components/Sidebar";
import Error from "../Error";

// Styles
import styledHome from "./home.module.css";
import "./styles.css";

// DraftJs
import { convertToRaw, EditorState } from "draft-js";

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const { setProject } = useContext(ProjectContext);

    const [loading, setLoading] = useState(true);
    const [expand, setExpand] = useState(true);
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const loading = async () => {
            const pathname = location.pathname;

            let currentProject = null;

            const localUser = JSON.parse(localStorage.getItem("currentUser"));
            const localUserData = await getUserById(localUser.id);

            let currentUser = localUserData.data;

            if (pathname === "/") {
                // if we do have last project
                if (currentUser.lastProject) {
                    navigate(`/${currentUser.lastProject}`);
                }
                // else user first time log on or last project is being delete
                else {
                    const createdProject = await createProject({
                        parent: 0,
                        userId: currentUser.id,
                        state: convertToRaw(
                            EditorState.createEmpty().getCurrentContent()
                        ),
                    });

                    currentProject = createdProject.data;
                    currentUser = {
                        ...currentUser,
                        privates: [currentProject.id],
                        lastProject: currentProject.id,
                    };

                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(currentUser)
                    );
                    updateUser(currentUser);
                    navigate(`/${currentProject.id}`);
                }
            } else {
                // here we check if this is our project so let get all project we have.
                const favorites = currentUser.favorites;
                const publics = currentUser.publics;
                const privates = currentUser.privates;

                const projectId = pathname.substring(1, pathname.length);

                const isValid =
                    favorites.find((item) => item === projectId) ||
                    publics.find((item) => item === projectId) ||
                    privates.find((item) => item === projectId);

                if (isValid) {
                    const fetchedProject = await getProjectById(projectId);

                    currentProject = fetchedProject.data;
                    currentUser = {
                        ...currentUser,
                        lastProject: currentProject.id,
                    };
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify({ ...currentUser })
                    );
                    await updateUser({ ...currentUser });
                    setUser(currentUser);
                    setProject(currentProject);
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            }
        };
        loading();
    }, [location.pathname, navigate, setProject, setUser]);

    return (
        <>
            {!loading && (
                <>
                    {error ? (
                        <Error
                            user={user}
                            setError={setError}
                            setLoading={setLoading}
                        />
                    ) : (
                        <div className={styledHome.container}>
                            <Sidebar expand={expand} setExpand={setExpand} />
                            <Content expand={expand} setExpand={setExpand} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Home;
