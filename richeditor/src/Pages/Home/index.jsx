import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { createProject } from "../../Services/fetchProject";

const Home = () => {
    const [values, setValues] = useState(() => ({
        currentUser: null,
    }));

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        const loadLastProject = async () => {
            const lastProject = currentUser.lastProject;

            if (lastProject)
                setValues((prev) => ({
                    ...prev,
                    currentUser,
                }));
            else {
                const createdProject = await createProject({
                    parent: 0,
                    userId: currentUser.id,
                    state: EditorState.createEmpty(),
                });
            }

            // const updatedUser = await currentUser.setItem(
            //     "currentUser",
            //     JSON.stringify({
            //         ...currentUser,
            //         lastProject: createProject.id,
            //     })
            // );
        };

        loadLastProject();
    }, []);

    // return <>{values.currentUser ? <Sidebar /> : "loading"}</>;
    return <h1>Hello World</h1>;
};

export default Home;
