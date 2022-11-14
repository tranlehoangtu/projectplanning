import axios from "axios";

const getProjectsByUserId = async (id) => {
    return await axios.get(
        `http://localhost:8080/api/v1/project?user-id=${id}`
    );
};

const getProjectById = async (id) => {
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

const modifyProjectProps = async (id, project) => {
    return await axios.put(`http://localhost:8080/api/v1/project/${id}`, {
        ...project,
    });
};

export {
    getProjectsByUserId,
    createProject,
    saveProject,
    deleteProject,
    getProjectById,
    modifyProjectProps,
};
