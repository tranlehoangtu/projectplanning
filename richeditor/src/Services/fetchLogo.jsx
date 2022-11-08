import axios from "axios";

const getAllLogo = async () => {
    return await axios.get(`http://localhost:8080/api/v1/logo/logos`);
};

export { getAllLogo };
