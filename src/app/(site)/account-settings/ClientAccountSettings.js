"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import styles from "./AccountSetting.module.css";

export default function ClientAccountSettings() {
    const { data: session, update: updateSession } = useSession();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [description, setDescription] = useState("");
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [occupation, setOccupation] = useState("");
    const [isEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false)


    // const [isEditingPhoto, setIsEditingPhoto] = useState(false);

    const [isUpdating, setUpdating] = useState(false);

    const hasChanges =
        username !== "" ||
        email !== "" ||
        first_name !== "" ||
        last_name !== "" ||
        password !== "" ||
        dob !== "" ||
        phone !== "" ||
        description !== "" ||
        occupation !== "" ;
        // selectedFile !== null;

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUpdating(true);
        setErrorMsg("");

        const formData = new FormData();
        if (username) formData.append("username", username);
        if (email) formData.append("email", email);
        if (first_name) formData.append("first_name", first_name);
        if (last_name) formData.append("last_name", last_name);
        if (password) formData.append("password", password);
        if (confirmedPassword) formData.append("confirmedPassword", confirmedPassword);
        // if (selectedFile) formData.append("file", selectedFile);
        if (dob) formData.append("dob", dob);
        if (phone) formData.append("phone", phone);
        if (description) formData.append("description", description);
        if (occupation) formData.append("occupation", occupation);

        try {
            const response = await fetch("/api/member/update", {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                if (data.refresh) {
                    await updateSession({
                        user: {
                            mid: session?.user.mid,
                            username: username || session?.user.username,
                            email: email || session?.user.email,
                            first_name: first_name || session?.user.first_name,
                            last_name: last_name || session?.user.last_name,
                            dob: dob,
                            phone: phone,
                            description: description,
                            occupation: occupation || session?.user.occupation,
                        },
                    });
                    await new Promise((resolve) => setTimeout(resolve, 1200));
                    window.location.reload()
                }
                window.location.reload()
            } else {
                setUpdating(false);
                setErrorMsg(`Failed to update user: ${data.message}`);
            }
        } catch (error) {
            setUpdating(false);
            setErrorMsg(error);
        }
    };

    return (
        <>
            <div className={styles["editor-container"]}>
                {/* Overlay and Spinner */}
                {isUpdating && (
                    <div className={styles["editor-overlay"]}>
                        <span className={styles["editor-loading"]}></span>
                    </div>
                )}

                {/* Main Form */}
                <div
                    className={`${styles["editor-box"]} ${isUpdating ? "opacity-50" : "opacity-100"
                        }`}
                >
                    <h2>
                        Update Account Information
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className="flex flex-col space-y-4 w-full"
                    >
                        {/* Username Input */}
                        <div className={styles["editor-block"]}>
                            <label>Username</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder={session?.user.username}
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* first_name Input */}
                        <div className={styles["editor-block"]}>
                            <label>First Name</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70 stroke-black dark:stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        value={first_name}
                                        onChange={(e) => setfirst_name(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder={session?.user.first_name}
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                                
                                {/* <button
                                    type="button"
                                    onClick={() => setisEditing(!isEditing)}
                                    className={styles["editor-button"]}
                                >
                                    {isEditing ? "Lock" : "Edit"}   
                                </button> */}
                            </div>
                        </div>

                        {/* last_name Input */}
                        <div className={styles["editor-block"]}>
                            <label>Last Name</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70 stroke-black dark:stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        value={last_name}
                                        onChange={(e) => setlast_name(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder={session?.user.last_name}
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className={styles["editor-block"]}>
                            <label>Email</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder={session?.user.email}
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className={styles["editor-block"]}>
                            <label>Phone</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                        viewBox="0 0 16 16"
                                    >
                                        
                                        <path d="M3.654 1.328a.678.678 0 0 1 .58-.326h2.678c.252 0 .49.15.581.38l.894 2.21c.096.238.017.513-.189.66l-1.298.939a.678.678 0 0 0-.175.746c.304.773.849 1.78 1.522 2.454.673.674 1.68 1.219 2.454 1.522a.678.678 0 0 0 .746-.175l.94-1.298a.678.678 0 0 1 .66-.189l2.21.894c.231.091.38.329.38.581v2.678a.678.678 0 0 1-.326.58l-2.488 1.672c-.66.442-1.478.568-2.225.37a11.354 11.354 0 0 1-3.849-2.172 11.354 11.354 0 0 1-2.172-3.849c-.198-.747-.072-1.566.37-2.225L3.654 1.328Z" />
                                    </svg>
                                    
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder="(000) 000-0000"
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DOB Input */}
                        <div className={styles["editor-block"]}>
                            <label>Date of Birth</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        fill="none"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7v1m8-1v1m-9 4h10M3 10h18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                                        />
                                    </svg>

                                    <input
                                        type="date" // Native date picker
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder="YYYY-MM-DD"
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className={styles["editor-block"]}>
                            <label>Password</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
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
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder={"Enter new password"}
                                        className={`${styles["field"]}
                                                ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
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
                                  
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={confirmedPassword}
                                        onChange={(e) => setConfirmedPassword(e.target.value)}
                                        placeholder={"Re-enter the password"}
                                        className={`${styles["field"]}
                                                ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            {/* Show password */}
                            <div className="pt-2 w-full">
                                <button
                                    type="button"
                                    className={`${isEditing ? "bg-opacity-45 hover:text-white hover:bg-opacity-55" : "cursor-not-allowed bg-opacity-25"} bg-black w-full text-white dark:text-slate-200 text-md px-7 py-3 rounded-xl`}
                                    onClick={() => {
                                        setShowPassword((prev) => !prev);
                                    }}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Occupation Input */}
                        <div className={styles["editor-block"]}>
                            <label>Occupation</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70 stroke-black dark:stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        value={occupation}
                                        onChange={(e) => setOccupation(e.target.value)}
                                        // disabled={!isEditing}
                                        placeholder={session?.user.occupation}
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio Input */}
                        <div className={styles["editor-block"]}>
                            <label>Biography</label>
                            <div className={styles["block-container"]}>
                                <div className={styles["field-input"]}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70 stroke-black dark:stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                                                    
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Write something about yourself"
                                        className={`${styles["field"]} 
                                            ${isEditing ? "text-white" : "text-black"}`}
                                        autoComplete="off"
                                        rows={5}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Upload */}
                        {/* <div className={styles["editor-block"]}>
                            <label>Upload Profile Image</label>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex flex-grow flex-col">
                                    <div className="flex items-center">
                                        <label
                                            htmlFor="file-upload"
                                            className={`cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg transition-all w-full mr-3
                                            ${isEditingPhoto
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 mr-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                />
                                            </svg>
                                            <span className="md:text-base">
                                                {selectedFile ? "Replace File" : "Choose File"}
                                            </span>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={!isEditingPhoto}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                                            className="ml-auto px-4 py-2 w-[5em] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            {isEditingPhoto ? "Lock" : "Edit"}
                                        </button>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-base-content neutral">
                                            {selectedFile ? selectedFile.name : "No file chosen"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 rounded-lg ${isUpdating
                                ? "bg-green-800 cursor-not-allowed"
                                : hasChanges
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            disabled={!hasChanges || isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Information"}
                        </button>
                    </form>
                </div >
            </div>
            {/* Error Message */}
            {errorMsg ? (
                <div className="text-white py-2 mt-4">
                    <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                        <p className="text-white">
                            {errorMsg}
                        </p>
                    </div>
                </div>
            ) : null
            }
        </>
    );
}