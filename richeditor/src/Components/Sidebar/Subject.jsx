import React, { useState } from "react";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

import sidebar from "./sidebar.module.css";

const Subject = (props) => {
    const { favor } = props;
    const [dropdown, setDropdown] = useState(false);

    const handleDropDownClick = (e) => {
        setDropdown(!dropdown);
    };

    return (
        <>
            <div className={sidebar.subjectItem}>
                <MdKeyboardArrowRight
                    className="icon"
                    onClick={handleDropDownClick}
                    style={{ transform: dropdown ? "rotate(90deg)" : "" }}
                />
                {favor.mainIcon}
                {/* <AiOutlineFileDone className="icon" /> */}
                <span>{favor.name}</span>
                <div className="space-div"></div>
                <div className={sidebar.optionsContainer}>
                    <FaEllipsisH className="icon" />
                    <FaPlus className="icon" />
                </div>
            </div>
            {favor.childrens.length > 0 && dropdown && (
                <ul>
                    <ul>
                        {favor.childrens.map((children) => (
                            <Subject favor={children} key={children.id} />
                        ))}
                    </ul>
                </ul>
            )}
            {favor.childrens.length === 0 && dropdown && (
                <ul>
                    <li
                        style={{
                            fontSize: "14px",
                            paddingLeft: "22px",
                            margin: "4px 0 8px 0",
                            opacity: "0.8",
                        }}
                    >
                        No pages inside
                    </li>
                </ul>
            )}
        </>
    );
};

export default Subject;
