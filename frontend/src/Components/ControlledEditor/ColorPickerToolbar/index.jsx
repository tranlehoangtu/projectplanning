import React from "react";

const ColorPickerToolbar = (props) => {
    const { translations, onChange, expanded, onExpandEvent, currentState } =
        props;

    // console.log({ , translations, currentState });

    console.log(onChange);

    const handleClick = () => {
        onChange("bgcolor", "#50C7C7");
    };

    return (
        <div>
            <button onClick={handleClick}>Click ME</button>
        </div>
    );
};

export default ColorPickerToolbar;
