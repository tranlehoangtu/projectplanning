const ColorPic = (props) => {
    const { expanded, onExpandEvent, onChange, currentState } = props;
    console.log({ expanded, onExpandEvent, onChange, currentState });

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleOnChange = (color) => {
        onChange("bgColor", "#ffffff");
    };

    const renderModal = () => {
        const { color } = props.currentState;
        return (
            <div onClick={stopPropagation}>
                <BlockPicker color={color} onChangeComplete={handleOnChange} />
            </div>
        );
    };

    return (
        <div
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="rdw-color-picker"
        >
            <div onClick={onExpandEvent}>
                <img src="images/Heading-1.png" alt="" width="30px" />
            </div>
            {expanded ? renderModal() : undefined}
        </div>
    );
};
