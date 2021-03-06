import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../ContextStore/auth-ctx";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Flash from "../../Components/Flash/Flash";
import CartContext from "../../ContextStore/cart-ctx";
import OrdersContext from "../../ContextStore/orders-ctx";
import Fade from "react-reveal/Fade";
import { Button } from "react-bootstrap";
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
    const cartCtx = useContext(CartContext);
    const ordersCtx = useContext(OrdersContext);

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
                        const cartData = response.data.cart;
                        const totalAmount = response.data.totalAmount;
                        for (let i = 0; i < cartData.length; i++) {
                            if (cartData[i].size === "Sm") {
                                cartData[i].size = "Small";
                            } else if (cartData[i].size === "Me") {
                                cartData[i].size = "Medium";
                            } else if (cartData[i].size === "La") {
                                cartData[i].size = "Large";
                            } else if (cartData[i].size === "XL") {
                                cartData[i].size = "XLarge";
                            } else if (cartData[i].size === "XX") {
                                cartData[i].size = "XXLarge";
                            }
                        }
                        // console.log(totalAmount);
                        cartCtx.addItems(cartData, totalAmount);
                        const userOrders = response.data.userOrders;
                        // console.log(userOrders);
                        ordersCtx.addOrder(userOrders);
                        localStorage.setItem(
                            "user",
                            response.data.result[0].UserID
                        );
                        localStorage.setItem(
                            "userFirst",
                            response.data.result[0].UserFirstName
                        );
                        localStorage.setItem(
                            "userOrders",
                            JSON.stringify(userOrders)
                        );

                        authCtx.setIsLoggedIn(response.data.result[0].UserID);
                        history.push("/");
                    }
                })
                .catch(() => {
                    console.log("did not send to backend!");
                });
        }
    };

    useEffect(() => {
        // console.log("useEffect ran!");
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
                <Fade delay={200}>
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

                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Fade>
                <Fade delay={300}>
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
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Fade>
                <Button type="submit" className="btn btn-success">
                    Login
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;
