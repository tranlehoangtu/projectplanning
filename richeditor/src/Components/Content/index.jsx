import React from "react";

// Components
import Topbar from "./Topbar";
import Editor from "./Editor";

// Styles
import styledContent from "./content.module.css";

const Content = (props) => {
    const { expand, setExpand } = props;

    return (
        <div className={styledContent.contentContainer}>
            <Topbar expand={expand} setExpand={setExpand} />
            <Editor expand={expand} />
        </div>
    );
};

export default Content;
