import React, { useState, useEffect, useContext, useMemo } from "react";

// Mui
import { Box, Button, Modal, Popover, Typography } from "@mui/material";

// styles
import styled from "./upload.module.css";
import { triggerBase64Download } from "common-base64-downloader-react";

// Icons
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

import { ProjectContext } from "../../Context/ProjectContext";
import { getProjectById, updateProject } from "../../Services/fetchProject";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
};

const Images = (props) => {
    const { file, setCurrentFile } = props;

    const { project, setProject } = useContext(ProjectContext);

    const [loading, setLoading] = useState(true);
    // const [message, setMessage] = useState("Your upload image gonna show here");

    const [currentImages, setCurrentImages] = useState([]);
    const [modal, setModal] = useState(false);
    const [remove, setRemove] = useState(null);

    const message = useMemo(() => {
        if (file) {
            if (!file.type.includes("image"))
                return "If you wanna upload a file choose files";
        }
        return null;
    }, [file]);

    useEffect(() => {
        const process = async () => {
            const currentProject = await getProjectById(project.id);

            setCurrentImages(currentProject.data.images);
            setLoading(false);
        };

        process();
    }, [loading, project.images, project.id]);

    const handleModalClose = () => {
        setModal(false);
    };

    const uploadImage = async () => {
        if (file && file.type.includes("image")) {
            const base64 = await convertBase64(file);
            const currentProject = {
                ...project,
                images: [...currentImages, { name: file.name, url: base64 }],
            };

            await updateProject(currentProject);
            await setProject(currentProject);

            setCurrentImages((prev) => [
                ...prev,
                { name: file.name, url: base64 },
            ]);

            setCurrentFile(null);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleDownLoad = (url, name) => {
        triggerBase64Download(url, name.substring(0, name.indexOf(".")));
    };

    const handleRemove = async () => {
        setCurrentImages(
            currentImages.filter(
                (item) =>
                    !(item.url === remove.url && item.name === remove.name)
            )
        );

        const currentProject = {
            ...project,
            images: currentImages.filter(
                (item) =>
                    !(item.url === remove.url && item.name === remove.name)
            ),
        };

        await updateProject(currentProject);
        await setProject(currentProject);
        setModal(false);
    };

    return (
        !loading && (
            <div>
                <div className={styled.imageCon}>
                    <>
                        {file ? (
                            <div
                                style={{
                                    color: "rgba(55, 53, 47, 0.65)",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    width: "220px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {file.name}
                            </div>
                        ) : (
                            <div
                                style={{
                                    color: "rgba(55, 53, 47, 0.65)",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                }}
                            >
                                Your upload image gonna show here
                            </div>
                        )}
                        {/*  */}
                    </>
                    <div style={{ flex: 1 }}></div>
                    <div onClick={uploadImage} className={styled.iconCon}>
                        <AiOutlineUpload className={styled.icon} />
                    </div>
                </div>
                {message && (
                    <div
                        style={{
                            color: "red",
                            fontWeight: "600",
                            fontSize: "13px",
                        }}
                    >
                        {message}
                    </div>
                )}
                <div className={styled.divide}></div>
                <div className={styled.images}>
                    {currentImages.map((item) => (
                        <div className={styled.image} key={item.url}>
                            <img
                                src={item.url}
                                alt=""
                                width={30}
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "2px",
                                }}
                            />
                            <div
                                style={{
                                    color: "rgba(55, 53, 47, 0.65)",
                                    fontWeight: "600",
                                    width: "180px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.name}
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <div
                                className={styled.iconCon}
                                onClick={() =>
                                    handleDownLoad(item.url, item.name)
                                }
                            >
                                <AiOutlineDownload className={styled.icon} />
                            </div>
                            <div
                                className={styled.iconCon}
                                onClick={() => {
                                    setModal(true);
                                    setRemove({
                                        url: item.url,
                                        name: item.name,
                                    });
                                }}
                            >
                                <FaTimes className={styled.icon} />
                            </div>
                        </div>
                    ))}
                </div>
                <Modal open={modal} onClose={handleModalClose}>
                    <Box sx={style}>
                        <div style={{ marginBottom: "20px" }}>
                            <Typography>
                                Make sure that you want to delete this Image
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ width: "100%" }}
                            onClick={handleRemove}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ width: "100%" }}
                            onClick={() => {
                                setModal(false);
                                setRemove(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Modal>
            </div>
        )
    );
};

const Files = (props) => {
    const { file, setCurrentFile } = props;

    const { project, setProject } = useContext(ProjectContext);

    const [loading, setLoading] = useState(true);
    // const [message, setMessage] = useState("Your upload image gonna show here");

    const [currentFiles, setCurrentFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [remove, setRemove] = useState(null);

    const message = useMemo(() => {
        if (file) {
            if (!file.type.includes("application"))
                return "Upload an image choose images";
        }
        return null;
    }, [file]);

    useEffect(() => {
        const process = async () => {
            const currentProject = await getProjectById(project.id);
            setCurrentFiles(currentProject.data.files);
            setLoading(false);
        };
        process();
    }, [loading, project.id]);

    const handleModalClose = () => {
        setModal(false);
    };

    const uploadFile = async () => {
        if (file && file.type.includes("application")) {
            const base64 = await convertBase64(file);
            const currentProject = {
                ...project,
                files: [...currentFiles, { name: file.name, url: base64 }],
            };

            await updateProject(currentProject);
            await setProject(currentProject);

            setCurrentFiles((prev) => [
                ...prev,
                { name: file.name, url: base64 },
            ]);

            setCurrentFile(null);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleDownLoad = (url, name) => {
        triggerBase64Download(url, name.substring(0, name.indexOf(".")));
    };

    const handleRemove = async () => {
        setCurrentFiles(
            currentFiles.filter(
                (item) =>
                    !(item.url === remove.url && item.name === remove.name)
            )
        );

        const currentProject = {
            ...project,
            images: currentFiles.filter(
                (item) =>
                    !(item.url === remove.url && item.name === remove.name)
            ),
        };

        await updateProject(currentProject);
        await setProject(currentProject);
        setModal(false);
    };

    return (
        !loading && (
            <div>
                <div className={styled.imageCon}>
                    <>
                        {file ? (
                            <div
                                style={{
                                    color: "rgba(55, 53, 47, 0.65)",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    width: "220px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {file.name}
                            </div>
                        ) : (
                            <div
                                style={{
                                    color: "rgba(55, 53, 47, 0.65)",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                }}
                            >
                                Your upload file gonna show here
                            </div>
                        )}
                    </>
                    <div style={{ flex: 1 }}></div>
                    <div onClick={uploadFile} className={styled.iconCon}>
                        <AiOutlineUpload className={styled.icon} />
                    </div>
                </div>
                {message && (
                    <div
                        style={{
                            color: "red",
                            fontWeight: "600",
                            fontSize: "13px",
                        }}
                    >
                        {message}
                    </div>
                )}
                <div className={styled.divide}></div>
                <div className={styled.images}>
                    {currentFiles.map((item) => (
                        <div className={styled.image} key={item.url}>
                            {/* <img
                                src={item.url}
                                alt=""
                                width={30}
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "2px",
                                }}
                            /> */}
                            <div
                                style={{
                                    color: "rgba(55, 53, 47, 0.65)",
                                    fontWeight: "600",
                                    width: "180px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.name}
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <div
                                className={styled.iconCon}
                                onClick={() =>
                                    handleDownLoad(item.url, item.name)
                                }
                            >
                                <AiOutlineDownload className={styled.icon} />
                            </div>
                            <div
                                className={styled.iconCon}
                                onClick={() => {
                                    setModal(true);
                                    setRemove({
                                        url: item.url,
                                        name: item.name,
                                    });
                                }}
                            >
                                <FaTimes className={styled.icon} />
                            </div>
                        </div>
                    ))}
                </div>
                <Modal open={modal} onClose={handleModalClose}>
                    <Box sx={style}>
                        <div style={{ marginBottom: "20px" }}>
                            <Typography>
                                Make sure that you want to delete this Image
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ width: "100%" }}
                            onClick={handleRemove}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ width: "100%" }}
                            onClick={() => {
                                setModal(false);
                                setRemove(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Modal>
            </div>
        )
    );
};

const Upload = (props) => {
    const { upload } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUpload, setCurrentUpload] = useState("Files");
    const [currentFile, setCurrentFile] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleUpClick = (up) => {
        if (up !== currentUpload) setCurrentUpload(up);
        handleClose();
    };

    const handleInputChange = (e) => {
        setCurrentFile(e.target.files[0]);
    };

    return (
        <div
            className={styled.container}
            style={{ width: upload ? "300px" : "0   " }}
        >
            <div
                className={styled.aContainer}
                style={{
                    transform: upload ? "translateX(0)" : "translateX(300px)",
                }}
            >
                <div className={styled.wrapper}>
                    <label htmlFor="upFile" className={styled.upButton}>
                        Uploads
                    </label>
                    <input
                        type="file"
                        id="upFile"
                        hidden
                        onChange={handleInputChange}
                    />
                    <div style={{ flex: 1 }}></div>
                    <div onClick={handleClick} className={styled.options}>
                        {currentUpload}
                    </div>
                </div>
                <div>
                    {currentUpload === "Images" && (
                        <Images
                            file={currentFile}
                            setCurrentFile={setCurrentFile}
                        />
                    )}
                    {currentUpload === "Files" && (
                        <Files
                            file={currentFile}
                            setCurrentFile={setCurrentFile}
                        />
                    )}
                </div>
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div className={styled.popCon}>
                    <div
                        className={styled.option}
                        onClick={() => handleUpClick("Images")}
                    >
                        Images
                    </div>
                    <div
                        className={styled.option}
                        onClick={() => handleUpClick("Files")}
                    >
                        Files
                    </div>
                </div>
            </Popover>
        </div>
    );
};

export default Upload;
