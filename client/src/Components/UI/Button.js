import React from "react";

import "./Button.css";

const Button = (props) => {
    const myClass = `btn ${props.type}`;

    return <button className={myClass}>{props.children}</button>;
};

export default Button;
