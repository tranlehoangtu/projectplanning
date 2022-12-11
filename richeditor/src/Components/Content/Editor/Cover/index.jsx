// Reacts
import React, { useState, useContext } from "react";

// Mui
import { Popover } from "@mui/material";

// Contexts
import { ProjectContext } from "../../../../Context/ProjectContext";

import cover from "./cover.module.css";
import { modifyProjectProps } from "../../../../Services/fetchProject";

const covers = [
    {
        id: 1,
        name: "COLOR & GRADIENT",
        images: [
            "solid_blue.png",
            "solid_beige.png",
            "solid_red.png",
            "solid_yellow.png",
            "gradients_2.png",
            "gradients_3.png",
            "gradients_4.png",
            "gradients_5.png",
            "gradients_8.png",
            "gradients_10.jpg",
            "gradients_11.jpg",
        ],
    },
    {
        id: 2,
        name: "JAMES WEBB TELESCOPE",
        images: ["webb1.jpg", "webb2.jpg", "webb3.jpg", "webb4.jpg"],
    },
    {
        id: 3,
        name: "THE MET MUSEUM - PATTERNS",
        images: [
            "met_silk_kashan_carpet.jpg",
            "met_william_morris_1875.jpg",
            "met_william_morris_1877_willow.jpg",
            "met_william_morris_1878.jpg",
        ],
    },
];

const Cover = (props) => {
    const { user } = props;

    const { project, setProject } = useContext(ProjectContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (image) => {
        modifyProjectProps(project.id, { ...project, background: image }).then(
            () => {
                setProject((prev) => ({
                    ...prev,
                    background: image,
                }));
                setAnchorEl(null);
            }
        );
    };

    const handleCoverChangeClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = () => {
        modifyProjectProps(project.id, { ...project, background: "" }).then(
            () => {
                setProject((prev) => ({
                    ...prev,
                    background: "",
                }));
                setAnchorEl(null);
            }
        );
    };

    //
    return (
        <>
            {project && (
                <div
                    className={cover.container}
                    style={{
                        height: Boolean(project.background) ? "30vh" : "20vh",
                    }}
                >
                    <div className={cover.imageContainer}>
                        {Boolean(project.background) && (
                            <img
                                src={`/Images/Cover/${project.background}`}
                                alt={project.background.substring(
                                    0,
                                    project.background.indexOf(".")
                                )}
                                className={cover.image}
                            />
                        )}
                        <div
                            className={cover.imageContainerA}
                            onClick={handleCoverChangeClick}
                        >
                            <div>Click to Change Cover</div>
                        </div>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "center",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            sx={{
                                "& .MuiPaper-root": {
                                    overflowX: "unset",
                                    overflowY: "unset",
                                },
                            }}
                        >
                            <div className={cover.popover}>
                                <div className={cover.options}>
                                    <div className={cover.option}>Gallery</div>
                                    <div className="space-div"></div>
                                    <div
                                        className={cover.option}
                                        onClick={handleRemove}
                                    >
                                        Remove
                                    </div>
                                </div>
                                <div className={cover.types}>
                                    {covers.map((item) => (
                                        <div
                                            className={cover.type}
                                            key={item.id}
                                        >
                                            <div className={cover.name}>
                                                {item.name}
                                            </div>
                                            <div className={cover.imgsWrapper}>
                                                {item.images.map((image) => (
                                                    <div
                                                        className={
                                                            cover.imgWrapper
                                                        }
                                                        onClick={() =>
                                                            handleClick(image)
                                                        }
                                                        key={image}
                                                    >
                                                        <img
                                                            src={`/Images/Cover/${image}`}
                                                            alt={`${image.substring(
                                                                0,
                                                                image.indexOf(
                                                                    "."
                                                                )
                                                            )}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Popover>
                    </div>

                    {Boolean(
                        project.canEdits.find((item) => item === user.id)
                    ) ||
                    Boolean(
                        project.fullaccess.find((item) => item === user.id)
                    ) ||
                    user.id === project.userId ? (
                        <></>
                    ) : (
                        <div className={cover.over}></div>
                    )}
                </div>
            )}
        </>
    );
};

export default Cover;
