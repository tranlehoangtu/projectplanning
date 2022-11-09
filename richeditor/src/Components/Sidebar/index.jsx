import React from "react";
import sidebar from "./sidebar.module.css";
import "./styles.css";

import { FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";
import { AiOutlineMessage, AiFillStar, AiOutlineExpand } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTime } from "react-icons/bi";
import { useState } from "react";

const Sidebar = () => {
    const [expand, setExpand] = useState(false);

    return (
        <div className={sidebar.container}>
            <div
                className={sidebar.sidebarContainer}
                style={{ width: expand ? "240px" : "0px" }}
            >
                <div
                    className={sidebar.sidebarContainerA}
                    style={{
                        transform: expand
                            ? "translateX(0)"
                            : "translateX(-240px)",
                    }}
                >
                    <div onClick={() => setExpand(false)}>Click ME</div>
                    <div className={sidebar.personal}>
                        <div className={sidebar.avatar}>T</div>
                        <div className={sidebar.infoOptions}>
                            <div className={sidebar.info}>
                                <div className={sidebar.username}>
                                    Tran Le Hoang Tu
                                </div>
                                <div className={sidebar.email}>
                                    tranlehoangtu@gmail.com asdasdsa
                                </div>
                            </div>
                            <div>
                                <AiOutlineExpand />
                            </div>
                        </div>
                        <div>
                            <FaAngleDoubleLeft
                                className={sidebar.faAngleDoubleLeft}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={sidebar.contentContainer}>
                <div className={sidebar.topbar}>
                    <div
                        className={sidebar.expand}
                        style={{ width: expand ? 0 : "44px" }}
                        onClick={() => {
                            setExpand(true);
                        }}
                    >
                        <FaBars className={`${sidebar.fabar} icon`} />
                        <FaAngleDoubleRight
                            onClick={() => {
                                setExpand(true);
                            }}
                            className={`${sidebar.faAngleDoubleRight} icon`}
                        />
                    </div>
                    <div className={sidebar.represent}>
                        <div className={sidebar.miniIcon}></div>
                        <div className={sidebar.title}>Untiled</div>
                    </div>
                    <div className="space-div"></div>
                    <div className={sidebar.options}>
                        <div
                            className={sidebar.option}
                            style={{
                                color: "rgba(25, 23, 17, 0.6)",
                                fontSize: "14px",
                            }}
                        >
                            Edited Nov 3
                        </div>
                        <div className={`button ${sidebar.option}`}>Share</div>
                        <div className={sidebar.option}>
                            <AiOutlineMessage className="icon" />
                        </div>
                        <div className={sidebar.option}>
                            <BiTime className="icon" />
                        </div>
                        <div className={sidebar.option}>
                            <AiFillStar className="icon" />
                        </div>
                        <div className={sidebar.option}>
                            <BiDotsHorizontalRounded className="icon" />
                        </div>
                    </div>
                </div>
                <div className={sidebar.editor}>Editor</div>
            </div>
        </div>
    );
};

export default Sidebar;
