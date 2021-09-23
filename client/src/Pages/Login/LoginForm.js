import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../ContextStore/auth-ctx";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
const axios = require("axios").default;

const LoginForm = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flash, setflash] = useState("");
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity() === true) {
            axios
                .post("http://localhost:3001/api/login", {
                    email: email,
                    password: password,
                })
                .then((response) => {
                    console.log(response);
                    if (response.data.result.message) {
                        setValidated(false);
                        // authCtx.setIsLoggedOut();
                    } else {
                        authCtx.setIsLoggedIn(
                            response.data.result[0].UserEmail
                        );
                        //sent flash from login route, need to receive in client
                        let message = response.data.messages;
                        history.push("/");
                    }
                })
                .catch(() => {
                    console.log("could not send to backend!");
                });
        }
    };

    useEffect(() => {
        axios.get("http://localhost:3001/api/login").then((response) => {
            if (response.data.loggedIn === true) {
                authCtx.setIsLoggedIn(response.data.user.UserEmail);
            }
        });
    }, []);

    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="form"
        >
            <Form.Group controlId="validationCustom01">
                <Form.Control
                    required
                    defaultValue={email}
                    className="form__input"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
                <Form.Control
                    type="password"
                    defaultValue={password}
                    className="form__input"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <button className="login__button">Login</button>
        </Form>
    );
};

export default LoginForm;
