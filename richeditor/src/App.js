// Reacts
import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Config
import routes from "./Config/routes.js";

// Contexts
import { UserContext } from "./Context/UserContext";
import { TaskContext } from "./Context/TaskContext";
import { ProjectContext } from "./Context/ProjectContext.jsx";

const App = () => {
    const [user, setUser] = useState(null);
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);

    const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    const projectValue = useMemo(
        () => ({ project, setProject }),
        [project, setProject]
    );
    const taskValue = useMemo(() => ({ task, setTask }), [task, setTask]);

    return (
        <UserContext.Provider value={userValue}>
            <ProjectContext.Provider value={projectValue}>
                <TaskContext.Provider value={taskValue}>
                    <Router>
                        <Routes>
                            {routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Routes>
                    </Router>
                </TaskContext.Provider>
            </ProjectContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
