import React, { useState } from "react";

// Components
import Topbar from "./Topbar";
import Editor from "./Editor";

// Styles
import styledContent from "./content.module.css";

const Content = (props) => {
    const [expand, setExpand] = useState(false);
    const { project, handleCoverChanged, handleAvatarChange, handleAvatarAdd } =
        props;

    return (
        <div className={styledContent.contentContainer}>
            <Topbar expand={expand} setExpand={setExpand} project={project} />
            <Editor
                expand={expand}
                project={project}
                handleCoverChanged={handleCoverChanged}
                handleAvatarChange={handleAvatarChange}
                handleAvatarAdd={handleAvatarAdd}
            />
        </div>
    );
};

export default Content;
