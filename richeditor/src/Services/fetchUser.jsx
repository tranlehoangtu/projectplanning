import axios from "axios";

const login = async (user) => {
    return await axios.post("http://localhost:8080/api/v1/login", { ...user });
};

const signup = async (user) => {
    return await axios.post("http://localhost:8080/api/v1/signup", { ...user });
};

const changeLastProject = async (id, lastProjectId) => {
    return await axios.put(
        `http://localhost:8080/api/v1/${id}?change=true&last-project=${lastProjectId}`
    );
};

export { login, signup, changeLastProject };
