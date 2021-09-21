import React, { useState } from "react";
import AuthContext from "./auth-ctx";

const defaultAuthState = { isLoggedIn: false };

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setIsLoggedInHandler = () => {
        setIsLoggedIn(true);
        // console.log("hello from auth-context!");
    };

    const setIsLoggedOutHandler = () => {
        setIsLoggedIn(false);
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
