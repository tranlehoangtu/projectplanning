// Reacts
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mui
import { Box, Modal } from "@mui/material";

// Icons
import { AiOutlineSearch } from "react-icons/ai";
import { BiFileBlank, BiSearch } from "react-icons/bi";
import { FaRegTimesCircle } from "react-icons/fa";

import { getProjectById } from "../../../../Services/fetchProject";

// Styles
import sidebar from "../../sidebar.module.css";
import search from "./search.module.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

const Search = (props) => {
    const { user } = props;

    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [values, setValues] = useState(() => ({
        text: "",
        active: false,
        projects: [],
    }));

    const navigate = useNavigate();

    useEffect(() => {
        const loading = async () => {
            const projectsId = [
                ...user.privates,
                ...user.publics,
                ...user.favorites,
            ];
            let tempProjects = [];
            for (var i = 0; i < projectsId.length; i++) {
                const fetchProjectData = await getProjectById(projectsId[i]);
                const fetchProject = fetchProjectData.data;
                if (fetchProject) {
                    tempProjects = [...tempProjects, fetchProject];
                }
            }

            setValues((prev) => ({
                ...prev,
                projects: tempProjects,
            }));
            setLoading(false);
        };

        loading();
    }, [user]);

    const handleSearchClick = () => {
        setModal(true);
    };

    const handleSearchClose = () => {
        setValues((prev) => ({
            ...prev,
            text: "",
        }));
        setModal(false);
    };

    const handleProjectClick = (id) => {
        handleSearchClose();
        navigate(`/${id}`);
    };

    return (
        <>
            <div className={sidebar.setting} onClick={handleSearchClick}>
                <AiOutlineSearch
                    className="icon"
                    style={{ fontSize: "26px" }}
                />
                <div className={sidebar.name}>Search</div>
            </div>
            {modal && (
                <Modal open={modal} onClose={handleSearchClose}>
                    <Box sx={style}>
                        <div className={search.container}>
                            <div className={search.inputContainer}>
                                <div>
                                    <BiSearch className={`icon`} />
                                </div>
                                <div className={search.input}>
                                    <input
                                        type="text"
                                        value={values.text}
                                        onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                text: event.target.value,
                                            }))
                                        }
                                        spellCheck={false}
                                        placeholder="Search Here"
                                        autoFocus
                                    />
                                </div>
                                <div
                                    className={search.times}
                                    style={{
                                        opacity: values.text.length > 0 ? 1 : 0,
                                    }}
                                >
                                    <FaRegTimesCircle
                                        className={`icon`}
                                        onClick={() =>
                                            setValues((prev) => ({
                                                ...prev,
                                                text: "",
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            {!loading && (
                                <div className={search.options}>
                                    <div className={search.option}>
                                        <div className={search.optionName}>
                                            Best Match
                                        </div>
                                        {values.projects
                                            .filter((item) => {
                                                return (
                                                    item.name
                                                        .toLowerCase()
                                                        .includes(
                                                            values.text.toLowerCase()
                                                        ) &&
                                                    values.text.length > 0
                                                );
                                            })
                                            .map((item) => (
                                                <div key={item.id}>
                                                    <div
                                                        className={
                                                            search.project
                                                        }
                                                        onClick={() =>
                                                            handleProjectClick(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        {item.avatar.length >
                                                        0 ? (
                                                            <div
                                                                style={{
                                                                    background: `url(/Images/logos/emojis.png) ${
                                                                        1.6949 *
                                                                        item
                                                                            .avatar[0]
                                                                    }% ${
                                                                        1.6949 *
                                                                        item
                                                                            .avatar[1]
                                                                    }% / 5900% 5900%`,

                                                                    width: "16px",
                                                                    height: "16px",
                                                                }}
                                                            ></div>
                                                        ) : (
                                                            <BiFileBlank />
                                                        )}
                                                        <div
                                                            className={
                                                                search.projectName
                                                            }
                                                        >
                                                            {item.name}
                                                        </div>
                                                        <div className="space-div"></div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default Search;
