import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

import "./styles.css";

const CustomDropdown = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="container">
            <div
                className="container-title"
                onClick={() => setVisible(!visible)}
            >
                Text
            </div>
            <div className={`dropdown-container ${visible ? "show" : ""}`}>
                <div className="dropdown-title">TURN INTO</div>
                <div className="dropdown-buttons">
                    <div className="dropdown-button">
                        <div className="dropdown-button-head">
                            <img src="/Images/Text.png" alt="text" />
                            <div className="dropdown-button-head-text">
                                Text
                            </div>
                        </div>
                        <div className="dropdown-button-foot">
                            <FaCheck />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomDropdown;
