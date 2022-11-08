// import React from "react";
// import Sidebar from "./Components/Sidebar";

// const App = () => {
//     return (
//         <div>
//             <Sidebar />
//         </div>
//     );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./Config/routes.js";

const App = () => {
    return (
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
    );
};

export default App;
