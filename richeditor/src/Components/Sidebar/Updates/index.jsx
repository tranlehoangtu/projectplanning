import { Button, Popover } from "@mui/material";
import React, { useMemo, useState } from "react";

import moment from "moment";

// Icons
import { HiOutlineClock } from "react-icons/hi";
import { FiInbox } from "react-icons/fi";
import { TbMessageCircleOff } from "react-icons/tb";
import { IoRemoveCircleOutline } from "react-icons/io5";

// Styles
import sidebar from "../sidebar.module.css";
import styledUpdate from "./updates.module.css";
import { useEffect } from "react";
import {
    deleteInviteRequest,
    getInviteRequestsByType,
    updateInviteRequest,
} from "../../../Services/InviteApi";

// const colors = [
//     "lightgreen",
//     "lightblue",
//     "lightcoral",
//     "lightgoldenrodyellow",
//     "lightseagreen",
// ];

const getTimeDiff = (cDate) => {
    const date = new Date(cDate);

    return moment(date).fromNow();
};

const Updates = (props) => {
    const { user } = props;

    const [anchorEl, setAnchorEl] = useState(false);
    const [selected, setSelected] = useState(1);

    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState(() => ({
        invitees: [],
        notifications: [],
    }));
    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    useEffect(() => {
        const loading = async () => {
            const fetchTo = await getInviteRequestsByType("to", user.id);
            const fetchFrom = await getInviteRequestsByType("from", user.id);

            setValues((prev) => ({
                ...prev,
                invitees: fetchTo.data,
                notifications: fetchFrom.data,
            }));
            setLoading(false);
        };
        loading();
    }, [user]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccepted = (inviteRequest) => {
        updateInviteRequest({
            ...inviteRequest,
            status: "accept",
        }).then((res) => {
            setValues((prev) => ({
                ...prev,
                invitees: prev.invitees.filter(
                    (item) => item.id !== inviteRequest.id
                ),
            }));
            handleClose();
        });
    };

    const handleRefused = (inviteRequest) => {
        updateInviteRequest({
            ...inviteRequest,
            status: "refuse",
        }).then((res) => {
            setValues((prev) => ({
                ...prev,
                invitees: prev.invitees.filter(
                    (item) => item.id !== inviteRequest.id
                ),
            }));
            handleClose();
        });
    };

    const handleRemove = (deleteItem) => {
        deleteInviteRequest(deleteItem.id).then((res) => {
            setValues((prev) => ({
                ...prev,
                notifications: prev.notifications.filter(
                    (item) => item.id !== deleteItem.id
                ),
            }));
        });
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
            {!loading && (
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
                            <>
                                {values.invitees.length > 0 ? (
                                    <div className={styledUpdate.notifications}>
                                        {values.invitees.map((item) => (
                                            <div
                                                className={
                                                    styledUpdate.notification
                                                }
                                                key={item.id}
                                            >
                                                <div
                                                    className={
                                                        styledUpdate.content
                                                    }
                                                >
                                                    <b>
                                                        {item.fromUser.fullname}
                                                    </b>{" "}
                                                    invites you to his/her
                                                    project
                                                </div>
                                                <div
                                                    className={
                                                        styledUpdate.options
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styledUpdate.option
                                                        }
                                                        onClick={() =>
                                                            handleAccepted(item)
                                                        }
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
                                                        className={
                                                            styledUpdate.option
                                                        }
                                                        onClick={() =>
                                                            handleRefused(item)
                                                        }
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
                                            <FiInbox
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
                                            When someone invites you to a page,
                                            you’ll be notified here.
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {selected === 2 && (
                            <>
                                {values.notifications.length > 0 ? (
                                    <div className={styledUpdate.notifies}>
                                        {values.notifications.map((item) => (
                                            <div
                                                className={styledUpdate.notify}
                                                key={item.id}
                                            >
                                                <div
                                                    className={
                                                        styledUpdate.avatar
                                                    }
                                                    style={{
                                                        background:
                                                            item.toUser.color,
                                                    }}
                                                >
                                                    {item.toUser.fullname.substring(
                                                        0,
                                                        1
                                                    )}
                                                </div>
                                                <div
                                                    className={
                                                        styledUpdate.notifyContent
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styledUpdate.text
                                                        }
                                                    >
                                                        <b
                                                            style={{
                                                                color: "#000",
                                                            }}
                                                        >
                                                            {
                                                                item.toUser
                                                                    .fullname
                                                            }
                                                        </b>{" "}
                                                        have {item.status} your
                                                        request on{" "}
                                                        <b
                                                            style={{
                                                                color: "#000",
                                                            }}
                                                        >
                                                            {item.project.name}
                                                        </b>{" "}
                                                        project
                                                    </div>
                                                    <div
                                                        className={
                                                            styledUpdate.time
                                                        }
                                                    >
                                                        {getTimeDiff(
                                                            item.createdAt
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styledUpdate.changes
                                                    }
                                                    onClick={() =>
                                                        handleRemove(item)
                                                    }
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
                        )}
                    </div>
                </Popover>
            )}
        </>
    );
};

export default Updates;
