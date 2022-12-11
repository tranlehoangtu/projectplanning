// Reacts
import React, { useEffect, useState } from "react";

// Mui
import { Modal, Popover } from "@mui/material";
import { Box } from "@mui/system";

// icons
import { IoMdSettings } from "react-icons/io";
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowLeft,
    MdLastPage,
    MdFirstPage,
} from "react-icons/md";
import { HiBan } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";

// styles
import sidebar from "../../sidebar.module.css";
import styled from "./settingnMember.module.css";

// Service Api
import { getUserById } from "../../../../Services/fetchUser";
import { getProjectById } from "../../../../Services/fetchProject";
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    minHeight: 300,
    bgcolor: "#fff",
    border: "2px solid #000",
    borderRadius: "4px",
    boxShadow: 24,
    overflow: "hidden",
    fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const Roles = (props) => {
    const { role } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleRoleChange = () => {
        console.log("Hello World");
    };

    return (
        <div>
            <div onClick={handleClick}>{role}</div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <div className={styled.popCon}>
                    <div
                        className={styled.popOption}
                        onClick={handleRoleChange}
                    >
                        Full access
                    </div>
                    <div
                        className={styled.popOption}
                        onClick={handleRoleChange}
                    >
                        Can edit
                    </div>
                    <div
                        className={styled.popOption}
                        onClick={handleRoleChange}
                    >
                        Can comment
                    </div>
                    <div
                        className={styled.popOption}
                        onClick={handleRoleChange}
                    >
                        Can view
                    </div>
                </div>
            </Popover>
        </div>
    );
};

