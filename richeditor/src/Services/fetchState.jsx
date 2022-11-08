import axios from "axios";

const postState = async (state) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(state);

    var raw = JSON.stringify({
        ...state,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/state", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
};

const getState = async () => {
    const data = axios
        .get("http://localhost:8080/api/v1/state/6365d8a009543c09d179da38")
        .then((res) => res.data);

    return data;
};

export { postState, getState };
