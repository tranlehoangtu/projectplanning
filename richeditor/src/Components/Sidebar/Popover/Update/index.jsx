import React from "react";

import { BiTime } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";

import { Popover } from "@mui/material";

import sidebar from "../../sidebar.module.css";
import update from "./update.module.css";

const Update = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selected, setSelected] = React.useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <div className={sidebar.setting} onClick={handleClick}>
                <BiTime className="icon" style={{ fontSize: "26px" }} />
                <span>Updates</span>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div className={update.container}>
                    <div className={update.options}>
                        <div
                            className={update.option}
                            onClick={() => {
                                if (selected !== 0) {
                                    setSelected(0);
                                }
                            }}
                        >
                            Inbox
                            {selected === 0 && (
                                <div className={update.optionBar}></div>
                            )}
                        </div>
                        <div
                            className={update.option}
                            onClick={() => {
                                if (selected !== 1) {
                                    setSelected(1);
                                }
                            }}
                        >
                            Modified
                            {selected === 1 && (
                                <div className={update.optionBar}></div>
                            )}
                        </div>
                    </div>
                    <div className={update.inboxContainer}>
                        {selected === 0 && (
                            <div className={update.inboxs}>
                                {/* <div className={update.inbox}>first</div>
                                <div className={update.inbox}>second</div>
                                <div className={update.inbox}>third</div> */}
                                <h4>
                                    Inbox gonna show if someone @mention you
                                </h4>
                            </div>
                        )}
                        {selected === 1 && (
                            <div className={update.updates}>
                                <div className={update.update}>
                                    <div className={update.avatar}>T</div>
                                    <div className={update.infoContainer}>
                                        <div className={update.info}>
                                            <span>
                                                <b>Tran Le Hoang Tu B1805831</b>
                                            </span>
                                            <span>deleted </span>
                                            <span>
                                                <b>Untitled</b>
                                            </span>
                                        </div>
                                        <div className={update.time}>Nov 8</div>
                                    </div>
                                    <div className={update.type}>
                                        <div>
                                            <AiOutlineLock
                                                className={`icon`}
                                                style={{ fontSize: "22px" }}
                                            />
                                        </div>
                                        <div style={{ fontWeight: "500" }}>
                                            Private
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Popover>
        </>
    );
};

export default Update;
