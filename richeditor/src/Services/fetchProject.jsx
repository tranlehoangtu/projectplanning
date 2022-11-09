import axios from "axios";

const getProjectsByUserId = async (id) => {
    return await axios.get(`http://localhost:8080/api/v1/project/${id}`);
};

const createProject = async (project) => {
    return await axios.post(`http://localhost:8080/api/v1/project/create`, {
        ...project,
    });
};

const saveProject = async (project) => {
    return await axios.post(`http://localhost:8080/api/v1/project/save`, {
        ...project,
    });
};

const deleteProject = async (projectId) => {
    return await axios.delete(
        `http://localhost:8080/api/v1/project/delete/${projectId}`
    );
};

export { getProjectsByUserId, createProject, saveProject, deleteProject };
