import { Check, KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import "./ListToolbar.css";

const LIST_STYLES = [
    {
        label: "Ordered",
        style: "ordered",
        url: "/Images/Numbered-List.png",
    },
    {
        label: "Unordered",
        style: "unordered",
        url: "/Images/Bulleted-List.png",
    },
    {
        label: "Indent",
        style: "indent",
        url: "/Images/Indent.png",
    },
    {
        label: "Outdent",
        style: "outdent",
        url: "/Images/Outdent.png",
    },
];

const ListToolbar = (props) => {
    const { onChange, expanded, onExpandEvent, currentState } = props;

    const getCurrentListStyle = () => {
        return LIST_STYLES.find((list) => list.style === currentState.listType);
    };

    console.log(props);

    return (
        <div
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="list-container"
            className="list-container"
        >
            <button onClick={() => onChange("outdent")}>Click Me</button>
            <div className="list-dropdown" onClick={onExpandEvent}>
                <span>
                    {getCurrentListStyle()
                        ? getCurrentListStyle().label
                        : LIST_STYLES[0].label}
                </span>
                <KeyboardArrowDown />
            </div>
            {expanded && (
                <div className={`list-item-container ${expanded && "show"}`}>
                    <div className="list-item-sub">ORDER TYPE</div>
                    <div className="list-item-data">
                        {LIST_STYLES.map((item) => (
                            <div
                                className="list-item"
                                key={item.label}
                                onClick={() => onChange(item.style)}
                            >
                                <div className="list-item-head">
                                    <img src={item.url} alt={item.label} />
                                    {item.label}
                                </div>
                                {item.style === currentState.listType && (
                                    <div className="list-item-foot">
                                        <Check />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListToolbar;
