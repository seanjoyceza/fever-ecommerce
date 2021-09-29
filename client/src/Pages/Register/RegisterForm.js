import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Flash from "../../Components/Flash/Flash";
import AuthContext from "../../ContextStore/auth-ctx";

const axios = require("axios").default;

const RegisterForm = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [flash, setFlash] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");
    const [flashVariant, setFlashVariant] = useState("");
    const authCtx = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            axios
                .post("http://localhost:3001/api/register", {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
                .then((response) => {
                    if (response.data === "success") {
                        history.push("/");
                    } else if (response.data[1] === "exists") {
                        setFlashVariant("danger");
                        setFlashMessage(response.data[0]);
                        setFlash(true);
                    } else if (response.data[1] === "password") {
                        setFlashVariant("danger");
                        setFlashMessage(response.data[0]);
                        setFlash(true);
                    } else if (response.data[1] === "email") {
                        setFlashVariant("danger");
                        setFlashMessage(response.data[0]);
                        setFlash(true);
                    } else if (response.data[1] === "both") {
                        setFlashVariant("danger");
                        setFlashMessage(response.data[0]);
                        setFlash(true);
                    }
                    if (response.data[0] === "success") {
                        authCtx.setIsLoggedIn(response.data[1]);
                        history.push("/");
                    } else {
                        setValidated(false);
                    }
                })
                .catch(() => {
                    console.log("did not send to backend!");
                });
        }
    };
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
                className="register__form"
                method="POST"
                action="http://localhost:3000/api/users/register"
            >
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        defaultValue={firstName}
                        className="form__input"
                        type="text"
                        placeholder="First Name"
                        name="first name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                    <Form.Control
                        type="text"
                        defaultValue={lastName}
                        className="form__input"
                        placeholder="Last Name"
                        name="last name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom03">
                    <Form.Control
                        type="email"
                        defaultValue={email}
                        className="form__input"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom04">
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

                <input
                    value="Register"
                    type="submit"
                    className="login__button"
                />
            </Form>
        </>
    );
};

export default RegisterForm;
