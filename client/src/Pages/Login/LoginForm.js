import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const LoginForm = (props) => {
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
            className="form"
        >
            <Form.Group controlId="validationCustom01">
                <Form.Control
                    required
                    defaultValue={props.email}
                    className="form__input"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => props.setEmail(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
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

            <button className="login__button">Login</button>
        </Form>
    );
};

export default LoginForm;
