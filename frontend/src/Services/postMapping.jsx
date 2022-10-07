import axios from "axios";

const postBlock = (data) => {
    return axios({
        method: "post",
        url: `http://localhost:8080/api/block`,
        data,
    });
};

export { postBlock };
