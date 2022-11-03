import React, { useState } from "react";

import popover from "./popover.module.css";

import { useRef } from "react";
import { useEffect } from "react";

const options = [
    {
        id: 0,
        name: "Gallery",
    },
    {
        id: 1,
        name: "Upload",
    },
];

const Cover = (props) => {
    const [values, setValues] = useState(() => ({
        selected: 0,
        shown: false,
    }));

    const { name, className, handleImageClick, removeCoverClicked, data } =
        props;

    let ref = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (!ref.current.contains(event.target)) {
                setValues((prev) => ({
                    ...prev,
                    shown: false,
                }));
            }
        };

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);
    return (
        <div className={className} ref={ref}>
            <div className={popover.popoverContainer}>
                <div
                    className={popover.popoverName}
                    onClick={() => {
                        setValues((prev) => ({
                            ...prev,
                            shown: !prev.shown,
                        }));
                    }}
                >
                    {name}
                </div>
                {values.shown && (
                    <div className={popover.popoverContent}>
                        <div className={popover.options}>
                            {options.map((item) => (
                                <div
                                    className={`${popover.option}`}
                                    key={item.id}
                                    onClick={() =>
                                        setValues((prev) => ({
                                            ...prev,
                                            selected: item.id,
                                        }))
                                    }
                                >
                                    <span>{item.name}</span>
                                    {values.selected === item.id && (
                                        <div className={popover.active}></div>
                                    )}
                                </div>
                            ))}
                            <div
                                style={{ flexShrink: "1", flexGrow: "1" }}
                            ></div>
                            <div
                                className={popover.option}
                                onClick={removeCoverClicked}
                            >
                                Remove
                            </div>
                        </div>
                        <div className={popover.popoverContentOptions}>
                            <div className={popover.popoverContentOption}>
                                <div className={popover.popoverContentTitle}>
                                    COLOR & GRADIENT
                                </div>
                                <div className={popover.popoverImageContainer}>
                                    {data.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{ zIndex: 100000 }}
                                        >
                                            <img
                                                src={`/Images/Cover/${item.url}`}
                                                alt={item.name}
                                                className={popover.popoverImage}
                                                onClick={handleImageClick}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div></div>
                            </div>
                            <div className={popover.popoverContentOption}>
                                <div>JAMES WEBB TELESCOPE</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cover;
