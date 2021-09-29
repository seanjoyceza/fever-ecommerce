import React from "react";
import Alert from "react-bootstrap/Alert";

const Flash = (props) => {
    return <Alert variant={props.variant}>{props.message}</Alert>;
};

export default Flash;
