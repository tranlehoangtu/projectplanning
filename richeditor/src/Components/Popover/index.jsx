import React, { useEffect, useRef } from "react";

const Popover = (props) => {
    const { onClickOutside, children } = props;

    let ref = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (!ref.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, [onClickOutside]);

    return <div ref={ref}>{children}</div>;
};

export default Popover;
