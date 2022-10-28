import React, { useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const Modal = ({ setModal }) => {
    const onWindowClick = () => {
        setModal(false);
    };

    const customTimeOut = () => {
        setTimeout(() => {
            window.addEventListener("click", onWindowClick);
        });
    };

    useEffect(() => {
        customTimeOut();
        return () => window.removeEventListener("click", onWindowClick);
    }, []);

    return (
        <div className="user-info-absolute">
            <div>
                <div className="user-info-absolute-name">
                    <div>tub1805831@student.ctu.edu.vn</div>
                    <div className="space-div"></div>
                    <div>
                        <BsThreeDots className="icon" />
                    </div>
                </div>
                <div className="user-info-absolute-detail">
                    <div className="user-info-absolute-icon">T</div>
                    <div
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "normal",
                                color: "black",
                            }}
                        >
                            Tran Le Hoang Tu
                        </div>
                        <div>Personal Plan</div>
                    </div>
                    <div className="space-div"></div>
                    <div>
                        <AiOutlineCheck
                            style={{
                                color: "black",
                            }}
                            className="icon"
                        />
                    </div>
                </div>
                <div className="divider">
                    <span></span>
                </div>
            </div>
            <div>
                <div className="user-info-absolute-name">
                    <div>tub1805831@student.ctu.edu.vn</div>
                    <div className="space-div"></div>
                    <div>
                        <BsThreeDots className="icon" />
                    </div>
                </div>
                <div className="user-info-absolute-detail">
                    <div className="user-info-absolute-icon">T</div>
                    <div
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "normal",
                                color: "black",
                            }}
                        >
                            Tran Le Hoang Tu
                        </div>
                        <div>Personal Plan</div>
                    </div>
                    <div className="space-div"></div>
                    <div>
                        <AiOutlineCheck
                            style={{
                                color: "black",
                            }}
                            className="icon"
                        />
                    </div>
                </div>
                <div className="divider">
                    <span></span>
                </div>
            </div>
            <div className="user-info-absolute-options">
                <div className="option">Create Work Account</div>
                <div className="option">Add another Account</div>
                <div className="option">Logout</div>
            </div>
        </div>
    );
};

export default Modal;
