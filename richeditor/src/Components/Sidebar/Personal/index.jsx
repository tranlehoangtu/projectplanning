// reacts
import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { AiOutlineCheck, AiOutlineExpand } from "react-icons/ai";
import { FaAngleDoubleLeft } from "react-icons/fa";

// styles
import personalPopover from "./personalPopover.module.css";
import sidebar from "../sidebar.module.css";

// contexts
import { UserContext } from "../../../Context/UserContext";
import { ProjectContext } from "../../../Context/ProjectContext";
import { Popover } from "@mui/material";
import { useEffect } from "react";

const UserPop = (props) => {
    const { anchorEl, handlePersonalClose, open, user, setUser, setProject } =
        props;

    const navigate = useNavigate();

    useEffect(() => {}, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");

        setUser(null);
        setProject(null);

        navigate("/login");
    };

    const handleCreateAccount = () => {
        localStorage.removeItem("currentUser");

        setUser(null);
        setProject(null);

        navigate("/signup");
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePersonalClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <div className={personalPopover.container}>
                <div className={personalPopover.emailContainer}>
                    <div className={personalPopover.email}>{user.email}</div>
                    <div className="space-div"></div>
                </div>
                <div className={personalPopover.accountContainer}>
                    <div
                        className={personalPopover.avatar}
                        style={{ background: user.color }}
                    >
                        {user.email.charAt(0).toUpperCase()}
                    </div>
                    <div className={personalPopover.account}>
                        <div className={personalPopover.name}>{user.email}</div>
                        <div className={personalPopover.type}>
                            {user.fullname}
                        </div>
                    </div>
                    <div className="space-div"></div>
                    <div>
                        <AiOutlineCheck
                            className={`icon`}
                            style={{ color: "#000" }}
                        />
                    </div>
                </div>
                <div className={personalPopover.divider}>
                    <div></div>
                </div>
                <div className={personalPopover.settings}>
                    <div
                        className={personalPopover.setting}
                        onClick={handleCreateAccount}
                    >
                        Create another account
                    </div>
                    <div
                        className={personalPopover.setting}
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </div>
            </div>
        </Popover>
    );
};

const Personal = (props) => {
    const { setExpand } = props;

    const { user, setUser } = useContext(UserContext);
    const { setProject } = useContext(ProjectContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const personalRef = useRef(null);

    const handlePersonalClick = (e) => {
        setAnchorEl(personalRef.current);
    };
    const handlePersonalClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={sidebar.personal} ref={personalRef}>
            <div
                className={sidebar.avatar}
                style={{ background: user.color }}
                onClick={handlePersonalClick}
            >
                {user.email.charAt(0).toUpperCase()}
            </div>
            <div className={sidebar.info} onClick={handlePersonalClick}>
                <div className={sidebar.username}>{user.fullname}</div>
                <div className={sidebar.email}>{user.email}</div>
            </div>
            <div>
                <AiOutlineExpand
                    className={`icon`}
                    style={{ fontSize: "24px" }}
                    onClick={handlePersonalClick}
                />
            </div>
            <div>
                <FaAngleDoubleLeft
                    onClick={() => setExpand(false)}
                    className={`icon`}
                    style={{ fontSize: "24px" }}
                />
            </div>
            {open && (
                <UserPop
                    anchorEl={anchorEl}
                    handlePersonalClose={handlePersonalClose}
                    open={open}
                    user={user}
                    setUser={setUser}
                    setProject={setProject}
                />
            )}
        </div>
    );
};

export default Personal;
