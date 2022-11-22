import { useEffect, useState } from "react";
import axios from "axios";
import search from "./search.module.css";
import { useNavigate } from "react-router-dom";
import { BiFileBlank } from "react-icons/bi";

const ProjectSearch = (props) => {
    const { text } = props;
    const navigate = useNavigate();
    const [values, setValues] = useState([]);

    console.log(values);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios({
            method: "GET",
            url: `http://localhost:8080/api/v1/project/name?name=${text}`,
            cancelToken: source.token,
        })
            .then((res) => {
                setValues(res.data);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
            });

        return () => source.cancel();
    }, [text]);

    return (
        <div>
            {values.length > 0 ? (
                <div className={search.options}>
                    <div className={search.option}>
                        <div className={search.optionName}>Today</div>
                        {values.map((item) => (
                            <div
                                className={search.projects}
                                key={item.id}
                                onClick={() => navigate(`/${item.id}`)}
                            >
                                <div className={search.project}>
                                    {item.avatar.length === 0 ? (
                                        <BiFileBlank />
                                    ) : (
                                        <div
                                            // className={search.avatar}
                                            style={{
                                                background: `url(/Images/logos/emojis.png) ${
                                                    1.6949 * item.avatar[0]
                                                }% ${
                                                    1.6949 * item.avatar[1]
                                                }% / 5900% 5900%`,

                                                width: "16px",
                                                height: "16px",
                                            }}
                                        ></div>
                                    )}
                                    <div className={search.projectName}>
                                        {item.name}
                                    </div>
                                    <div className="space-div"></div>
                                    <div className={search.editTime}>
                                        2d ago
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                "No Result"
            )}
        </div>
    );
};

export default ProjectSearch;
