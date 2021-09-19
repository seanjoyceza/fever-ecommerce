import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const RegisterForm = (props) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="register__form"
        >
            <Form.Group controlId="validationCustom01">
                <Form.Control
                    required
                    defaultValue={props.firstName}
                    className="form__input"
                    type="text"
                    placeholder="First Name"
                    name="first name"
                    onChange={(e) => props.setFirstName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
                <Form.Control
                    type="text"
                    defaultValue={props.lastName}
                    className="form__input"
                    placeholder="Last Name"
                    name="last name"
                    onChange={(e) => props.setLastName(e.target.value)}
                    required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom03">
                <Form.Control
                    type="email"
                    defaultValue={props.email}
                    className="form__input"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => props.setEmail(e.target.value)}
                    required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom04">
                <Form.Control
                    type="password"
                    defaultValue={props.password}
                    className="form__input"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => props.setPassword(e.target.value)}
                    required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <input value="Register" type="submit" className="login__button" />
        </Form>
    );
};

export default RegisterForm;
