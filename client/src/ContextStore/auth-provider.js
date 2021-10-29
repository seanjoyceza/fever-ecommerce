import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./auth-ctx";
import CartContext from "./cart-ctx";

const axios = require("axios").default;

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const cartCtx = useContext(CartContext);

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
                { credentials: "same-origin" },
                { withCredentials: true }
            )
            .then(cartCtx.removeAll())
            .catch(() => {
                console.log("Could not log out!");
            });
        localStorage.clear();
        setIsLoggedIn("");
    };
    //

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
//
export default AuthProvider;
