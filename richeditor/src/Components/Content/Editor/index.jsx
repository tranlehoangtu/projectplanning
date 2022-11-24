// Reacts

import React, { useContext, useState } from "react";

// Components
import Cover from "./Cover";
import Avatar from "./Avatar";
import Comments from "./Comments";

// Icons
import { BiMessageAltDetail } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

// Styles
import styledEditor from "./editor.module.css";

// Services
import { ProjectContext } from "../../../Context/ProjectContext";
import { modifyProjectProps } from "../../../Services/fetchProject";

const Editor = (props) => {
    const { project, setProject } = useContext(ProjectContext);
    const { expand } = props;
    const [visible, setVisible] = useState();

    return (
        <div className={styledEditor.editor}>
            <div className={styledEditor.container}>
                <Cover />
                <div
                    style={{
                        // padding: expand ? "0 340px" : "0 380px",
                        width: expand ? "70%" : "60%",
                    }}
                    className={styledEditor.projectTitle}
                >
                    <Avatar
                        visible={project.avatar.length > 0}
                        projectId={project.id}
                    />
                    <div className={styledEditor.changes}>
                        {project.avatar.length === 0 && (
                            <div
                                className={styledEditor.change}
                                onClick={() =>
                                    modifyProjectProps(project.id, {
                                        ...project,
                                        avatar: [0, 0],
                                    }).then(() => {
                                        setProject((prev) => ({
                                            ...prev,
                                            avatar: [0, 0],
                                        }));
                                    })
                                }
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
                                onClick={() => setVisible(true)}
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
                        onChange={(e) => {
                            setProject((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }));

                            document.title = e.target.value;
                        }}
                        spellCheck={false}
                        placeholder="Untitled"
                    />
                    <Comments
                        visible={project.comments.length > 0 || visible}
                    />
                </div>
                <div style={{ height: "100vh" }}>Editor</div>
                {/* <button onClick={handleSave}>Save</button> */}
            </div>
        </div>
    );
};

export default Editor;
