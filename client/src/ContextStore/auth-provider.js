import React, { useState } from "react";
import AuthContext from "./auth-ctx";
const axios = require("axios").default;

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState("");

    const setIsLoggedInHandler = (user) => {
        setIsLoggedIn(user);
        // console.log("hello from auth-context!");
    };

    const setIsLoggedOutHandler = () => {
        setIsLoggedIn("");
        axios.get("http://localhost:3001/api/logout").catch((response) => {
            console.log("Could not log out!");
        });
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
