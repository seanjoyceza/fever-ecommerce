import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Fade from "react-reveal/Fade";
import "./ContactUsForm.css";
import { Button } from "react-bootstrap";

const ContactUsForm = (props) => {
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
            className="contact__form"
            method="POST"
            action="http://formsubmit.co/seanjoyceza@gmail.com"
        >
            <Fade delay={200}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        className="checkout-field"
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Fade>
            <Fade delay={300}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        className="checkout-field"
                        type="text"
                        placeholder="Enter Surname"
                        name="surname"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Fade>
            <Fade delay={400}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        className="checkout-field"
                        type="email"
                        placeholder="Enter email address"
                        name="email"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Fade>
            <Fade delay={500}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        className="checkout-field"
                        type="text"
                        placeholder="Enter phone number"
                        name="phone"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Fade>
            <Fade delay={600}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        className="checkout-field"
                        type="text"
                        placeholder="Your message..."
                        name="message"
                        as="textarea"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Fade>
            <Button type="submit" className="btn btn-success">
                Send
            </Button>
        </Form>
    );
};

export default ContactUsForm;
