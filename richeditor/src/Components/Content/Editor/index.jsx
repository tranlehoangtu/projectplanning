// Reacts

import React, { useContext, useState, useEffect } from "react";

// Components
import Cover from "./Cover";
import Avatar from "./Avatar";
import Comments from "./Comments";

// Icons
import { BiMessageAltDetail } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

// Styles
import styledEditor from "./editor.module.css";

// Contexts
import { ProjectContext } from "../../../Context/ProjectContext";
import { UserContext } from "../../../Context/UserContext";

// Services
import {
    modifyProjectProps,
    updateProject,
} from "../../../Services/fetchProject";

// Mui
import { Alert, Snackbar } from "@mui/material";
import RichEditor from "./RichEditor";
import { convertToRaw } from "draft-js";

const Editor = (props) => {
    const { user } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);
    const { expand } = props;
    const [visible, setVisible] = useState();
    const [currentProject, setCurrentProject] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!currentProject || project.id !== currentProject.id) {
            setCurrentProject(project);
            setVisible(false);
        }
    }, [project, currentProject]);

    const handleClick = () => {
        let isValid = false;

        isValid = isValid
            ? isValid
            : Boolean(project.fullaccess.find((item) => item === user.id));
        isValid = isValid
            ? isValid
            : Boolean(project.canEdits.find((item) => item === user.id));
        isValid = isValid ? isValid : user.id === project.userId;

        if (!isValid) {
            setMessage("You can only view");
            setOpen(true);
        } else setVisible(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleAddIcon = () => {
        let isValid = false;

        isValid = isValid
            ? isValid
            : Boolean(project.fullaccess.find((item) => item === user.id));
        isValid = isValid
            ? isValid
            : Boolean(project.canEdits.find((item) => item === user.id));
        isValid = isValid ? isValid : user.id === project.userId;

        if (!isValid) {
            setMessage("You can not change the avatar of this project");
            setOpen(true);
        } else {
            modifyProjectProps(project.id, {
                ...project,
                avatar: [0, 0],
            }).then(() => {
                setProject((prev) => ({
                    ...prev,
                    avatar: [0, 0],
                }));
            });
        }
    };

    const handleInputChange = async (e) => {
        setProject((prev) => ({
            ...prev,
            name: e.target.value,
        }));

        const nProject = {
            ...project,
            name: e.target.value,
        };

        document.title = e.target.value;
        setProject(nProject);

        await updateProject(nProject);
    };

    const handleSave = async (state) => {
        const currentState = convertToRaw(state.getCurrentContent());
        const nProject = {
            ...project,
            state: currentState,
        };

        setProject(nProject);
        await updateProject(nProject);
    };

    const isChangeable =
        project.fullaccess.find((item) => item === user.id) ||
        project.canEdits.find((item) => item === user.id) ||
        project.userId === user.id;

    return (
        <div className={styledEditor.editor}>
            <div className={styledEditor.container}>
                <Cover user={user} />
                <div
                    style={{
                        width: expand ? "70%" : "60%",
                    }}
                    className={styledEditor.projectTitle}
                >
                    <Avatar
                        user={user}
                        project={project}
                        setProject={setProject}
                        visible={project.avatar.length > 0}
                    />
                    <div className={styledEditor.changes}>
                        {project.avatar.length === 0 && (
                            <div
                                className={`${styledEditor.change}`}
                                onClick={handleAddIcon}
                            >
                                <div>
                                    <BsEmojiSmile
                                        className="icon"
                                        style={{ fontSize: "20px" }}
                                    />
                                </div>
                                <div>Add Icon</div>
                            </div>
                        )}
                        {project.comments.length === 0 && !visible && (
                            <div
                                className={styledEditor.change}
                                onClick={handleClick}
                            >
                                <div>
                                    <BiMessageAltDetail
                                        className="icon"
                                        style={{ fontSize: "22px" }}
                                    />
                                </div>
                                <div>Add Comment</div>
                            </div>
                        )}
                    </div>
                    <input
                        className={styledEditor.input}
                        type="text"
                        value={project.name}
                        onChange={handleInputChange}
                        spellCheck={false}
                        placeholder="Untitled"
                        readOnly={
                            (Boolean(
                                project.canView.find((item) => item === user.id)
                            ) ||
                                Boolean(
                                    project.canComments.find(
                                        (item) => item === user.id
                                    )
                                )) &&
                            user.id !== project.userId &&
                            true
                        }
                    />
                    <Comments
                        visible={project.comments.length > 0 || visible}
                    />
                </div>
                <div
                    style={{
                        width: expand ? "70%" : "60%",
                        heigth: "100%",
                        paddingBottom: "10px",
                    }}
                >
                    <RichEditor
                        handleSave={handleSave}
                        isChangeable={isChangeable}
                    />
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="info"
                    sx={{
                        width: "100%",
                        background: "#0288d1",
                        color: "#fff",
                        svg: {
                            color: "#fff",
                        },
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Editor;
