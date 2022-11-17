import React, { useEffect, useState } from "react";
import { getProjectById } from "../../Services/fetchProject";
import { getUserById } from "../../Services/fetchUser";
import Content from "../../Components/Content";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);

    useEffect(() => {
        // document.title = "Home Page";
        const localUser = JSON.parse(localStorage.getItem("currentUser"));
        const loading = async () => {
            const currentUser = await getUserById(localUser.id);
            const lastProject = currentUser.data.lastProject;

            if (lastProject) {
                const currentProject = await getProjectById(lastProject);

                setProject(currentProject.data);
                setLoading(true);
            } else {
                // do thing if we don't have a last project or this is first times login
                console.log("Home: Doesn't have any proejct");
                // const createdProject = await createProject({
                //     parent: 0,
                //     userId: currentUser.id,
                //     state: EditorState.createEmpty(),
                // });
            }

            // if (lastProject) navigate(`/${lastProject}`);
            // else {
            // const createdProject = await createProject({
            //     parent: 0,
            //     userId: currentUser.id,
            //     state: EditorState.createEmpty(),
            // });

            //     await updateUser({
            //         ...currentUser,
            //         lastProject: createdProject.data.id,
            //     });

            //     localStorage.setItem(
            //         "currentUser",
            //         JSON.stringify({
            //             ...currentUser,
            //             lastProject: createdProject.data.id,
            //         })
            //     );
            //     navigate(`/${createdProject.data.id}`);
            // }
        };
        loading();
    }, []);

    // Cover Section
    const handleCoverChanged = (image) => {
        setProject((prev) => ({
            ...prev,
            background: image,
        }));
    };

    // Avatar Section
    const handleAvatarChange = (avatars) => {
        setProject((prev) => ({
            ...prev,
            avatars: [...avatars],
        }));
    };

    const handleAvatarAdd = () => {
        // setModals((prev) => ({
        //     ...prev,
        //     avatar: true,
        // }));

        setProject((prev) => ({
            ...prev,
            avatars: [0, 0],
        }));
    };

    return (
        <>
            {loading && (
                <>
                    {/* <Sidebar /> */}
                    <Content
                        project={project}
                        handleCoverChanged={handleCoverChanged}
                        handleAvatarChange={handleAvatarChange}
                        handleAvatarAdd={handleAvatarAdd}
                    />
                    {/* <CommentBlock /> */}
                </>
            )}
        </>
    );
};

export default Home;
