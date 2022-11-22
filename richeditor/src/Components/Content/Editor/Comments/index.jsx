// React
import React, { useRef, useState } from "react";

// MUI
import { Box, Button, Modal, Popover, Typography } from "@mui/material";

// Icons
import {
    AiFillCheckCircle,
    AiOutlineEdit,
    AiOutlineSend,
} from "react-icons/ai";
import { BsCheckLg, BsThreeDots, BsTrash } from "react-icons/bs";
import { FaRedoAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdCancel } from "react-icons/md";

// Contexts
import { ProjectContext } from "../../../../Context/ProjectContext";
import { UserContext } from "../../../../Context/UserContext";

// Services
import { modifyProjectProps } from "../../../../Services/fetchProject";
import { useContext } from "react";

// Styles
import commentModule from "./comment.module.css";
import { BiReply } from "react-icons/bi";

const bblSort = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            let jdate = new Date(arr[j].editedAt);
            let jpdate = new Date(arr[j + 1].editedAt);

            if (jdate.getTime() < jpdate.getTime()) {
                // If the condition is true then swap them
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

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
        handleReply,
        comments,
        comment,
        resolved,
        handleCommentChecked,
        handleCommentDelete,
        modifyComment,
        user,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [modal, setModal] = useState(false);
    const [reply, setReply] = useState(false);
    const [inputRep, setInputRep] = useState("");

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

    const handleReplyClick = () => {
        setReply(true);
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
                    <input
                        ref={inputRef}
                        type="text"
                        readOnly={edit ? false : true}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                setEdit(false);
                                modifyComment({ ...comment, content: content });
                            } else if (event.key === "Escape") {
                                setEdit(false);
                                setContent(comment.content);
                            }
                        }}
                        className={commentModule.content}
                        spellCheck={false}
                    />
                </div>
                <div className={`${commentModule.options}`} ref={optionsRef}>
                    {comment.parent === "-1" && (
                        <div
                            onClick={handleReplyClick}
                            className={`icon ${commentModule.option}`}
                            style={{ fontSize: "22px" }}
                        >
                            <BiReply />
                        </div>
                    )}
                    {comment.parent === "-1" && (
                        <>
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
                        </>
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
            {/* Current Work */}
            {reply && (
                <div style={{ paddingLeft: "38px" }}>
                    <div className={commentModule.textfield}>
                        <div className={commentModule.name}>
                            {user.fullname.substring(0, 1)}
                        </div>
                        <div className={commentModule.inputWrapper}>
                            <input
                                type="text"
                                placeholder="Add a comment"
                                value={inputRep}
                                onChange={(e) => setInputRep(e.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleReply(comment.id, inputRep);
                                        setReply(false);
                                    } else if (event.key === "Escape") {
                                        setReply(false);
                                        setInputRep("");
                                    }
                                }}
                                className={commentModule.input}
                                autoFocus={true}
                            />
                        </div>
                    </div>
                    <div className={commentModule.changes}>
                        <MdCancel
                            className={`icon ${commentModule.cancel}`}
                            onClick={() => {
                                setReply(false);
                                setInputRep("");
                            }}
                        />
                        <AiFillCheckCircle
                            className={`icon ${commentModule.check}`}
                            onClick={() => {
                                setReply(false);
                                handleReply(comment.id, inputRep);
                            }}
                        />
                    </div>
                </div>
            )}

            <div style={{ paddingLeft: "38px" }}>
                {comments
                    .filter((item) => item.parent === comment.id)
                    .map((childComment) => (
                        <Comment
                            handleReply={handleReply}
                            user={user}
                            comments={comments}
                            comment={childComment}
                            resolved={resolved}
                            handleCommentChecked={handleCommentChecked}
                            handleCommentDelete={handleCommentDelete}
                            modifyComment={modifyComment}
                            key={childComment.id}
                        />
                    ))}
            </div>
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
    const { user } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

    // const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const { visible } = props;

    const handleSend = (parent) => {
        let index = -1;
        project.comments.forEach((item) => {
            index = item.id > index ? item.id : index;
        });
        const nComment = {
            id: `${parseInt(index) + 1}`,
            username: user.fullname,
            content: input,
            createdAt: new Date(),
            editedAt: new Date(),
            resolved: false,
            parent: parent,
        };
        const nProject = {
            ...project,
            comments: [...project.comments, nComment],
        };
        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
            setInput("");
        });
    };

    const handleReply = (parent, content) => {
        let index = -1;
        project.comments.forEach((item) => {
            index = item.id > index ? item.id : index;
        });
        const nComment = {
            id: `${parseInt(index) + 1}`,
            username: user.fullname,
            content: content,
            createdAt: new Date(),
            editedAt: new Date(),
            resolved: false,
            parent: parent,
        };
        const nProject = {
            ...project,
            comments: [...project.comments, nComment],
        };
        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
            setInput("");
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSend("-1");
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
            comments: project.comments.filter(
                (item) => item.id !== id && item.parent !== id
            ),
        };

        modifyProjectProps(project.id, nProject).then(() => {
            setProject(nProject);
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
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            {true && (
                <div className={commentModule.container}>
                    <div className={commentModule.comments}>
                        {visible && (
                            <div className={commentModule.textfield}>
                                <div className={commentModule.name}>
                                    {user.fullname.substring(0, 1)}
                                </div>
                                <div className={commentModule.inputWrapper}>
                                    <input
                                        type="text"
                                        placeholder="Add a comment"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        className={commentModule.input}
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
                                            onClick={() => handleSend("-1")}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        {bblSort(project.comments)
                            .filter(
                                (projectItem) =>
                                    projectItem.resolved === false &&
                                    projectItem.parent === "-1"
                            )
                            .map((item) => {
                                return (
                                    <Comment
                                        handleReply={handleReply}
                                        user={user}
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
                                        comments={project.comments}
                                    />
                                );
                            })}
                        {project.comments.filter(
                            (comment) =>
                                comment.resolved === true &&
                                comment.parent === "-1"
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
                                        vertical: "bottom",
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
                                        {bblSort(project.comments)
                                            .filter(
                                                (comment) =>
                                                    comment.resolved === true &&
                                                    comment.parent === "-1"
                                            )
                                            .map((item) => (
                                                <Comment
                                                    handleReply={handleReply}
                                                    user={user}
                                                    key={item.id}
                                                    comment={item}
                                                    handleCommentChecked={
                                                        handleCommentUnChecked
                                                    }
                                                    resolved={true}
                                                    handleCommentDelete={
                                                        handleCommentDelete
                                                    }
                                                    modifyComment={
                                                        modifyComment
                                                    }
                                                    comments={project.comments}
                                                />
                                            ))}
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
