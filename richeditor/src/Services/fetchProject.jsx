import axios from "axios";

const getProjectById = async (id) => {
    return await axios.get(`http://localhost:8080/api/v1/project/${id}`);
};

const getProjectsByParentId = async (parentId) => {
    return await axios.get(
        `http://localhost:8080/api/v1/project?type=single&parent-id=${parentId}`
    );
};

// const getProjectsByNameContaining = async (name) => {
//     return await axios.get(

//     )
// }

const getAllChildsByParentId = async (parentId) => {
    return await axios.get(
        `http://localhost:8080/api/v1/project?type=all&parent-id=${parentId}`
    );
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
    getProjectById,
    getProjectsByParentId,
    getAllChildsByParentId,
    createProject,
    saveProject,
    deleteProject,
    modifyProjectProps,
};
