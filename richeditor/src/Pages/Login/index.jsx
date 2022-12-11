import React, { useContext, useState } from "react";
import login from "./login.module.css";

import { login as loginFunction } from "../../Services/fetchUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [values, setValues] = useState(() => ({
        email: "",
        password: "",
        message: "empty",
    }));

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        loginFunction({
            email: values.email,
            password: values.password,
        }).then((res) => {
            const data = res.data;
            if (data) {
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        ...data,
                    })
                );
                setUser(data);
                if (location.state?.from) {
                    navigate(location.state.from);
                } else if (data.lastProject) {
                    navigate(`/${data.lastProject}`);
                } else {
                    navigate("/");
                }
            } else {
                setValues((prev) => ({
                    ...prev,
                    message: "Check your email or password",
                }));
            }
        });
    };

    return (
        <div className={login.container}>
            <form autoComplete="false">
                <div className={login.formContainer}>
                    <div className={login.title}>
                        <div style={{ textAlign: "center" }}>Sign in</div>
                        <div
                            className={login.message}
                            style={{
                                opacity: values.message === "empty" ? 0 : 1,
                            }}
                        >
                            {values.message}
                        </div>
                    </div>
                    <div className={login.textfield}>
                        <div className={login.textfieldLabel}>
                            <span>Email</span>
                        </div>
                        <div className={login.textfieldInput}>
                            <input
                                autoFocus
                                type="email"
                                value={values.email}
                                onChange={(event) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        email: event.target.value,
                                    }));
                                }}
                            />
                            <span></span>
                        </div>
                    </div>
                    <div className={login.textfield}>
                        <div className={login.textfieldLabel}>
                            <span>Password</span>
                        </div>
                        <div className={login.textfieldInput}>
                            <input
                                type="password"
                                value={values.password}
                                onChange={(event) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        password: event.target.value,
                                    }));
                                }}
                            />
                            <span></span>
                        </div>
                    </div>
                    <div className={login.button}>
                        <button onClick={handleSubmit}>Sign In</button>
                    </div>
                    <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
                    <div className={login.notify}>
                        <span>Not a member?</span>
                        <Link to="/signup">Sign up now</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
