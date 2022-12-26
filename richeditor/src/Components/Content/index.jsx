import React from "react";

// Components
import Topbar from "./Topbar";
import Editor from "./Editor";

// Styles
import styledContent from "./content.module.css";

const Content = (props) => {
    const { expand, setExpand, upload, setUpload } = props;

    return (
        <div className={styledContent.contentContainer}>
            <Topbar
                expand={expand}
                setExpand={setExpand}
                upload={upload}
                setUpload={setUpload}
            />
            <Editor expand={expand} />
        </div>
    );
};

export default Content;
