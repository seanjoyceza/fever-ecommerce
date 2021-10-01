import React, { useState, useEffect } from "react";
import AuthContext from "./auth-ctx";

const axios = require("axios").default;

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setIsLoggedIn(loggedInUser);
        }
    }, []);

    const setIsLoggedInHandler = (user) => {
        setIsLoggedIn(user);
    };

    const setIsLoggedOutHandler = () => {
        axios
            .post(
                "http://localhost:3001/api/logout",
                { redentials: "same-origin" },
                { withCredentials: true }
            )
            .catch(() => {
                console.log("Could not log out!");
            });
        localStorage.clear();
        setIsLoggedIn("");
    };

    const authContext = {
        isLoggedIn: isLoggedIn,
        setIsLoggedOut: setIsLoggedOutHandler,
        setIsLoggedIn: setIsLoggedInHandler,
    };
    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
