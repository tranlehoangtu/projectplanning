import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillBug, AiOutlineFileDone, AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import sidebar from "./sidebar.module.css";
import { useRef } from "react";

const templates = [
    {
        name: "AiFillBug",
        icon: <AiFillBug className="icon" key="1" />,
    },
    {
        name: "AiOutlineFileDone",
        icon: <AiOutlineFileDone className="icon" key="2" />,
    },
];

const getChild = (currentProject, projects) => {
    return projects.filter((project) => currentProject.id === project.parrent);
};

const OptionPopover = (props) => {
    let ref = useRef(null);

    const { id, handleDeleteProjectClick, setShown } = props;

    useEffect(() => {
        // const handler = (event) => {
        //     if (!ref.current.contains(event.target)) {
        //         setValues((prev) => ({
        //             ...prev,
        //             shown: false,
        //         }));
        //     }
        // };
        // document.addEventListener("click", handler);
        // return () => {
        //     document.removeEventListener("click", handler);
        // };
    }, []);

    return (
        <div className={sidebar.ellipsisA} ref={ref}>
            <div
                className={sidebar.ellipsisAOption}
                onClick={() => {
                    handleDeleteProjectClick(id);
                    setShown(false);
                }}
            >
                <BsTrash className="icon" /> <div>Delete</div>
            </div>
            <div className={sidebar.ellipsisAOption}>
                <AiOutlineStar className="icon" />{" "}
                <div onClick={() => console.log("add")}>Add to Favorites</div>
            </div>
        </div>
    );
};

const RenderSubject = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [shown, setShown] = useState(false);

    const {
        currentProject,
        projects,
        handleClick,
        handleProjectCreate,
        title,
        currentProjectId,
        handleDeleteProjectClick,
    } = props;

    const handleDropDownClick = (e) => {
        setDropdown(!dropdown);
    };

    const handleProjectCreateClicked = (id) => {
        setDropdown(true);
        handleProjectCreate(id);
    };

    return (
        <>
            <div className={sidebar.subjectItem}>
                <MdKeyboardArrowRight
                    className="icon"
                    onClick={handleDropDownClick}
                    style={{ transform: dropdown ? "rotate(90deg)" : "" }}
                />
                {
                    templates.find(
                        (template) => template.name === currentProject.icon
                    ).icon
                }
                <span onClick={() => handleClick(currentProject.id)}>
                    {currentProject.id === currentProjectId
                        ? title
                        : currentProject.name}
                </span>
                <div
                    className="space-div"
                    onClick={() => handleClick(currentProject.id)}
                ></div>
                <div className={sidebar.optionsContainer}>
                    <div className={sidebar.ellipsis}>
                        <FaEllipsisH
                            className="icon"
                            onClick={() => setShown(!shown)}
                        />
                        {shown && (
                            <OptionPopover
                                id={currentProject.id}
                                handleDeleteProjectClick={
                                    handleDeleteProjectClick
                                }
                                setShown={setShown}
                            />
                        )}
                    </div>
                    <FaPlus
                        className="icon"
                        onClick={() =>
                            handleProjectCreateClicked(currentProject.id)
                        }
                    />
                </div>
            </div>
            {getChild(currentProject, projects).length > 0 && dropdown && (
                <ul>
                    <ul>
                        {getChild(currentProject, projects).map((child) => (
                            <RenderSubject
                                key={child.id}
                                currentProject={child}
                                projects={projects}
                                handleClick={handleClick}
                                handleProjectCreate={handleProjectCreate}
                                title={title}
                                currentProjectId={currentProjectId}
                                handleDeleteProjectClick={
                                    handleDeleteProjectClick
                                }
                            />
                        ))}
                    </ul>
                </ul>
            )}
            {getChild(currentProject, projects).length === 0 && dropdown && (
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

const Subject = (props) => {
    const {
        favor,
        handleProjectClicked,
        handleProjectCreate,
        title,
        currentProjectId,
        handleDeleteProjectClick,
    } = props;

    const getRootProjects = () => {
        return favor.filter((project) => project.parrent === "");
    };

    const handleClick = (id) => {
        handleProjectClicked(id);
    };

    return (
        <>
            {getRootProjects().map((project) => (
                <RenderSubject
                    currentProject={project}
                    projects={favor}
                    key={project.id}
                    handleClick={handleClick}
                    handleProjectCreate={handleProjectCreate}
                    currentProjectId={currentProjectId}
                    title={title}
                    handleDeleteProjectClick={handleDeleteProjectClick}
                />
            ))}
        </>
    );
};

export default Subject;
