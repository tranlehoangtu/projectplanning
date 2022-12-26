// Reacts
import React, { useEffect, useState } from "react";

// Mui
import { Button, Modal, Popover, Typography } from "@mui/material";
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
import { getUserById, updateUser } from "../../../../Services/fetchUser";
import {
    getProjectById,
    updateProject,
} from "../../../../Services/fetchProject";
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 672,
    minHeight: 300,
    bgcolor: "#fff",
    border: "2px solid #000",
    borderRadius: "4px",
    boxShadow: 24,
    overflow: "hidden",
    fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
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

const Roles = (props) => {
    const { role, handleChangeRole, id, edit } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleChange = (nRole) => {
        handleChangeRole(nRole, id);
        setAnchorEl(null);
    };

    return (
        <div>
            <div
                onClick={handleClick}
                style={{
                    pointerEvents: !edit && "none",
                }}
            >
                {role}
            </div>
            <Popover
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
                        onClick={() => handleChange("Full Access")}
                    >
                        Full access
                    </div>
                    <div
                        className={styled.popOption}
                        onClick={() => handleChange("Can Edit")}
                    >
                        Can edit
                    </div>
                    <div
                        className={styled.popOption}
                        onClick={() => handleChange("Can Comment")}
                    >
                        Can comment
                    </div>
                    <div
                        className={styled.popOption}
                        onClick={() => handleChange("Can View ")}
                    >
                        Can view
                    </div>
                </div>
            </Popover>
        </div>
    );
};

const styleModal = {
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

const Members = (props) => {
    const { project, isEditable } = props;

    const [values, setValues] = useState(() => ({
        users: [],
        backup: [],
        removes: [],
    }));

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [modal, setModal] = useState(false);

    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);

    const [pages, setPages] = useState(() => ({
        rowPerPage: 5,
        page: 0,
    }));

    useEffect(() => {
        const loading = async () => {
            let users = [];

            const currentProject = await getProjectById(project.id);

            users = [
                ...users,
                ...currentProject.data.fullaccess.map((item) => ({
                    user: item,
                    role: "Full Access",
                })),
            ];
            users = [
                ...users,
                ...currentProject.data.canComments.map((item) => ({
                    user: item,
                    role: "Can Comment",
                })),
            ];
            users = [
                ...users,
                ...currentProject.data.canView.map((item) => ({
                    user: item,
                    role: "Can View",
                })),
            ];
            users = [
                ...users,
                ...currentProject.data.canEdits.map((item) => ({
                    user: item,
                    role: "Can Edit",
                })),
            ];

            users =
                users.length === 0
                    ? [
                          {
                              user: currentProject.data.userId,
                              role: "Full Access",
                          },
                      ]
                    : users.map((item) =>
                          item.user === currentProject.data.userId
                              ? { ...item, role: "Full Access" }
                              : item
                      );

            users = users.reduce((acc, curr) => {
                const isNotValid = acc.find((item) => item.user === curr.user);

                return isNotValid ? acc : [...acc, curr];
            }, []);

            console.log(users);

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
                backup: realUsers,
            }));
            setIsLoading(false);
        };
        if (isLoading) loading();
    }, [project.id, values, isLoading]);

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

    const handleChangeRole = (nRole, id) => {
        setIsSaving(true);

        const nUsers = values.users.map((item) => {
            if (item.id === id) return { ...item, role: nRole };
            return item;
        });

        setValues((prev) => ({ ...prev, users: nUsers }));
    };

    const handleSave = async () => {
        if (values.removes.length > 0) {
            console.log("Here");

            var currentProject = project;
            const fullaccess = project.fullaccess.filter(
                (item) => !values.removes.find((remove) => remove === item)
            );
            const canEdits = project.canEdits.filter(
                (item) => !values.removes.find((remove) => remove === item)
            );
            const canComments = project.canComments.filter(
                (item) => !values.removes.find((remove) => remove === item)
            );
            const canView = project.canView.filter(
                (item) => !values.removes.find((remove) => remove === item)
            );
            currentProject = {
                ...currentProject,
                fullaccess,
                canComments,
                canEdits,
                canView,
            };
            for (var i = 0; i < values.removes.length; i++) {
                const dUser = await getUserById(values.removes[i]);
                let tUser = dUser.data;
                tUser = {
                    ...tUser,
                    lastProject:
                        project.id === tUser.lastProject
                            ? ""
                            : tUser.lastProject,
                    publics: tUser.publics.filter(
                        (item) => item !== project.id
                    ),
                };
                await updateUser(tUser);
            }
            await updateProject(currentProject);
            setIsLoading(true);
            setIsSaving(false);
            setModal(false);
        }
        console.log(project);
    };

    const handleCancel = () => {
        setIsSaving(false);

        setValues((prev) => ({
            ...prev,
            users: prev.backup,
        }));
    };

    const handleRemove = (e, id) => {
        if (!isSaving) setIsSaving(true);

        if (e.target.checked) {
            setValues((prev) => ({
                ...prev,
                removes: [...prev.removes, id],
            }));
        } else
            setValues((prev) => ({
                ...prev,
                removes: prev.removes.filter((item) => item !== id),
            }));
    };

    return (
        <div style={{ pointerEvents: !isEditable && "none" }}>
            <div className={styled.setting}>
                <h5 style={{ color: "red", marginLeft: "10px" }}>
                    Only project creator can change
                </h5>
                <div style={{ flex: 1 }}></div>
                {isSaving ? (
                    <div className={styled.buttons}>
                        <div className={styled.button} onClick={handleOpen}>
                            Save
                        </div>
                        <div className={styled.button} onClick={handleCancel}>
                            Cancel
                        </div>
                    </div>
                ) : (
                    <div className={styled.iconCon}>
                        <BsFilter className={styled.icon} />
                    </div>
                )}
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
                                        <Roles
                                            role={item.role}
                                            handleChangeRole={handleChangeRole}
                                            id={item.id}
                                            edit={item.id !== project.userId}
                                        />
                                    </td>
                                    <td align="center">
                                        {item.id !== project.userId && (
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                                onChange={(e) =>
                                                    handleRemove(e, item.id)
                                                }
                                            />
                                        )}
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
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div style={{ marginBottom: "20px" }}>
                        <Typography>
                            Are you sure to remove change member?
                        </Typography>
                    </div>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ width: "100%" }}
                        onClick={handleSave}
                    >
                        Change
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
        </div>
    );
};

const MemberModal = (props) => {
    const { open, handleClose, project, user } = props;
    const [selected, setSelected] = useState(0);

    const isEditable = user.id === project.userId;

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
                {selected === 0 && (
                    <Members project={project} isEditable={isEditable} />
                )}

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
