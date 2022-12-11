// React
import React from "react";

// Components
import ColorEditor from "./ColorEditor";
// import FontSizeEditor from "./FontSizeEditor";
import InlineEditor from "./InlineEditor";

const InlineStyles = (props) => {
    return (
        <>
            <InlineEditor {...props} />
            <ColorEditor {...props} />
            {/* <FontSizeEditor {...props} /> */}
        </>
    );
};

export default InlineStyles;
