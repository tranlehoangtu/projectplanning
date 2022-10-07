import axios from "axios";

const getBlock = (id) => {
    return axios({
        method: "get",
        url: `http://localhost:8080/api/block/${id}`,
    });
};

export { getBlock };
