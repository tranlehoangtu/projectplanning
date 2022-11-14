import { EditorState } from "draft-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../Services/fetchProject";
import { updateUser } from "../../Services/fetchUser";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Home Page";

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        const loadLastProject = async () => {
            const lastProject = currentUser.lastProject;

            if (lastProject) navigate(`/${lastProject}`);
            else {
                const createdProject = await createProject({
                    parent: 0,
                    userId: currentUser.id,
                    state: EditorState.createEmpty(),
                });

                await updateUser({
                    ...currentUser,
                    lastProject: createdProject.data.id,
                });

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        ...currentUser,
                        lastProject: createdProject.data.id,
                    })
                );

                navigate(`/${createdProject.data.id}`);
            }
        };

        loadLastProject();
    }, [navigate]);
};

export default Home;