const Groups = (props) => {
    const { user, handleClose } = props;

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(() => ({
        page: 0,
        rowPerPage: 5,
    }));

    const handleSelect = (e) => {
        const nRowPerPage = e.target.value;
        setPages((prev) => ({
            ...prev,
            rowPerPage: nRowPerPage,
        }));
    };

    const handleClick = (id) => {
        handleClose();
        navigate(`/${id}`);
    };

    useEffect(() => {
        const processing = async () => {
            const publics = user.publics;

            let realProjects = [];
            for (var i = 0; i < publics.length; i++) {
                const dProject = await getProjectById(publics[i]);
                realProjects = [...realProjects, dProject.data];
            }

            const rootProject = realProjects.filter(
                (item) => item.parent === "0"
            );

            const lastProjects = rootProject.map((item) => {
                let role = null;

                if (!role && item.userId === user.id) role = "Leader";
                else if (
                    !role &&
                    Boolean(item.fullaccess.find((item) => item === user.id))
                )
                    role = "Full Access";
                else if (
                    !role &&
                    Boolean(item.canComments.find((item) => item === user.id))
                )
                    role = "Can Comment";
                else if (
                    !role &&
                    Boolean(item.canEdits.find((item) => item === user.id))
                )
                    role = "Can Edit";
                else if (
                    !role &&
                    Boolean(item.canView.find((item) => item === user.id))
                )
                    role = "Can View";

                return {
                    id: item.id,
                    name: item.name,
                    role: role ? role : "Member",
                };
            });

            setProjects(lastProjects);
            setLoading(false);
        };

        if (loading) processing();
    }, [user.id, user.publics, loading]);

    const fromPage = pages.page * pages.rowPerPage + 1;
    const toPage = (pages.page + 1) * pages.rowPerPage;
    const numsOfUsers = projects.length;
    const maxRow = Math.ceil(numsOfUsers / pages.rowPerPage);

    return (
        <>
            {!loading && (
                <>
                    {projects.length === 0 ? (
                        <div className={styled.groupCon}>
                            <div
                                style={{
                                    fontSize: "20px",
                                    textTransform: "uppercase",
                                }}
                            >
                                You haven't joined any group
                            </div>
                            <div className={styled.iconCon}>
                                <HiBan
                                    className={styled.icon}
                                    style={{ fontSize: "40px" }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className={styled.tableCon}>
                                <table className={styled.table}>
                                    <thead>
                                        <tr>
                                            <th align="left">ID</th>
                                            <th align="left">Name</th>
                                            <th align="left">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects
                                            .filter((item, index) => {
                                                return (
                                                    index <= toPage &&
                                                    index >= fromPage - 1
                                                );
                                            })
                                            .map((item) => (
                                                <tr
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleClick(item.id)
                                                    }
                                                >
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <Roles
                                                            role={item.role}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styled.conn}>
                                <div style={{ flex: 1 }}></div>
                                <div className={styled.configs}>
                                    <div style={{ flex: 1 }}></div>
                                    <div>Rows per page:</div>
                                    <div>
                                        <select
                                            name=""
                                            id=""
                                            onChange={handleSelect}
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                    <div>
                                        {fromPage} -{" "}
                                        {toPage < numsOfUsers
                                            ? toPage
                                            : numsOfUsers}{" "}
                                        of {numsOfUsers}
                                    </div>
                                </div>
                                <div className={styled.changes}>
                                    <div
                                        className={`${styled.iconCon} ${
                                            pages.page - 1 < 0 && styled.dis
                                        }`}
                                        onClick={() =>
                                            setPages((prev) => ({
                                                ...prev,
                                                page: 0,
                                            }))
                                        }
                                    >
                                        <MdFirstPage
                                            className={`${styled.icon}`}
                                        />
                                    </div>
                                    <div
                                        className={`${styled.iconCon} ${
                                            pages.page - 1 < 0 && styled.dis
                                        }`}
                                        onClick={() =>
                                            setPages((prev) => ({
                                                ...prev,
                                                page: prev.page - 1,
                                            }))
                                        }
                                    >
                                        <MdOutlineKeyboardArrowLeft
                                            className={`${styled.icon}`}
                                        />
                                    </div>
                                    <div
                                        className={`${styled.iconCon} ${
                                            pages.page + 2 > maxRow &&
                                            styled.dis
                                        }`}
                                        onClick={() =>
                                            setPages((prev) => ({
                                                ...prev,
                                                page: prev.page + 1,
                                            }))
                                        }
                                    >
                                        <MdOutlineKeyboardArrowRight
                                            className={`${styled.icon}`}
                                        />
                                    </div>
                                    <div
                                        className={`${styled.iconCon} ${
                                            pages.page + 2 > maxRow &&
                                            styled.dis
                                        }`}
                                        onClick={() =>
                                            setPages((prev) => ({
                                                ...prev,
                                                page: maxRow - 1,
                                            }))
                                        }
                                    >
                                        <MdLastPage
                                            className={`${styled.icon}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

const Members = (props) => {
    const { project } = props;

    const [values, setValues] = useState(() => ({
        users: [],
    }));

    const [isLoading, setIsLoading] = useState(true);

    const [pages, setPages] = useState(() => ({
        rowPerPage: 5,
        page: 0,
    }));

    useEffect(() => {
        const loading = async () => {
            let users = [];

            users = [
                ...users,
                ...project.fullaccess.map((item) => ({
                    user: item,
                    role: "Full Access",
                })),
            ];
            users = [
                ...users,
                ...project.canComments.map((item) => ({
                    user: item,
                    role: "Can Comment",
                })),
            ];
            users = [
                ...users,
                ...project.canView.map((item) => ({
                    user: item,
                    role: "Can View",
                })),
            ];
            users = [
                ...users,
                ...project.canEdits.map((item) => ({
                    user: item,
                    role: "Can Edit",
                })),
            ];

            users =
                users.length === 0
                    ? [{ user: project.userId, role: "Full Access" }]
                    : users.map((item) =>
                          item.user === project.userId
                              ? { ...item, role: "Full Access" }
                              : item
                      );

            users = users.reduce((acc, curr) => {
                const isNotValid = acc.find((item) => item.user === curr.user);

                return isNotValid ? acc : [...acc, curr];
            }, []);

            let realUsers = [];
            for (var i = 0; i < users.length; i++) {
                const dUser = await getUserById(users[i].user);
                realUsers = [
                    ...realUsers,
                    { ...dUser.data, role: users[i].role },
                ];
            }

            setValues((prev) => ({
                ...prev,
                users: realUsers,
            }));
            setIsLoading(false);
        };
        if (isLoading) loading();
    }, [
        project.canComments,
        project.fullaccess,
        project.canEdits,
        project.canView,
        project.userId,
        values,
        isLoading,
    ]);

    const handleSelect = (e) => {
        const nRowPerPage = e.target.value;
        setPages((prev) => ({
            ...prev,
            rowPerPage: nRowPerPage,
        }));
    };

    const fromPage = pages.page * pages.rowPerPage + 1;
    const toPage = (pages.page + 1) * pages.rowPerPage;
    const numsOfUsers = values.users.length;
    const maxRow = Math.ceil(numsOfUsers / pages.rowPerPage);

    return (
        <div>
            <div className={styled.setting}>
                <div style={{ flex: 1 }}></div>
                <div className={styled.iconCon}>
                    <BsFilter className={styled.icon} />
                </div>
            </div>
            <div className={styled.tableCon}>
                <table className={styled.table}>
                    <thead>
                        <tr>
                            <th align="left">ID</th>
                            <th align="left">Email</th>
                            <th align="left">Name</th>
                            <th align="left">Role</th>
                            <th align="left">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.users
                            .filter((item, index) => {
                                return index <= toPage && index >= fromPage - 1;
                            })
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.fullname}</td>
                                    <td>
                                        <Roles role={item.role} />
                                    </td>
                                    <td align="center">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={styled.conn}>
                <div style={{ flex: 1 }}></div>
                <div className={styled.configs}>
                    <div style={{ flex: 1 }}></div>
                    <div>Rows per page:</div>
                    <div>
                        <select name="" id="" onChange={handleSelect}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div>
                        {fromPage} -{" "}
                        {toPage < numsOfUsers ? toPage : numsOfUsers} of{" "}
                        {numsOfUsers}
                    </div>
                </div>
                <div className={styled.changes}>
                    <div
                        className={`${styled.iconCon} ${
                            pages.page - 1 < 0 && styled.dis
                        }`}
                        onClick={() =>
                            setPages((prev) => ({
                                ...prev,
                                page: 0,
                            }))
                        }
                    >
                        <MdFirstPage className={`${styled.icon}`} />
                    </div>
                    <div
                        className={`${styled.iconCon} ${
                            pages.page - 1 < 0 && styled.dis
                        }`}
                        onClick={() =>
                            setPages((prev) => ({
                                ...prev,
                                page: prev.page - 1,
                            }))
                        }
                    >
                        <MdOutlineKeyboardArrowLeft
                            className={`${styled.icon}`}
                        />
                    </div>
                    <div
                        className={`${styled.iconCon} ${
                            pages.page + 2 > maxRow && styled.dis
                        }`}
                        onClick={() =>
                            setPages((prev) => ({
                                ...prev,
                                page: prev.page + 1,
                            }))
                        }
                    >
                        <MdOutlineKeyboardArrowRight
                            className={`${styled.icon}`}
                        />
                    </div>
                    <div
                        className={`${styled.iconCon} ${
                            pages.page + 2 > maxRow && styled.dis
                        }`}
                        onClick={() =>
                            setPages((prev) => ({
                                ...prev,
                                page: maxRow - 1,
                            }))
                        }
                    >
                        <MdLastPage className={`${styled.icon}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MemberModal = (props) => {
    const { open, handleClose, project, user } = props;
    const [selected, setSelected] = useState(0);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={styled.options}>
                    <div
                        className={styled.option}
                        onClick={() => setSelected(0)}
                    >
                        <span>Members</span>
                        {selected === 0 && (
                            <div className={styled.optioned}></div>
                        )}
                    </div>
                    <div
                        className={styled.option}
                        onClick={() => setSelected(1)}
                    >
                        <span>Groups</span>
                        {selected === 1 && (
                            <div className={styled.optioned}></div>
                        )}
                    </div>
                </div>
                {selected === 0 && <Members project={project} />}

                {selected === 1 && (
                    <Groups user={user} handleClose={handleClose} />
                )}
            </Box>
        </Modal>
    );
};

const SettingnMember = (props) => {
    const { user, project } = props;

    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className={sidebar.setting} onClick={handleClick}>
                <IoMdSettings className="icon" style={{ fontSize: "26px" }} />
                <div className={sidebar.name}>Settings & Members</div>
            </div>
            {open && (
                <MemberModal
                    open={open}
                    handleClose={handleClose}
                    user={user}
                    project={project}
                />
            )}
        </>
    );
};

export default SettingnMember;
