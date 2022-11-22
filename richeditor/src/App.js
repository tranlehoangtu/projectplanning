// Reacts
import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Config
import routes from "./Config/routes.js";

// Contexts
import { UserContext } from "./Context/UserContext";

const App = () => {
    const [user, setUser] = useState(null);
    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider value={providerValue}>
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
        </UserContext.Provider>
    );
};

export default App;
