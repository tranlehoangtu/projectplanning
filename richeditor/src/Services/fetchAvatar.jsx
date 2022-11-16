import axios from "axios";

const getAllAvatar = async () => {
    return await axios.get(`http://localhost:8080/api/v1/avatar`);
};

export { getAllAvatar };
