import React, { useState } from "react";

// mui
import { Button, Modal, Typography } from "@mui/material";

// icons
import styled from "./admin.module.css";
import styledTopbar from "../topbar.module.css";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { Box } from "@mui/system";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useEffect } from "react";
import {
    deleteUser,
    getAllUsers,
    updateUser,
} from "../../../../Services/fetchUser";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AdminModal = (props) => {
    const { open, handleClose } = props;
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);

    useEffect(() => {
        const process = async () => {
            const users = await getAllUsers();
            setLoading(false);
            setUsers(users.data.filter((item) => !item.admin));
        };

        if (loading) process();
    }, [loading]);

    const fromPage = page * rowPerPage + 1;
    const toPage = (page + 1) * rowPerPage;
    const maxRow = Math.ceil(users.length / rowPerPage);

    const handleDelete = async (id) => {
        await deleteUser(id);
        setUsers(users.filter((item) => item.id !== id));
    };

    const handleUnblock = async (id) => {
        let currentUser = users.find((item) => item.id === id);
        currentUser = { ...currentUser, block: false };

        setUsers(
            users.map((item) => {
                if (item.id === id) return { ...item, block: false };
                return item;
            })
        );
        await updateUser(currentUser);
    };

    const handleBlock = async (id) => {
        let currentUser = users.find((item) => item.id === id);
        currentUser = { ...currentUser, block: true };

        setUsers(
            users.map((item) => {
                if (item.id === id) return { ...item, block: true };
                return item;
            })
        );
        await updateUser(currentUser);
    };

    return (
        !loading && (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Users
                        </Typography>
                        <div className={styled.table}>
                            <table
                                style={{
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead className={styled.thead}>
                                    <tr>
                                        <th align="left">ID</th>
                                        <th align="left">Email</th>
                                        <th align="left">Name</th>
                                        <th
                                            align="center"
                                            style={{ padding: "0 10px" }}
                                        >
                                            Block
                                        </th>
                                        <th
                                            align="center"
                                            style={{ padding: 0 }}
                                        >
                                            Option
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={styled.tbody}>
                                    {users
                                        .filter((index) => {
                                            const isNotValid =
                                                index < fromPage ||
                                                index > toPage;
                                            return !isNotValid;
                                        })
                                        .map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td
                                                    style={{
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {item.fullname}
                                                </td>
                                                <td align="center">
                                                    {item.block ? (
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() =>
                                                                handleUnblock(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Unblock
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() =>
                                                                handleBlock(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Block
                                                        </Button>
                                                    )}
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={styled.options}>
                            <div style={{ flex: 1 }}></div>
                            <div>Rows per page:</div>
                            <div>
                                <select
                                    onChange={(e) =>
                                        setRowPerPage(e.target.value)
                                    }
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <div>{`${fromPage} - ${
                                users.length > toPage ? toPage : users.length
                            } of ${users.length}`}</div>
                            <div className={styled.moves}>
                                <div
                                    className={styled.iconCon}
                                    onClick={() => setPage(page - 1)}
                                    style={{
                                        pointerEvents: page - 1 < 0 && "none",

                                        color:
                                            page - 1 < 0 &&
                                            "rgba(55, 53, 47, 0.65)",
                                    }}
                                >
                                    <AiOutlineLeft className={styled.icon} />
                                </div>
                                <div
                                    className={styled.iconCon}
                                    onClick={() => setPage(page + 1)}
                                    style={{
                                        pointerEvents:
                                            page + 2 > maxRow && "none",

                                        color:
                                            page + 2 > maxRow &&
                                            "rgba(55, 53, 47, 0.65)",
                                    }}
                                >
                                    <AiOutlineRight className={styled.icon} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        )
    );
};

const Admin = (props) => {
    const { user } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        user.admin && (
            <div className={styledTopbar.option}>
                <MdOutlineAdminPanelSettings
                    className="icon"
                    onClick={handleOpen}
                />
                {open && <AdminModal open={open} handleClose={handleClose} />}
            </div>
        )
    );
};

export default Admin;
