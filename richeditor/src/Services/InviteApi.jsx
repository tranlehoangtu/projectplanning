import axios from "axios";

const inviteRequests = async (inviteRequest) => {
    return await axios.post(
        "http://localhost:8080/api/v1/invite",
        inviteRequest
    );
};

const getInviteRequestsByType = async (type, id) => {
    return await axios.get(
        `http://localhost:8080/api/v1/invite?type=${type}&id=${id}`
    );
};

const updateInviteRequest = async (inviteRequest) => {
    return await axios.put(`http://localhost:8080/api/v1/invite/update`, {
        ...inviteRequest,
    });
};

const deleteInviteRequest = async (id) => {
    return await axios.delete(
        `http://localhost:8080/api/v1/invite/delete/${id}`
    );
};

export {
    inviteRequests,
    getInviteRequestsByType,
    updateInviteRequest,
    deleteInviteRequest,
};
