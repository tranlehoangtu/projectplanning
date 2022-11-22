import React, { useEffect, useState, useContext } from "react";

import { Popover } from "@mui/material";

import avatar from "./avatar.module.css";

import { BsSearch } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

import { Box } from "@mui/system";
import { useRef } from "react";

// Services
import { getAllAvatar } from "../../../../Services/fetchAvatar";
import { ProjectContext } from "../../../../Context/ProjectContext";
import { modifyProjectProps } from "../../../../Services/fetchProject";

const Avatar = (props) => {
    const { project, setProject } = useContext(ProjectContext);

    const { visible } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(1);
    const [loading, setLoading] = useState(true);
    const [avatars, setAvatars] = useState([]);
    const [value, setValue] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        const loading = async () => {
            const currentAvatars = await getAllAvatar();

            setAvatars([...currentAvatars.data]);
            setSelected(currentAvatars.data[0].id);

            setLoading(false);
        };
        loading();
    }, []);

    const handleClick = (e) => {
        setAnchorEl(e.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFocus = (e) => {
        const boxContainer = document.getElementById("box-container");
        boxContainer.style.border = "1px solid blue";
    };

    const handleBlur = () => {
        const boxContainer = document.getElementById("box-container");
        boxContainer.style.border = "1px solid transparent";
    };

    const handleOptionClick = (id) => {
        setSelected(id);
    };

    const handleAvatarClick = (items) => {
        modifyProjectProps(project.id, { ...project, avatar: [...items] }).then(
            () => {
                setProject((prev) => ({
                    ...prev,
                    avatar: [...items],
                }));
                setAnchorEl(null);
            }
        );
    };

    const handleRemove = () => {
        modifyProjectProps(project.id, { ...project, avatar: [] }).then(() => {
            setProject((prev) => ({
                ...prev,
                avatar: [],
            }));
            setAnchorEl(null);
        });
    };

    const handleRandomClick = () => {
        const min = 0;
        const max = avatars.length - 1;

        const currentContent =
            avatars[Math.floor(Math.random() * (max - min + 1)) + min].content;

        const currentMin = 0;
        const currentMax = currentContent.length - 1;

        const lastContent =
            currentContent[
                Math.floor(Math.random() * (currentMax - currentMin + 1)) +
                    currentMin
            ].content;

        const lastMin = 0;
        const lastMax = lastContent.length - 1;

        const lastChange =
            lastContent[
                Math.floor(Math.random() * (lastMax - lastMin + 1)) + lastMin
            ];

        modifyProjectProps(project.id, {
            ...project,
            avatar: [...lastChange],
        }).then(() => {
            setProject((prev) => ({
                ...prev,
                avatar: [...lastChange],
            }));
        });
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            {!loading && (
                <div
                    className={avatar.container}
                    style={{
                        height: visible ? "39px" : "0px",
                        overflow: visible ? "visible" : "hidden",
                    }}
                >
                    <div
                        className={avatar.containerA}
                        style={{ opacity: visible ? 1 : 0 }}
                    >
                        <div
                            style={{
                                background: `url(/Images/logos/emojis.png) ${
                                    1.6949 * project.avatar[0]
                                }% ${
                                    1.6949 * project.avatar[1]
                                }% / 5900% 5900%`,
                            }}
                            className={avatar.avatar}
                            onClick={handleClick}
                        ></div>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
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
                            <Box className={avatar.wrapper}>
                                <div className={avatar.wrapperOptions}>
                                    {avatars.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() =>
                                                handleOptionClick(item.id)
                                            }
                                            className={avatar.wrapperOption}
                                        >
                                            {item.name}
                                            {selected === item.id && (
                                                <div
                                                    className={avatar.bar}
                                                ></div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="space-div"></div>
                                    <div
                                        className={avatar.wrapperOption}
                                        onClick={handleRemove}
                                    >
                                        Remove
                                    </div>
                                </div>
                                <div className={avatar.textfield}>
                                    <Box
                                        ref={inputRef}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className={`${avatar.inputWrapper}`}
                                        id="box-container"
                                    >
                                        <BsSearch
                                            className={`${avatar.icon} ${avatar.search}`}
                                        />
                                        <input
                                            type="text"
                                            autoFocus={true}
                                            value={value}
                                            onChange={handleInputChange}
                                            className={avatar.input}
                                        />
                                        {value.length > 0 && (
                                            <MdOutlineRemoveCircleOutline
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setValue("")}
                                            />
                                        )}
                                    </Box>
                                    <div
                                        className={`${avatar.random}`}
                                        onClick={handleRandomClick}
                                    >
                                        <FaRandom
                                            className={`${avatar.icon} `}
                                        />
                                    </div>
                                </div>
                                <Box className={avatar.avatarContainer}>
                                    <div className={avatar.avatarWrapper}>
                                        {avatars.map((avatarItem) => {
                                            if (avatarItem.id === selected)
                                                return (
                                                    <div key={avatarItem.id}>
                                                        {avatarItem.content.map(
                                                            (contentItem) => {
                                                                if (
                                                                    contentItem
                                                                        .content
                                                                        .length >
                                                                    0
                                                                )
                                                                    return (
                                                                        <React.Fragment
                                                                            key={
                                                                                contentItem.id
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    avatar.avatarTitle
                                                                                }
                                                                            >
                                                                                {
                                                                                    contentItem.name
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    avatar.avatarItems
                                                                                }
                                                                            >
                                                                                {contentItem.content.map(
                                                                                    (
                                                                                        lastItem,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            <div
                                                                                                className={
                                                                                                    avatar.avatarItemContainer
                                                                                                }
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                onClick={() => {
                                                                                                    handleAvatarClick(
                                                                                                        lastItem
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        background: `url(/Images/logos/emojis.png) ${
                                                                                                            1.6949 *
                                                                                                            lastItem[0]
                                                                                                        }% ${
                                                                                                            1.6949 *
                                                                                                            lastItem[1]
                                                                                                        }% / 5900% 5900%`,
                                                                                                    }}
                                                                                                    className={
                                                                                                        avatar.avatarItem
                                                                                                    }
                                                                                                    // onClick={
                                                                                                    //     handleClick
                                                                                                    // }
                                                                                                ></div>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                        </React.Fragment>
                                                                    );

                                                                return (
                                                                    <React.Fragment
                                                                        key={
                                                                            contentItem.id
                                                                        }
                                                                    ></React.Fragment>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                );
                                            return (
                                                <React.Fragment
                                                    key={avatarItem.id}
                                                ></React.Fragment>
                                            );
                                        })}

                                        {/* <div className={avatar.avatarTitle}>Recent</div> */}
                                        {/* <div className={avatar.avatarItems}>
                                    <div className={avatar.avatarItemContainer}>
                                        <div
                                            style={{
                                                background: `url(/Images/logos/emojis.png) ${
                                                    1.6949 * 0
                                                }% ${
                                                    1.6949 * 1
                                                }% / 5900% 5900%`,
                                            }}
                                            className={avatar.avatarItem}
                                            onClick={handleClick}
                                        ></div>
                                    </div>
                                    <div className={avatar.avatarItemContainer}>
                                        <div
                                            style={{
                                                background: `url(/Images/logos/emojis.png) ${
                                                    1.6949 * 32
                                                }% ${
                                                    1.6949 * 52
                                                }% / 5900% 5900%`,
                                            }}
                                            className={avatar.avatarItem}
                                            onClick={handleClick}
                                        ></div>
                                    </div>
                                </div> */}
                                    </div>
                                </Box>
                            </Box>
                        </Popover>
                    </div>
                </div>
            )}
        </>
    );
};

export default Avatar;
