import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineQuestion } from "react-icons/ai";

import styled from "./howToUse.module.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflowY: "scroll",
    padding: "0 30px",
    paddingBottom: "30px",
};

const HowToUse = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styled.conCon}>
            <div className={styled.iconCon} onClick={handleOpen}>
                <AiOutlineQuestion className={styled.icon} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                        How To Use
                    </h1>
                    <h3 className={styled.header3}>
                        This page is fully editable.
                    </h3>
                    <ol className={styled.oor} style={{ paddingLeft: "26px" }}>
                        <li>Try to select some text to open the toolbar.</li>
                    </ol>

                    <div className={styled.unstyled}>
                        It also has implementations of some custom blocks like
                    </div>
                    <h3 className={styled.header3}>Custom Blocks</h3>

                    <h3 className={styled.header3}>Todo Block</h3>
                    <h3 className={styled.header3}>Block Quote</h3>
                    <div className={styled.quoteBlock}>
                        A medium like rich text editor built using draft-js with
                        an emphasis on eliminating mouse usage by adding
                        relevant keyboard shortcuts.
                    </div>
                    <h3 className={styled.header3}>Keyboard shortcuts</h3>
                    <ul style={{ paddingLeft: "26px" }}>
                        <li>Ctrl/Alt</li>
                    </ul>
                    <div className={styled.unstyled}>
                        1 - Toggle <b>ordered-list-item.</b>
                    </div>
                    <div className={styled.unstyled}>
                        * - Toggle <b>unordered-list-item.</b>
                    </div>
                    <div className={styled.unstyled}>
                        # - Toggle <b>header-three.</b>
                    </div>
                    <div className={styled.unstyled}>
                        {`<`} - Toggle <b>caption</b> block.
                    </div>
                    <div className={styled.unstyled}>
                        {`>`} - Toggle <b>unstyled</b> block.
                    </div>
                    <div className={styled.unstyled}>
                        H - <span className="">Highlight</span> selection.
                    </div>
                    <h3 className={styled.header3}>Editor level commands</h3>
                    <ol style={{ paddingLeft: "26px" }}>
                        <li style={{ padding: "4px 0" }}>
                            CTRL + S - Save current data to database.
                        </li>
                        <li style={{ padding: "4px 0" }}>
                            CTRL + D - Load previously saved from database.
                        </li>
                    </ol>
                </Box>
            </Modal>
        </div>
    );
};

export default HowToUse;
