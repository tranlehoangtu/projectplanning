import React, { useState } from "react";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

import styles from "./styles.module.css";

const SubjectRender = (props) => {
    const { favor } = props;
    const [dropdown, setDropdown] = useState(false);

    const handleDropDownClick = (e) => {
        setDropdown(!dropdown);
    };

    return (
        <div key={favor.id}>
            <div className={styles.subjectItem}>
                <div className={styles.subjectSubTitle}>
                    <MdKeyboardArrowRight
                        className={`${styles.subjectIcon} ${styles.subjectDropdown}`}
                        onClick={handleDropDownClick}
                        style={{ transform: dropdown ? "rotate(90deg)" : "" }}
                    />
                    {favor.mainIcon}
                    <span>{favor.name}</span>
                </div>
                <div className={styles.subjectOptions}>
                    <FaEllipsisH
                        className={`${styles.subjectIcon} ${styles.subjectOption}`}
                    />
                    <FaPlus
                        className={`${styles.subjectIcon} ${styles.subjectMore}`}
                    />
                </div>
            </div>
            {favor.childrens.length > 0 && dropdown && (
                <ul>
                    {favor.childrens.map((children) => (
                        <SubjectRender favor={children} key={children.id} />
                    ))}
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
        </div>
    );
};

export default SubjectRender;
