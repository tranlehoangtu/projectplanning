// React
import React, { useState, useContext } from "react";

// Mui
import {
    Alert,
    Menu,
    MenuItem,
    Popover,
    Snackbar,
    styled,
} from "@mui/material";

// icons
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

// Styles
import styledTopbar from "../topbar.module.css";
import styledShare from "./share.module.css";

// Contexts
import { UserContext } from "../../../../Context/UserContext";
import { ProjectContext } from "../../../../Context/ProjectContext";

// Apis
import { getUserByEmail, updateUser } from "../../../../Services/fetchUser";
import { inviteRequests } from "../../../../Services/InviteApi";
import { getAllTreeByParentId } from "../../../../Services/fetchProject";

const StyledMenuItem = styled(MenuItem)(() => ({
    fontSize: "13px",
    color: "rgba(55, 53, 47, 0.65)",
    minWidth: "280px",
}));

const Share = () => {
    const { user, setUser } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(() => ({
        option: "Can edit",
        invitees: [],
        email: "",
        error: "",
        message: "Allow me to invite you :))",
    }));

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleTextChange = (e) => {
        setValues((prev) => ({
            ...prev,
            email: e.target.value,
        }));
    };

    const handleInvite = (e) => {
        e.preventDefault();

        const processing = async () => {
            if (values.invitees.length > 0) {
                const requests = values.invitees.map((item) => ({
                    projectId: project.id,
                    message: values.message,
                    fromUser: user.id,
                    toUser: item.id,
                    type: values.option,
                    status: "pending",
                }));

                await inviteRequests(requests);

                let nUser = null;
                const projectsData = await getAllTreeByParentId(project.id);
                const projects = projectsData.data;

                if (
                    user.publics.find((publicItem) => publicItem === project.id)
                ) {
                    nUser = { ...user };
                } else {
                    const nPrivates = user.privates.filter(
                        (privateItem) =>
                            !projects.find((item) => item.id === privateItem)
                    );
                    const nFavorites = user.favorites.filter(
                        (favorite) =>
                            !projects.find((item) => item.id === favorite)
                    );

                    const projectsId = projects.map((item) => item.id);
                    nUser = {
                        ...user,
                        privates: nPrivates,
                        favorites: nFavorites,
                        publics: [...user.publics, ...projectsId],
                    };
                }

                setUser(nUser);
                await updateUser(nUser);
                localStorage.setItem("currentUser", JSON.stringify(nUser));
                setProject(project);

                handleClose();
            } else {
                handleClose();
            }
        };

        processing();
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            if (
                user.email === values.email ||
                values.invitees.find((item) => item.content === values.email)
            ) {
                setValues((prev) => ({
                    ...prev,
                    error: "User cannot be duplicated",
                }));
            } else {
                await getUserByEmail(values.email).then((res) => {
                    if (res.data) {
                        const isNotValid =
                            project.fullaccess.find(
                                (item) => item === res.data.id
                            ) ||
                            project.canEdits.find(
                                (item) => item === res.data.id
                            ) ||
                            project.canComments.find(
                                (item) => item === res.data.id
                            ) ||
                            project.canView.find(
                                (item) => item === res.data.id
                            );
                        if (isNotValid) {
                            setValues((prev) => ({
                                ...prev,
                                error: "User already in project",
                            }));
                        } else {
                            setValues((prev) => ({
                                ...prev,
                                invitees: [...prev.invitees, res.data],
                                error: "",
                                email: "",
                            }));
                        }
                    } else {
                        setValues((prev) => ({
                            ...prev,
                            error: "No user found",
                        }));
                    }
                });
            }
        }
    };

    const handleRemove = (id) => {
        setValues((prev) => ({
            ...prev,
            invitees: prev.invitees.filter((item) => item.id !== id),
        }));
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [optionEl, setOptionEl] = useState(null);

    const open = Boolean(anchorEl);
    const optionOpen = Boolean(optionEl);

    const handleClick = (event) => {
        if (
            project.userId === user.id ||
            project.fullaccess.find((item) => item === user.id)
        ) {
            setAnchorEl(event.currentTarget);
        } else {
            setOpenSnackbar(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);

        setValues((prev) => ({
            ...prev,
            email: "",
            error: "",
            invitees: [],
        }));
    };

    const handleOptionClick = (event) => {
        setOptionEl(event.currentTarget);
    };

    const handleOptionClose = () => {
        setOptionEl(null);
    };

    return (
        <>
            <div
                className={`button ${styledTopbar.option}`}
                onClick={handleClick}
            >
                Share
            </div>
            <Popover
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
            >
                <div className={styledShare.container}>
                    <div
                        className={styledShare.textfield}
                        onClick={() => {
                            if (!edit) {
                                setEdit(true);
                            }
                        }}
                    >
                        {!edit && (
                            <>
                                <input
                                    type="text"
                                    className={styledShare.input}
                                    placeholder="Add email"
                                    readOnly
                                />
                                <button className={styledShare.button}>
                                    Invite
                                </button>
                            </>
                        )}
                        {edit && (
                            <div className={styledShare.inputWrapper}>
                                <div className={styledShare.textWrapper}>
                                    <div className={styledShare.invitees}>
                                        {values.invitees.map((item) => (
                                            <div
                                                className={styledShare.invitee}
                                                key={item.id}
                                            >
                                                {item.email}
                                                <FaTimes
                                                    onClick={() =>
                                                        handleRemove(item.id)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        className={styledShare.text}
                                        placeholder="Add by email (use exact email)"
                                        value={values.email}
                                        onChange={handleTextChange}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    />
                                </div>
                                <div style={{ padding: "10px 6px" }}>
                                    <div
                                        className={styledShare.option}
                                        onClick={handleOptionClick}
                                    >
                                        <div style={{ fontSize: "13px" }}>
                                            {values.option}
                                        </div>
                                        <div>
                                            <AiOutlineCaretDown
                                                style={{
                                                    display: "block",
                                                    fontSize: "12px",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Menu
                                    anchorEl={optionEl}
                                    open={optionOpen}
                                    onClose={handleOptionClose}
                                >
                                    <StyledMenuItem
                                        onClick={(e) => {
                                            if (values.option !== "Full access")
                                                setValues((prev) => ({
                                                    ...prev,
                                                    option: "Full access",
                                                }));
                                            handleOptionClose(e);
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    color: "#000",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Full access
                                            </div>
                                            <div>
                                                Can edit and share with others
                                            </div>
                                        </div>
                                        {values.option === "Full access" && (
                                            <BsCheckLg />
                                        )}
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={(e) => {
                                            if (values.option !== "Can edit")
                                                setValues((prev) => ({
                                                    ...prev,
                                                    option: "Can edit",
                                                }));
                                            handleOptionClose(e);
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    color: "#000",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Can Edit
                                            </div>
                                            <div>
                                                Can edit, but share with others
                                            </div>
                                        </div>
                                        {values.option === "Can edit" && (
                                            <BsCheckLg />
                                        )}
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={(e) => {
                                            if (values.option !== "Can comment")
                                                setValues((prev) => ({
                                                    ...prev,
                                                    option: "Can comment",
                                                }));

                                            handleOptionClose(e);
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    color: "#000",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Can Comment
                                            </div>
                                            <div>
                                                Can view and comment, but not
                                                edit
                                            </div>
                                        </div>
                                        {values.option === "Can comment" && (
                                            <BsCheckLg />
                                        )}
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={(e) => {
                                            if (values.option !== "Can view")
                                                setValues((prev) => ({
                                                    ...prev,
                                                    option: "Can view",
                                                }));
                                            handleOptionClose(e);
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    color: "#000",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Can View
                                            </div>
                                            <div>
                                                Cannot edit or share with others
                                            </div>
                                        </div>
                                        {values.option === "Can view" && (
                                            <BsCheckLg />
                                        )}
                                    </StyledMenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>
                    {values.error.length > 0 && (
                        <div
                            style={{
                                padding: "6px 14px",
                                fontSize: "13px",
                                color: "red",
                            }}
                        >
                            {values.error}
                        </div>
                    )}
                    <div className={styledShare.notification}>
                        {edit ? (
                            <div className={styledShare.message}>
                                <textarea
                                    className={styledShare.textarea}
                                    placeholder="Say something to the one you invite"
                                    rows={5}
                                    value={values.message}
                                    onChange={(e) => {
                                        setValues((prev) => ({
                                            ...prev,
                                            message: e.target.value,
                                        }));
                                    }}
                                />
                                <div className={styledShare.buttons}>
                                    <button
                                        className={styledShare.cancel}
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={styledShare.button}
                                        onClick={handleInvite}
                                    >
                                        Invite
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "22px",
                                }}
                            >
                                Here where you can invites or shares your
                                project with other people
                            </p>
                        )}
                    </div>
                </div>
            </Popover>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    sx={{
                        width: "100%",
                        background: "#d32f2f",
                        color: "#fff",
                        svg: {
                            color: "#fff",
                        },
                    }}
                >
                    You don't have any permission to share this project
                </Alert>
            </Snackbar>
        </>
    );
};

export default Share;
