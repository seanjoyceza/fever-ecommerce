import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../ContextStore/auth-ctx";
import Form from "react-bootstrap/Form";
import { useHistory, Redirect } from "react-router-dom";
import Flash from "../../Components/Flash/Flash";
const axios = require("axios").default;

const LoginForm = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [flash, setFlash] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");
    const [flashVariant, setFlashVariant] = useState("");

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
                    if (response.data[1] === "password") {
                        setFlashVariant("danger");
                        setFlashMessage(
                            "Password must be more than 2 chars long!"
                        );
                        setFlash(true);
                    } else if (response.data[1] === "email") {
                        setFlashVariant("danger");
                        setFlashMessage("Email is invalid!");
                        setFlash(true);
                    } else if (response.data[1] === "both") {
                        setFlashVariant("danger");
                        setFlashMessage("Email and password is invalid!");
                        setFlash(true);
                    } else if (response.data[1] === "wrong") {
                        setFlashVariant("danger");
                        setFlashMessage(response.data[0]);
                        setFlash(true);
                    }

                    if (response.data.result.message) {
                        setValidated(false);
                    } else {
                        authCtx.setIsLoggedIn(
                            response.data.result[0].UserEmail
                        );
                        history.push("/");
                    }
                })
                .catch(() => {
                    console.log("did not send to backend!");
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlashMessage("");
            setFlash(false);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {flash && <Flash message={flashMessage} variant={flashVariant} />}
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
        </>
    );
};

export default LoginForm;
