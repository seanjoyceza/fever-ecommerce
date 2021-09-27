import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
const axios = require("axios").default;

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const history = useHistory();

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
                    if (response.data === "Success!") {
                        console.log(response.data);
                        history.push("/");
                    } else {
                        console.log("Email already exists!");
                    }
                })
                .catch(() => {
                    console.log("could not send to backend!");
                });
        }
    };
    //   const navigate = useNavigate();
    //   useEffect(() => {
    //     let didCancel = false;
    //     const goToHomePage = () => navigate('/home');

    return (
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

            <input value="Register" type="submit" className="login__button" />
        </Form>
    );
};

export default RegisterForm;
