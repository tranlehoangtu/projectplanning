// Reacts
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// DraftJs
import { convertToRaw, EditorState } from "draft-js";

// Components
import Projects from "./Projects";
import Search from "./Modal/Search";
import Personal from "./Personal";

// Icons
import { AiOutlinePlus } from "react-icons/ai";

// Services
import { updateUser } from "../../Services/fetchUser";
import { createProject } from "../../Services/fetchProject";

// Styles
import "./styles.css";
import sidebar from "./sidebar.module.css";

// Contexts
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";
import Updates from "./Updates";
import SettingnMember from "./Modal/SettingnMember";
import HowToUse from "./HowToUse";

const Sidebar = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

    const { expand, setExpand } = props;

    const [loading, setLoading] = useState(true);

    const [expands, setExpands] = useState(() => ({
        favorites: true,
        privates: true,
        publics: true,
    }));

    const navigate = useNavigate();

    useEffect(() => {
        const loading = async () => {
            console.log("Sidebar: Rendering");
            setLoading(false);
        };
        loading();
    }, []);

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
                        <Personal expand={expand} setExpand={setExpand} />
                        <div className={sidebar.settings}>
                            <Search user={user} />
                            <Updates
                                user={user}
                                setUser={setUser}
                                project={project}
                                setProject={setProject}
                            />
                            <SettingnMember project={project} user={user} />
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
                        <div style={{ flex: 1 }}></div>
                        <HowToUse />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
