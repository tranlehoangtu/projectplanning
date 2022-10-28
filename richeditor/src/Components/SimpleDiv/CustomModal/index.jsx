import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import styles from "./styles.module.css";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { IoTextOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "4px",
};

export default function CustomModal() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = (e) => {
        e.target.classList.toggle(styles.active);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.inputContainer}>
                        <AiOutlineSearch className={styles.customButton} />
                        <input
                            type="text"
                            placeholder="type something"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <AiFillCloseCircle
                            className={`${styles.customButton} ${styles.customButtonHover}`}
                            style={{
                                fontSize: "18px",
                                opacity: value.length > 0 ? 1 : 0,
                            }}
                            onClick={() => setValue("")}
                        />
                    </div>
                    <div className={styles.divider}>
                        <span></span>
                    </div>
                    <div className={styles.searchOptions}>
                        <div className={styles.option} onClick={handleClick}>
                            <IoTextOutline />
                            Only Search Titles
                        </div>
                        <div
                            className={`${styles.option}`}
                            onClick={handleClick}
                        >
                            <BsFillPersonFill />
                            Created By
                        </div>
                        <div className={styles.option} onClick={handleClick}>
                            In page
                        </div>
                        <div className={styles.option} onClick={handleClick}>
                            Date
                        </div>
                    </div>
                    <div>Today</div>
                </Box>
            </Modal>
        </div>
    );
}
