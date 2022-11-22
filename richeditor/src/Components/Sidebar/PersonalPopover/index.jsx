import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import personalPopover from "./personalPopover.module.css";

const PersonalPopover = (props) => {
    const { user } = props;

    return (
        <div className={personalPopover.container}>
            <div className={personalPopover.emailContainer}>
                <div className={personalPopover.email}>{user.email}</div>
                <div className="space-div"></div>
                <div>
                    <BiDotsHorizontalRounded
                        className="icon"
                        style={{
                            color: "rgba(55, 53, 47, 0.65)",
                            fontSize: "26px",
                        }}
                    />
                </div>
            </div>
            <div className={personalPopover.accountContainer}>
                <div className={personalPopover.avatar}>
                    {user.email.charAt(0).toUpperCase()}
                </div>
                <div className={personalPopover.account}>
                    <div className={personalPopover.name}>{user.email}</div>
                    <div className={personalPopover.type}>Personal Plan</div>
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
                <div className={personalPopover.setting}>
                    Create work account
                </div>
                <div className={personalPopover.setting}>Logout</div>
            </div>
        </div>
    );
};

export default PersonalPopover;
