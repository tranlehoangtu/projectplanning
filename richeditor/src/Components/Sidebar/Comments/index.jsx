import React, { useRef, useState } from "react";

import { Button, Modal, Popover, Typography } from "@mui/material";

import {
    AiFillCheckCircle,
    AiOutlineEdit,
    AiOutlineSend,
} from "react-icons/ai";
import {
    BsCheckLg,
    BsPlusCircleDotted,
    BsThreeDots,
    BsTrash,
} from "react-icons/bs";

import { FaRedoAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

import { MdCancel } from "react-icons/md";

import commentModule from "./comment.module.css";

import { Box } from "@mui/system";
import { useEffect } from "react";
import {
    getProjectById,
    modifyProjectProps,
} from "../../../Services/fetchProject";

const convertTime = (date) => {
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

    let currentDate = new Date();

    const t = currentDate.getTime() - date.getTime();

    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000);

    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }

    if (d === 0 && h === 0 && m === 0) {
        return "Just Now";
    } else if (d === 0 && h === 0) {
        return `${m} minutes ago`;
    } else if (d === 0) {
        return `${m} hours ago`;
    } else if (d <= 30) {
        return `${d} days ago`;
    }

    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
};

const getTimeDiff = (createdAt, editedAt) => {
    let cDate = new Date(createdAt);
    let eDate = new Date(editedAt);

    if (cDate.getMilliseconds === eDate.getMilliseconds) {
        return convertTime(cDate);
    }

    return convertTime(eDate);
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
};

