import React, { useState } from "react";
import signup from "./signup.module.css";

import { signup as signupFunction } from "../../Services/fetchUser";
import { Link } from "react-router-dom";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";

const colors = ["lightgreen", "lightblue", "lightcoral", "lightseagreen"];

const SignUp = () => {
    const [values, setValues] = useState(() => ({
        data: { email: "", password: "", repassword: "", fullname: "" },
        error: {
            email: null,
            password: null,
            repassword: null,
            fullname: null,
        },
        visibility: { password: false, repassword: false },
        message: "empty",
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            values.data.email.indexOf(" ") >= 0 ||
            values.data.email.length === 0
        ) {
            setValues((prev) => ({
                ...prev,
                error: {
                    ...prev.error,
                    email: "Email can't contain empty space",
                    password: null,
                    repassword: null,
                    fullname: null,
                },
            }));
        } else if (
            values.data.password.indexOf(" ") >= 0 ||
            values.data.password.length === 0
        ) {
            setValues((prev) => ({
                ...prev,
                error: {
                    ...prev.error,
                    email: null,
                    password: "Password can't contain empty space",
                    repassword: null,
                    fullname: null,
                },
            }));
        } else if (values.data.repassword.length === 0) {
            setValues((prev) => ({
                ...prev,
                error: {
                    ...prev.error,
                    email: null,
                    password: null,
                    repassword: "Missing re-password",
                    fullname: null,
                },
            }));
        } else if (values.data.fullname.length === 0) {
            setValues((prev) => ({
                ...prev,
                error: {
                    ...prev.error,
                    email: null,
                    password: null,
                    repassword: null,
                    fullname: "Missing fullname",
                },
            }));
        } else {
            signupFunction({
                email: values.data.email,
                password: values.data.password,
                repassword: values.data.repassword,
                fullname: values.data.fullname,
                color: colors[Math.floor(Math.random() * 3) + 1],
            }).then((res) => {
                const data = res.data;
                if (data.id) {
                    setValues((prev) => ({
                        ...prev,
                        error: {
                            ...prev.error,
                            email: null,
                            password: null,
                            repassword: null,
                            fullname: null,
                        },
                        data: {
                            ...prev.data,
                            email: "",
                            password: "",
                            repassword: "",
                            fullname: "",
                        },
                        message: "Create Successful",
                    }));
                    return;
                }
                switch (data.message) {
                    case "email":
                        setValues((prev) => ({
                            ...prev,
                            error: {
                                ...prev.error,
                                email: "email is not valid",
                                password: null,
                                repassword: null,
                                fullname: null,
                            },
                        }));
                        break;
                    case "password":
                        setValues((prev) => ({
                            ...prev,
                            error: {
                                ...prev.error,
                                email: null,
                                password: "Password did not match",
                                repassword: null,
                                fullname: null,
                            },
                        }));
                        break;
                    default:
                        break;
                }
            });
        }
    };

    const handleVisibility = (name) => {
        setValues((prev) => ({
            ...prev,
            visibility: {
                ...prev.visibility,
                [name]: !prev.visibility[name],
            },
        }));
    };

    return (
        <div className={signup.container}>
            <form autoComplete="false">
                <div className={signup.formContainer}>
                    <div className={signup.title}>
                        <span>Create Account</span>
                        <div
                            className={signup.message}
                            style={{
                                opacity: values.message === "empty" ? 0 : 1,
                            }}
                        >
                            {values.message}
                        </div>
                    </div>
                    <div className={signup.textfield}>
                        <div className={signup.textfieldLabel}>
                            <span
                                style={{
                                    marginBottom: values.error.email
                                        ? "24px"
                                        : "",
                                }}
                            >
                                Email
                            </span>
                            <div
                                className={signup.error}
                                style={{
                                    opacity: values.error.email ? 1 : 0,
                                    left: values.error.email ? "0" : "30px",
                                }}
                            >
                                {values.error.email}
                            </div>
                        </div>
                        <div className={signup.textfieldInput}>
                            <input
                                autoFocus
                                type="email"
                                value={values.data.email}
                                onChange={(event) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        data: {
                                            ...prev.data,
                                            email: event.target.value,
                                        },
                                    }));
                                }}
                            />
                            <span></span>
                        </div>
                    </div>
                    <div className={signup.textfield}>
                        <div className={signup.textfieldLabel}>
                            <span
                                style={{
                                    marginBottom: values.error.password
                                        ? "24px"
                                        : "",
                                }}
                            >
                                Password
                            </span>
                            <div
                                className={signup.error}
                                style={{
                                    opacity: values.error.password ? 1 : 0,
                                    left: values.error.password ? "0" : "30px",
                                }}
                            >
                                {values.error.password}
                            </div>
                        </div>
                        <div className={signup.textfieldInput}>
                            <input
                                type={
                                    values.visibility.password
                                        ? "text"
                                        : "password"
                                }
                                value={values.data.password}
                                onChange={(event) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        data: {
                                            ...prev.data,
                                            password: event.target.value,
                                        },
                                    }));
                                }}
                            />
                            <div
                                className={signup.visibility}
                                onClick={() => handleVisibility("password")}
                            >
                                {values.visibility.password ? (
                                    <MdVisibility />
                                ) : (
                                    <MdVisibilityOff />
                                )}
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className={signup.textfield}>
                        <div className={signup.textfieldLabel}>
                            <span
                                style={{
                                    marginBottom: values.error.repassword
                                        ? "24px"
                                        : "",
                                }}
                            >
                                Re-Password
                            </span>
                            <div
                                className={signup.error}
                                style={{
                                    opacity: values.error.repassword ? 1 : 0,
                                    left: values.error.repassword
                                        ? "0"
                                        : "30px",
                                }}
                            >
                                {values.error.repassword}
                            </div>
                        </div>
                        <div className={signup.textfieldInput}>
                            <input
                                type={
                                    values.visibility.repassword
                                        ? "text"
                                        : "password"
                                }
                                value={values.data.repassword}
                                onChange={(event) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        data: {
                                            ...prev.data,
                                            repassword: event.target.value,
                                        },
                                    }));
                                }}
                            />
                            <div
                                className={signup.visibility}
                                onClick={() => handleVisibility("repassword")}
                            >
                                {values.visibility.repassword ? (
                                    <MdVisibility />
                                ) : (
                                    <MdVisibilityOff />
                                )}
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className={signup.textfield}>
                        <div className={signup.textfieldLabel}>
                            <span
                                style={{
                                    marginBottom: values.error.fullname
                                        ? "24px"
                                        : "",
                                }}
                            >
                                Full Name
                            </span>
                            <div
                                className={signup.error}
                                style={{
                                    opacity: values.error.fullname ? 1 : 0,
                                    left: values.error.fullname ? "0" : "30px",
                                }}
                            >
                                {values.error.fullname}
                            </div>
                        </div>
                        <div className={signup.textfieldInput}>
                            <input
                                type="text"
                                value={values.data.fullname}
                                onChange={(event) => {
                                    setValues((prev) => ({
                                        ...prev,
                                        data: {
                                            ...prev.data,
                                            fullname: event.target.value,
                                        },
                                    }));
                                }}
                            />
                            <span></span>
                        </div>
                    </div>
                    <div className={signup.button}>
                        <button onClick={handleSubmit}>Sign Up</button>
                    </div>
                    <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
                    <div className={signup.notify}>
                        <span>Already have an account?</span>
                        <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
