// import React, { useEffect } from "react";
// import { useRef } from "react";
// import { useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaRandom } from "react-icons/fa";

// import icon from "./icon.module.css";

const options = [
    {
        id: 0,
        name: "Emojis",
    },
    {
        id: 1,
        name: "Icons",
    },
    {
        id: 2,
        name: "Custom",
    },
];

// const Icon = (props) => {
const { onClick, logos } = props;

const [values, setValues] = useState(() => ({
    selected: 0,
    emojis: logos.find((item) => item.name === "Emojis"),
    icons: logos.find((item) => item.name === "Icons"),
}));

const inputRef = useRef(null);
const ref = useRef(null);

useEffect(() => {
    const handler = (event) => {
        console.log(event.target);
        if (!ref.current.contains(event.target)) {
            console.log("outside");
        }
    };

    window.addEventListener("click", handler);

    return () => {
        console.log("unmount");
        window.removeEventListener("click", handler);
    };
}, []);

const handleInputFocus = (event) => {
    const iconContainer = document.getElementById("icon-container");

    iconContainer.style.border = "1px solid #2383e2";
    iconContainer.style.boxShadow =
        "box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px";
};

const handleInputBlur = () => {
    inputRef.current.style.border = "1px solid #fff";
    inputRef.current.style.boxShadow = "none";
};

//     return (
// <div className={icon.iconContainer} ref={ref}>
//     {/* <div className={icon.options} ref={ref}>
//         {options.map((item) => (
//             <div
//                 key={item.id}
//                 className={icon.option}
//                 onClick={() =>
//                     setValues((prev) => ({
//                         ...prev,
//                         selected: item.id,
//                     }))
//                 }
//             >
//                 <span>{item.name}</span>
//                 {values.selected === item.id && (
//                     <div className={icon.active}></div>
//                 )}
//             </div>
//         ))}
//         <div style={{ flexShrink: "1", flexGrow: "1" }}></div>
//         <div className={icon.option} onClick={onClick}>
//             Remove
//         </div>
//     </div> */}
//     {/* <div className={icon.search}>
//         <div className={icon.input} ref={inputRef} id="icon-container">
//             <span className={icon.inputSearchIcon}>
//                 <AiOutlineSearch />
//             </span>
//             <input
//                 type="text"
//                 className={icon.inputBox}
//                 onFocus={handleInputFocus}
//                 onBlur={handleInputBlur}
//                 placeholder="Filter..."
//                 autoFocus
//             />
//         </div>
//         <div className={icon.random}>
//             <span className={icon.randomIcon}>
//                 <FaRandom />
//             </span>
//         </div>
//     </div> */}
//     {/* <div className={icon.logoContainer}>
//         {values.emojis.content.map((emoji) => {
//             if (emoji.content.length > 0) {
//                 return (
//                     <div key={emoji.id} className={icon.type}>
//                         <div className={icon.typeName}>
//                             {emoji.name}
//                         </div>
//                         <div className={icon.icons}>
//                             {emoji.content.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     className={icon.iconCon}
//                                 >
//                                     <div
//                                         className={icon.icon}
//                                         style={{
//                                             background: `url(/Images/Icon/icons.png) ${
//                                                 1.6949 * item[0]
//                                             }% ${
//                                                 1.6949 * item[1]
//                                             }% / 5900% 5900%`,
//                                         }}
//                                     ></div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 );
//             }
//             return (
//                 <div
//                     key={emoji.id}
//                     style={{ display: "absolute" }}
//                 ></div>
//             );
//         })}
//     </div> */}
// </div>
//     );
// };

// export default Icon;

{
    /* <div className={sidebar.editorIconAb} ref={iconAb}>
                                <div
                                    className={sidebar.editorIcon}
                                    ref={iconRef}
                                    onClick={() =>
                                        setValues((prev) => ({
                                            ...prev,
                                            popover: {
                                                ...prev.popover,
                                                iconPop: !prev.popover.iconPop,
                                            },
                                        }))
                                    }
                                ></div>
                            </div>
                            {values.popover.iconPop && (
                                <Icon
                                    onClick={iconRemoveClicked}
                                    logos={values.logos}
                                    outideClicked={outideClicked}
                                />
                            )} */
}

// const item = icons[Math.floor(Math.random() * icons.length)];
// iconEle.style.background = `url(/Images/Icon/icons.png) ${
//     1.6949 * item[(0, 0)]
// }% ${1.6949 * item[(0, 1)]}% / 5900% 5900%`;

// setValues((prev) => ({
//     ...prev,
//     popover: { ...prev.popover, icon: true },
// }));
