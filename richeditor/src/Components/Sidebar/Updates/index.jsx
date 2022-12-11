import { Button, Popover } from "@mui/material";
import React, { useMemo, useState, useEffect, useContext } from "react";

import moment from "moment";

// Icons
import { HiOutlineClock } from "react-icons/hi";
import { FiInbox } from "react-icons/fi";
import { TbMessageCircleOff } from "react-icons/tb";
import { IoRemoveCircleOutline } from "react-icons/io5";

// Styles
import sidebar from "../sidebar.module.css";
import styledUpdate from "./updates.module.css";

// API
import {
    deleteInviteRequest,
    getInviteRequestsByType,
    updateInviteRequest,
} from "../../../Services/InviteApi";
import { getAllTreeByParentId } from "../../../Services/fetchProject";
import { updateUser } from "../../../Services/fetchUser";

// Contexts
import { UserContext } from "../../../Context/UserContext";
import { ProjectContext } from "../../../Context/ProjectContext";

const getTimeDiff = (cDate) => {
    const date = new Date(cDate);

    return moment(date).fromNow();
};

const Inbox = (props) => {
    const { handleClose } = props;

    const { user, setUser } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

    const [invitees, setInvitees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const proccess = async () => {
            const fetchTo = await getInviteRequestsByType("to", user.id);

            setInvitees(fetchTo.data);
            setLoading(false);
        };

        if (loading) proccess();
    }, [loading, user.id]);

    const handleAccepted = (inviteRequest) => {
        let toUser = inviteRequest.toUser;
        let cProject = inviteRequest.project;

        const proccessing = async () => {
            const projectsData = await getAllTreeByParentId(cProject.id);
            const projects = projectsData.data.map((item) => item.id);

            toUser = {
                ...toUser,
                publics: [...toUser.publics, ...projects],
            };

            await updateInviteRequest({
                ...inviteRequest,
                status: "accept",
            });

            setUser(toUser);
            updateUser(toUser);

            localStorage.setItem("currentUser", JSON.stringify(toUser));

            setProject({ ...project });

            setInvitees(
                invitees.filter((item) => item.id !== inviteRequest.id)
            );
            handleClose();
        };

        proccessing();
    };

    const handleRefused = async (inviteRequest) => {
        await updateInviteRequest({
            ...inviteRequest,
            status: "refuse",
        }).then((res) => {
            setInvitees(
                invitees.filter((item) => item.id !== inviteRequest.id)
            );
            handleClose();
        });
    };

    return (
        !loading && (
            <>
                {invitees.length > 0 ? (
                    <div className={styledUpdate.notifications}>
                        {invitees.map((item) => (
                            <div
                                className={styledUpdate.notification}
                                key={item.id}
                            >
                                <div className={styledUpdate.content}>
                                    <b>{item.fromUser.fullname}</b> invites you
                                    to his/her project{" "}
                                    <b>{item.project.name}</b>{" "}
                                </div>
                                <div className={styledUpdate.options}>
                                    <div
                                        className={styledUpdate.option}
                                        onClick={() => handleAccepted(item)}
                                    >
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                        >
                                            Accept
                                        </Button>
                                    </div>
                                    <div
                                        className={styledUpdate.option}
                                        onClick={() => handleRefused(item)}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                        >
                                            Refuse
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styledUpdate.empty}>
                        <div className={styledUpdate.icon}>
                            <FiInbox className={styledUpdate.inbox} />
                        </div>
                        <div
                            style={{
                                color: " rgb(55, 53, 47)",
                                fontWeight: "500",
                                marginBottom: "8px",
                            }}
                        >
                            You're all caught up
                        </div>
                        <div className={styledUpdate.message}>
                            When someone invites you to a page, you’ll be
                            notified here.
                        </div>
                    </div>
                )}
            </>
        )
    );
};

const Invite = (props) => {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const process = async () => {
            const fetchFrom = await getInviteRequestsByType("from", user.id);

            setNotifications(fetchFrom.data);
            setLoading(false);
        };

        if (loading) process();
    }, [loading, user.id]);

    const handleRemove = (deleteItem) => {
        deleteInviteRequest(deleteItem.id).then((res) => {
            setNotifications(
                notifications.filter((item) => item.id !== deleteItem.id)
            );
        });
    };

    return (
        !loading && (
            <>
                {notifications.length > 0 ? (
                    <div className={styledUpdate.notifies}>
                        {notifications.map((item) => (
                            <div className={styledUpdate.notify} key={item.id}>
                                <div
                                    className={styledUpdate.avatar}
                                    style={{
                                        background: item.toUser.color,
                                    }}
                                >
                                    {item.toUser.fullname.substring(0, 1)}
                                </div>
                                <div className={styledUpdate.notifyContent}>
                                    <div className={styledUpdate.text}>
                                        <b
                                            style={{
                                                color: "#000",
                                            }}
                                        >
                                            {item.toUser.fullname}
                                        </b>{" "}
                                        have {item.status} your request on{" "}
                                        <b
                                            style={{
                                                color: "#000",
                                            }}
                                        >
                                            {item.project.name}
                                        </b>{" "}
                                        project
                                    </div>
                                    <div className={styledUpdate.time}>
                                        {getTimeDiff(item.createdAt)}
                                    </div>
                                </div>
                                <div
                                    className={styledUpdate.changes}
                                    onClick={() => handleRemove(item)}
                                >
                                    <IoRemoveCircleOutline className="icon" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styledUpdate.empty}>
                        <div className={styledUpdate.icon}>
                            <TbMessageCircleOff
                                className={styledUpdate.inbox}
                            />
                        </div>
                        <div
                            style={{
                                color: " rgb(55, 53, 47)",
                                fontWeight: "500",
                                marginBottom: "8px",
                            }}
                        >
                            You're all caught up
                        </div>
                        <div className={styledUpdate.message}>
                            You doesn't have any notification
                        </div>
                    </div>
                )}
            </>
        )
    );
};

const Updates = (props) => {
    const { user } = props;

    const [anchorEl, setAnchorEl] = useState(false);
    const [selected, setSelected] = useState(1);

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div
                className={sidebar.setting}
                onClick={handleClick}
                style={{ background: open && "rgba(0, 0, 0, 0.1)" }}
            >
                <HiOutlineClock className="icon" style={{ fontSize: "26px" }} />
                <div className={sidebar.name}>Updates</div>
            </div>
            {open && (
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <div className={styledUpdate.container}>
                        <div className={styledUpdate.titles}>
                            <div
                                className={styledUpdate.title}
                                onClick={() => setSelected(1)}
                            >
                                Inbox
                                {selected === 1 && (
                                    <div className={styledUpdate.bar}></div>
                                )}
                            </div>
                            <div
                                className={styledUpdate.title}
                                onClick={() => setSelected(2)}
                            >
                                Invites
                                {selected === 2 && (
                                    <div className={styledUpdate.bar}></div>
                                )}
                            </div>
                            <div className="space-div"></div>
                        </div>

                        {selected === 1 && (
                            <Inbox
                                selected={selected}
                                user={user}
                                handleClose={handleClose}
                            />
                        )}
                        {selected === 2 && <Invite selected={selected} />}
                    </div>
                </Popover>
            )}
        </>
    );
};

export default Updates;
