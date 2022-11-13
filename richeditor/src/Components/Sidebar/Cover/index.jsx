import React from "react";

import cover from "./cover.module.css";

const Cover = () => {
    return (
        <div className={cover.container}>
            <img
                src="/Images/Cover/solid_yellow.png"
                alt="Solid_Yellow"
                className={cover.image}
            />
        </div>
    );
};

export default Cover;
