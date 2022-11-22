import React, { useState } from "react";

import { BiSearch } from "react-icons/bi";
import { FaRegTimesCircle } from "react-icons/fa";

import search from "./search.module.css";
import ProjectSearch from "./ProjectSearch";

const Search = () => {
    const [values, setValues] = useState(() => ({
        text: "",
        active: false,
    }));

    ProjectSearch(values.text, setValues, values);

    return (
        <div className={search.container}>
            <div className={search.inputContainer}>
                <div>
                    <BiSearch className={`icon`} />
                </div>
                <div className={search.input}>
                    <input
                        type="text"
                        value={values.text}
                        onChange={(event) =>
                            setValues((prev) => ({
                                ...prev,
                                text: event.target.value,
                            }))
                        }
                        spellCheck={false}
                        placeholder="Search Here"
                    />
                </div>
                <div
                    className={search.times}
                    style={{ opacity: values.text.length > 0 ? 1 : 0 }}
                >
                    <FaRegTimesCircle
                        className={`icon`}
                        onClick={() =>
                            setValues((prev) => ({
                                ...prev,
                                text: "",
                            }))
                        }
                    />
                </div>
            </div>
            {/* <div className={search.options}>
                <div className={search.option}>
                    <div className={search.optionName}>Today</div>
                    <div className={search.projects}>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                    </div>
                </div>
                <div className={search.option}>
                    <div className={search.optionName}>Yesterday</div>
                    <div className={search.projects}>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                    </div>
                </div>
                <div className={search.option}>
                    <div className={search.optionName}>Past Week</div>
                    <div className={search.projects}>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                    </div>
                </div>
                <div className={search.option}>
                    <div className={search.optionName}>Past 30 Days</div>
                    <div className={search.projects}>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                    </div>
                </div>
                <div className={search.option}>
                    <div className={search.optionName}>Past 30 Days</div>
                    <div className={search.projects}>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                    </div>
                </div>
                <div className={search.option}>
                    <div className={search.optionName}>Past 30 Days</div>
                    <div className={search.projects}>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                        <div className={search.project}>
                            <div className={search.avatar}></div>
                            <div className={search.projectName}>Untitled</div>
                            <div className="space-div"></div>
                            <div className={search.editTime}>2d ago</div>
                        </div>
                    </div>
                </div>
            </div> */}

            <ProjectSearch text={values.text} />
        </div>
    );
};

export default Search;
