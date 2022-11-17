import React, { useState } from "react";
import Cover from "../../Sidebar/Cover";
import Avatar from "./Avatar";

// Icons
import { BiMessageAltDetail } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

// Styles
import styledEditor from "./editor.module.css";

const Editor = (props) => {
    const {
        project,
        expand,
        handleCoverChanged,
        handleAvatarChange,
        handleAvatarAdd,
    } = props;
    const [visible, setVisible] = useState();

    return (
        <div className={styledEditor.editor}>
            <Cover
                projectId={project.id}
                handleCoverChanged={handleCoverChanged}
            />
            <div
                style={{
                    padding: expand ? "0 340px" : "0 380px",
                }}
                className={styledEditor.projectTitle}
            >
                <Avatar
                    visible={project.avatar.length > 0}
                    projectId={project.id}
                    handleAvatarChange={handleAvatarChange}
                />
                <div className={styledEditor.changes}>
                    {project.avatar.length === 0 && (
                        <div
                            className={styledEditor.change}
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
                            className={styledEditor.change}
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
                {/* <input
                    className={styledEditor.input}
                    type="text"
                    value={project.name}
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
                    projectId={project.id}
                    username={datas.currentUser.fullname}
                    updateComments={updateComments}
                    visible={visible}
                /> */}
            </div>
            <div>Editor</div>
            {/* <button onClick={handleSave}>Save</button> */}
        </div>
    );
};

export default Editor;
