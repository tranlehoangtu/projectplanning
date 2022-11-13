import React, { useEffect, useRef } from "react";

import popover from "./popover.module.css";

const Popover = (props) => {
    const { onClickOutside, children, styled, currentRef } = props;

    let ref = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (
                !ref.current.contains(event.target) &&
                !currentRef.contains(event.target)
            ) {
                onClickOutside();
            }
        };

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, [onClickOutside, currentRef]);

    return (
        <div ref={ref} className={`${popover.containerA}`} style={styled}>
            {children}
        </div>
    );
};

export default Popover;
