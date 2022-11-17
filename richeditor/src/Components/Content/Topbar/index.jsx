import React from "react";

//Icons
import { AiOutlineMessage, AiOutlineStar } from "react-icons/ai";
import { BiTime, BiDotsHorizontalRounded } from "react-icons/bi";
import { FaBars, FaAngleDoubleRight } from "react-icons/fa";
// Styles
import styledTopbar from "./topbar.module.css";

const getCurrentTime = (end) => {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let eDate = new Date(end);

    return `${monthNames[eDate.getMonth()]} ${eDate.getDate()}`;
};

const Topbar = (props) => {
    const { expand, setExpand, project } = props;
    return (
        <div className={styledTopbar.topbar}>
            <div
                className={styledTopbar.expand}
                style={{ width: expand ? 0 : "44px" }}
                onClick={() => {
                    setExpand(true);
                }}
            >
                <FaBars className={`${styledTopbar.fabar} icon`} />
                <FaAngleDoubleRight
                    onClick={() => {
                        setExpand(true);
                    }}
                    className={`${styledTopbar.faAngleDoubleRight} icon`}
                />
            </div>
            <div className={styledTopbar.represent}>
                {project.avatar.length > 0 && (
                    <div
                        className={styledTopbar.miniIcon}
                        style={{
                            background: `url(/Images/logos/emojis.png) ${
                                1.6949 * project.avatar[0]
                            }% ${1.6949 * project.avatar[1]}% / 5900% 5900%`,
                        }}
                    ></div>
                )}
                <div className={styledTopbar.title}>{project.name}</div>
            </div>
            <div className="space-div"></div>
            <div className={styledTopbar.options}>
                <div
                    className={styledTopbar.option}
                    style={{
                        color: "rgba(25, 23, 17, 0.6)",
                        fontSize: "14px",
                    }}
                >
                    {getCurrentTime(project.editAt)}
                </div>
                <div className={`button ${styledTopbar.option}`}>Share</div>
                <div className={styledTopbar.option}>
                    <AiOutlineMessage className="icon" />
                </div>
                <div className={styledTopbar.option}>
                    <BiTime className="icon" />
                </div>
                <div className={styledTopbar.option}>
                    <AiOutlineStar className="icon" />
                    {/* <AiFillStar
                            className="icon"
                            style={{ color: "yellow" }}
                        /> */}
                </div>
                <div className={styledTopbar.option}>
                    <BiDotsHorizontalRounded className="icon" />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
