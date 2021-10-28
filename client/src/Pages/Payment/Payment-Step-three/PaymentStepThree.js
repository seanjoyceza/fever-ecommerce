import React, { useEffect, useState, useContext } from "react";
import "./PaymentStepThree.css";
import { useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { PaystackButton } from "react-paystack";
import AuthContext from "../../../ContextStore/auth-ctx";
import CartContext from "../../../ContextStore/cart-ctx";
import OrdersContext from "../../../ContextStore/orders-ctx";
const axios = require("axios").default;

function PaymentStepThree() {
    axios.defaults.withCredentials = true;
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const ordersCtx = useContext(OrdersContext);

    let history = useHistory();
    //THIS USEEFFECT IS TO GET THE EMAIL FROM LOCAL STORAGE. (THE EMAIL ADDRESS IS REQUIRED TO MAKE PAYMENT VIA THE STACK PAYMENT PROCESS)
    useEffect(() => {
        const saved = localStorage.getItem("shipping_email");
        const initialValue = JSON.parse(saved);
        setEmail(initialValue);
    }, []);
    //THIS USEEFFECT IS TO GET THE TOTAL AMOUNT TO BE PAID FROM LOCAL STORAGE. (THE AMOUNT IS NEEDED TO AS A VALUE TO BE PAID its the value of the cart and the shipping costs)
    useEffect(() => {
        const saved = localStorage.getItem("total_to_pay");
        const initialValue = JSON.parse(saved);

        // setShippingEmail(initialValue)
        setTotalToPay(initialValue);
    }, []);

    //PAYSTACK -----------------------------------------------------------------

    const publicKey = "pk_test_e6a50ea8a510d5701bffdf68cb9ea88692b8b5b1";

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [email, setEmail] = useState("");
    const [totalToPay, setTotalToPay] = useState("");

    //THIS SETS THE AMOUNT TO THE AMOUNT TO BE PAID AND MULTIPLIES IT BY 100 TO GET A VALUE IN CENTS. (VALUE IN CENTS REQUIRED FOR PAYSTACK)
    const amount = totalToPay * 100;

    const componentProps = {
        email,
        amount,
        currency: "ZAR",
        metadata: {
            name,
            surname,
            phone,
            email,
            addressLine1,
            addressLine2,
            city,
            province,
            postalCode,
        },
        publicKey,
        text: "Proceed with payment",
        onSuccess: () => {
            setEmail("");
            setName("");
            setSurname("");
            setPhone("");
            setAddressLine1("");
            setAddressLine2("");
            setCity("");
            setProvince("");
            setPostalCode("");
            //this line below redirects us to the thank you page
            history.push("/thank-you");
            //after payment is successful clear all saved variables in local storage
            const userCart = localStorage.getItem("user-cart");
            axios
                .post("http://localhost:3001/api/order", {
                    userCart: userCart,
                    paidAmount: totalToPay,
                    userId: authCtx.isLoggedIn,
                })
                .then((response) => {
                    //if successfully saved to backend, clear userCart
                    if (response.data.message === "success") {
                        const userOrders = response.data.userOrders;
                        ordersCtx.addOrder(userOrders);
                        localStorage.setItem(
                            "userOrders",
                            JSON.stringify(userOrders)
                        );
                        //backend cart
                        axios
                            .post(
                                "http://localhost:3001/api/removeAllCartItems",
                                {
                                    userId: authCtx.isLoggedIn,
                                }
                            )
                            .then((res) => {
                                if (res.data === "success") {
                                    //frontend cart
                                    cartCtx.removeAll();
                                }
                            });
                    }
                })
                .catch(() => {
                    console.log("did not send to backend!");
                });

            localStorage.removeItem("total_to_pay");
            localStorage.removeItem("shipping_name");
            localStorage.removeItem("shipping_option");
            localStorage.removeItem("shipping_email");
            localStorage.removeItem("shipping_phone");
            localStorage.removeItem("totalAmount");
            localStorage.removeItem("user-cart");
        },
        onClose: () => alert("An error has accured, please try again later"),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="final__payment__page"
        >
            <div className="final__payment__page__wrapper">
                <p className="final__payment__page__total__title">
                    You are about to make payment
                </p>
                <div className="final__payment__page__total">
                    <p>Total:</p>
                    <p>
                        <b>
                            <p className="final__payment__page__total__value">
                                R{totalToPay}
                            </p>
                        </b>
                    </p>
                </div>

                <PaystackButton
                    className="paystack-button"
                    {...componentProps}
                />
            </div>
        </motion.div>
    );
}

export default PaymentStepThree;
