"use client";

import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import styles from "./Login.module.css"
// import OAuthButton from "./OAuthButton";
import CancelButton from "@/ui/components/buttons/CancelButton";
import AcceptFormButton from "@/ui/components/buttons/AcceptFormButton";


const Signin = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const email = useRef("");
    const password = useRef("");

    const getErrorMessage = (error) => {
        if (!error) return "";
        switch (error) {
            case "CredentialsSignin":
                return "Invalid email or password.";
            default:
                return "Authentication Failed.";
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrorMsg("");
        setSuccessMsg("Signing in...");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));

            await signIn("credentials", {
                email: email.current,
                password: password.current,
                redirect: true,
                callbackUrl: props.callbackUrl ?? "/"
            });

        } catch (error) {
            setErrorMsg("An error occurred while signing in.");
            console.error(error);
        }
    };

    // const handleOAuthSignInStart = () => {
    //     setSuccessMsg("Signing in...");
    //     setErrorMsg("");
    // };

    return (
        <div className={styles["login"]}>
            <h1>
                Sign In
            </h1>

            {/* Success Message */}
            {successMsg ? (
                <div className={styles["success-msg"]}>
                    <p id="success-text">{successMsg}</p>
                    <span className={styles["loading-spinner"]} />
                </div>
            ) : null}

            <form onSubmit={onSubmit}>

                {/* Email Input */}
                <div className={styles["field"]}>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <div className={styles["input-container"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={(e) => (email.current = e.target.value)}
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className={styles["field"]}>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <div className={styles["input-container"]}>
                        {/* Password Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        {/* Password Input */}
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            onChange={(e) => (password.current = e.target.value)}
                        />

                        {/* Eye Icon for Toggling Password Visibility */}
                        <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="focus:outline-none">
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 opacity-70"
                                >
                                    <path d="M12 4.5c-4.636 0-8.686 2.91-10.47 7.012a1.5 1.5 0 0 0 0 1.005C3.314 16.59 7.364 19.5 12 19.5s8.686-2.91 10.47-7.012a1.5 1.5 0 0 0 0-1.005C20.686 7.41 16.636 4.5 12 4.5ZM12 17.25a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Zm0-1.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 opacity-70"
                                >
                                    <path d="M12 4.5c-4.636 0-8.686 2.91-10.47 7.012a1.5 1.5 0 0 0 0 1.005C3.314 16.59 7.364 19.5 12 19.5s8.686-2.91 10.47-7.012a1.5 1.5 0 0 0 0-1.005C20.686 7.41 16.636 4.5 12 4.5ZM12 17.25a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Zm5.5-5.25a5.5 5.5 0 0 1-9.5 3.868V9.382a5.5 5.5 0 0 1 9.5 3.868Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className={styles["button-container"]}>
                    <AcceptFormButton msg="Sign in" />
                    <CancelButton props={{ callbackUrl: props.callbackUrl ?? "/" }} />
                </div>
            </form>

            <h2>OR</h2>

            {/* OAuth Buttons */}
            {/* <div className="flex flex-col gap-4 items-center">
                <OAuthButton callbackUrl={props.callbackUrl} provider={"google"} onSignInStart={handleOAuthSignInStart} />
                <OAuthButton callbackUrl={props.callbackUrl} provider={"discord"} onSignInStart={handleOAuthSignInStart} />
                <OAuthButton callbackUrl={props.callbackUrl} provider={"github"} onSignInStart={handleOAuthSignInStart} />
            </div> */}

            {/* Error Message */}
            {(errorMsg || props.error) && (
                <div className={styles["error-msg"]}>
                    <p>{errorMsg || getErrorMessage(props.error)}</p>
                </div>
            )}
        </div>
    );
};

export default Signin;
