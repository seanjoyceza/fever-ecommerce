import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: (item) => {},
    setIsLoggedOut: (item) => {},
});

export default AuthContext;
