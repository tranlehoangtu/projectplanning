import React, { useState } from "react";

import "./styles.css";
import "./react-resizable.css";
import { Resizable, ResizableBox } from "react-resizable";

const Resize = () => {
    const [values, setValues] = useState(() => ({ width: 200, height: 200 }));

    const handleClick = () => {
        setValues((prev) => ({
            ...prev,
            width: 200,
            height: 200,
        }));
    };

    const handleResize = (event, { element, size }) => {
        setValues((prev) => ({
            ...prev,
            width: size.width,
            height: size.height,
        }));
    };

    const handleResizeStop = (props) => {
        console.log(props.data);
    };

    return (
        <div>
            <button onClick={handleClick} style={{ marginBottom: "10px" }}>
                Reset first element's width/height
            </button>
            <div className="layoutRoot">
                <Resizable
                    className="box"
                    height={values.height}
                    width={values.width}
                    onResize={handleResize}
                >
                    <div
                        className="box"
                        style={{
                            width: values.width + "px",
                            height: values.height + "px",
                            maxWidth: "300px",
                            maxHeight: "300px",
                        }}
                    >
                        <span className="text">
                            {
                                "Raw use of <Resizable> element. 200x200, no constraints."
                            }
                        </span>
                    </div>
                </Resizable>
                {/* <ResizableBox className="box" width={200} height={200}>
                    <span className="text">
                        {"<ResizableBox>, same as above."}
                    </span>
                </ResizableBox>
                <ResizableBox
                    className="box"
                    width={200}
                    height={200}
                    draggableOpts={{ grid: [25, 25] }}
                >
                    <span className="text">
                        Resizable box that snaps to even intervals of 25px.
                    </span>
                </ResizableBox> */}
                {/* <ResizableBox
                    className="box"
                    width={200}
                    height={200}
                    minConstraints={[150, 150]}
                    maxConstraints={[500, 300]}
                    handleSize={[9, 10]}
                    onResizeStop={handleResizeStop}
                >
                    <span className="text">
                        Resizable box, starting at 200x200. Min size is 150x150,
                        max is 500x300.
                    </span>
                </ResizableBox> */}
                <ResizableBox className="box" width={200} height={200} axis="x">
                    <span className="text">Only resizable by "x" axis.</span>
                </ResizableBox>
                {/* <ResizableBox
                    className="box box3"
                    width={200}
                    height={200}
                    minConstraints={[150, 150]}
                    maxConstraints={[500, 300]}
                >
                    <span className="text">
                        Resizable box with a handle that only appears on hover.
                    </span>
                </ResizableBox>
                <ResizableBox
                    className="box"
                    width={200}
                    height={200}
                    lockAspectRatio={true}
                >
                    <span className="text">
                        Resizable square with a locked aspect ratio.
                    </span>
                </ResizableBox>
                <ResizableBox
                    className="box"
                    width={200}
                    height={120}
                    lockAspectRatio={true}
                >
                    <span className="text">
                        Resizable rectangle with a locked aspect ratio.
                    </span>
                </ResizableBox>
                <ResizableBox className="box" width={200} height={200} axis="x">
                    <span className="text">Only resizable by "x" axis.</span>
                </ResizableBox>
                <ResizableBox className="box" width={200} height={200} axis="y">
                    <span className="text">Only resizable by "y" axis.</span>
                </ResizableBox>
                <ResizableBox
                    className="box"
                    width={200}
                    height={200}
                    axis="both"
                >
                    <span className="text">Resizable ("both" axis).</span>
                </ResizableBox>
                <ResizableBox
                    className="box"
                    width={200}
                    height={200}
                    axis="none"
                >
                    <span className="text">Not resizable ("none" axis).</span>
                </ResizableBox> */}
            </div>
        </div>
    );
};

export default Resize;
