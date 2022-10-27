import React, { useRef, useState } from "react";

import { Resizable, ResizableBox } from "react-resizable";
import "./styles.css";
import "./react-resizable.css";

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

    const ref = useRef(null);

    useState(() => {
        console.log(ref.current);
    }, []);

    console.log(ref.current);

    return (
        <div>
            <button onClick={() => setValues({ width: 2, height: 10 })}>
                Click me
            </button>
            <ResizableBox
                ref={ref}
                width={200}
                height={200}
                // minConstraints={[150, 150]}
                // maxConstraints={[500, 300]}
                style={{
                    position: "sticky",
                    top: 0,
                }}
                axis="x"
                className="resize-box"
            >
                <span className="text">
                    Resizable box, starting at 200x200. Min size is 150x150, max
                    is 500x300.
                </span>
            </ResizableBox>
            <div style={{ height: "200vh" }}>asdas</div>
        </div>
    );
};

export default Resize;