const Comment = (props) => {
    const {
        comment,
        resolved,
        handleCommentChecked,
        handleCommentDelete,
        modifyComment,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [modal, setModal] = useState(false);

    const optionsRef = useRef(null);
    const inputRef = useRef(null);

    const handleClick = (event) => {
        optionsRef.current.classList.add(commentModule.show);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        optionsRef.current.classList.remove(commentModule.show);
        setAnchorEl(null);
    };

    const handleCheck = () => {
        handleCommentChecked(comment);
    };

    const handleEdit = () => {
        inputRef.current.focus();
        setEdit(true);
        handleClose();
    };

    const handleCommentDeleteClick = () => {
        setModal(false);
        handleCommentDelete(comment.id);
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <div className={commentModule.comment}>
                <div className={commentModule.avatar}>
                    {comment.username.substring(0, 1)}
                </div>
                <div className={commentModule.info} style={{ flex: 1 }}>
                    <div className={commentModule.usernameWrapper}>
                        <div className={commentModule.username}>
                            {comment.username}
                        </div>
                        <div className={commentModule.time}>
                            {getTimeDiff(comment.createdAt, comment.editedAt)}
                        </div>
                    </div>
                    {/* <div className={commentModule.content}>
                        {comment.content}
                    </div> */}
                    <input
                        ref={inputRef}
                        type="text"
                        readOnly={edit ? false : true}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={commentModule.content}
                    />
                </div>
                <div className={`${commentModule.options}`} ref={optionsRef}>
                    <div className={`icon ${commentModule.option}`}>
                        <BsPlusCircleDotted />
                    </div>
                    {!resolved ? (
                        <div
                            className={`icon ${commentModule.option}`}
                            onClick={handleCheck}
                        >
                            <BsCheckLg />
                        </div>
                    ) : (
                        <div
                            className={`icon ${commentModule.option}`}
                            onClick={handleCheck}
                        >
                            <FaRedoAlt />
                        </div>
                    )}
                    <div
                        className={`icon ${commentModule.option}`}
                        onClick={handleClick}
                    >
                        <BsThreeDots />
                    </div>
                </div>
            </div>
            {edit && (
                <div className={commentModule.changes}>
                    <MdCancel
                        className={`icon ${commentModule.cancel}`}
                        onClick={() => {
                            setEdit(false);
                            setContent(comment.content);
                        }}
                    />
                    <AiFillCheckCircle
                        className={`icon ${commentModule.check}`}
                        onClick={() => {
                            setEdit(false);
                            modifyComment({ ...comment, content: content });
                        }}
                    />
                </div>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                }}
                sx={{
                    "& .MuiPaper-root": {
                        overflowX: "unset",
                        overflowY: "unset",
                    },
                }}
            >
                <Box className={commentModule.edits}>
                    <div className={commentModule.edit} onClick={handleEdit}>
                        <AiOutlineEdit
                            className="icon"
                            style={{ marginRight: "4px", fontSize: "24px" }}
                        />
                        <span>Edit Comment</span>
                    </div>
                    <div
                        className={commentModule.edit}
                        onClick={() => {
                            setModal(true);
                            handleClose();
                        }}
                    >
                        <BsTrash
                            className="icon"
                            style={{ marginRight: "4px", fontSize: "24px" }}
                        />
                        <span>Delete Comment</span>
                    </div>
                </Box>
            </Popover>
            <Modal open={modal} onClose={handleModalClose}>
                <Box sx={style}>
                    <div style={{ marginBottom: "20px" }}>
                        <Typography>
                            Would you like to delete this comment?
                        </Typography>
                    </div>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ width: "100%" }}
                        onClick={handleCommentDeleteClick}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ width: "100%" }}
                        onClick={() => setModal(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

const Comments = (props) => {
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");
    const [project, setProject] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const { projectId, username, updateComments, visible } = props;

    useEffect(() => {
        const loading = async () => {
            const currentProject = await getProjectById(projectId);

            setProject(currentProject.data);
            setLoading(false);
        };

        loading();
    }, [projectId]);

    const handleSend = () => {
        let index = -1;

        project.comments.forEach((item) => {
            index = item.id > index ? item.id : index;
        });

        const nComment = {
            id: `${parseInt(index) + 1}`,
            username: username,
            content: input,

            createdAt: new Date(),
            editedAt: new Date(),

            resolved: false,
        };

        const nProject = {
            ...project,
            comments: [...project.comments, nComment],
        };

        modifyProjectProps(projectId, nProject).then(() => {
            setProject(nProject);
            setInput("");
            updateComments(nProject);
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    const handleCommentChecked = (comment) => {
        comment = { ...comment, resolved: !comment.resolved };

        const nProject = {
            ...project,
            comments: project.comments.map((item) => {
                if (item.id === comment.id) return comment;
                return item;
            }),
        };

        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
            updateComments(nProject);
        });
    };

    const handleCommentUnChecked = (comment) => {
        comment = { ...comment, resolved: !comment.resolved };

        const nProject = {
            ...project,
            comments: project.comments.map((item) => {
                if (item.id === comment.id) return comment;
                return item;
            }),
        };

        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
            updateComments(nProject);
        });

        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCommentDelete = (id) => {
        const nProject = {
            ...project,
            comments: project.comments.filter((item) => item.id !== id),
        };

        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
            updateComments(nProject);
        });
    };

    const modifyComment = (comment) => {
        const nProject = {
            ...project,
            comments: project.comments.map((item) => {
                if (item.id === comment.id) return comment;
                return item;
            }),
        };

        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
            updateComments(nProject);
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            {!loading && (
                <div className={commentModule.container}>
                    <div className={commentModule.comments}>
                        {project.comments
                            .filter(
                                (projectItem) => projectItem.resolved === false
                            )
                            .map((item) => {
                                return (
                                    <Comment
                                        key={item.id}
                                        comment={item}
                                        resolved={false}
                                        handleCommentChecked={
                                            handleCommentChecked
                                        }
                                        handleCommentDelete={
                                            handleCommentDelete
                                        }
                                        modifyComment={modifyComment}
                                    />
                                );
                            })}
                        {visible && (
                            <div className={commentModule.textfield}>
                                <div className={commentModule.name}>
                                    {username.substring(0, 1)}
                                </div>
                                <div className={commentModule.inputWrapper}>
                                    <input
                                        type="text"
                                        className={commentModule.input}
                                        placeholder="Add a comment"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div>
                                    {input.length === 0 && <AiOutlineSend />}
                                    {input.length !== 0 && (
                                        <IoMdSend
                                            style={{
                                                color: "#2383e2",
                                                cursor: "pointer",
                                            }}
                                            onClick={handleSend}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        {project.comments.filter(
                            (comment) => comment.resolved === true
                        ).length > 0 && (
                            <>
                                <div
                                    className={commentModule.resolves}
                                    onClick={handleClick}
                                >
                                    <BsCheckLg
                                        className={`icon`}
                                        style={{
                                            fontSize: "22px",
                                            fontWeight: 400,
                                        }}
                                    />
                                    <div>
                                        <span>
                                            {
                                                project.comments.filter(
                                                    (comment) =>
                                                        comment.resolved ===
                                                        true
                                                ).length
                                            }
                                        </span>
                                        <span> resolved comments</span>
                                    </div>
                                </div>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    sx={{
                                        "& .MuiPaper-root": {
                                            overflowX: "unset",
                                            overflowY: "unset",
                                        },
                                    }}
                                >
                                    <div
                                        className={`${commentModule.comments} ${commentModule.resolvedComments}`}
                                    >
                                        {project.comments
                                            .filter(
                                                (projectItem) =>
                                                    projectItem.resolved ===
                                                    true
                                            )
                                            .map((item) => {
                                                return (
                                                    <Comment
                                                        key={item.id}
                                                        comment={item}
                                                        handleCommentChecked={
                                                            handleCommentUnChecked
                                                        }
                                                        resolved={true}
                                                    />
                                                );
                                            })}
                                    </div>
                                </Popover>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
