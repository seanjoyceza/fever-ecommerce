import React, {  useContext } from "react";

import "./PaymentPage.css";
//CART CONTEXT

import CartContext from "../../ContextStore/cart-ctx";

// import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
// import CartItem from "../Cart/CartItem";

//PAYSTACK

import PaymentStepOne from "./Payment-Step-one/PaymentStepOne";

function PaymentPage() {
    //CONTEXT API FOR CART
    const cartCtx = useContext(CartContext);

    // const cartAmount = cartCtx.totalAmount;

    // const hasItems = cartCtx.items.length > 0;

    //PAYSTACK -----------------------------------------------------------------
    // let totalAmount;
    // const publicKey = "pk_test_e6a50ea8a510d5701bffdf68cb9ea88692b8b5b1";

    // const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    // const [surname, setSurname] = useState("");
    // const [phone, setPhone] = useState("");
    // const [addressLine1, setAddressLine1] = useState("");
    // const [addressLine2, setAddressLine2] = useState("");
    // const [city, setCity] = useState("");
    // const [province, setProvince] = useState("");
    // const [postalCode, setPostalCode] = useState("");
    // const [shippingAmount, setShippingAmount] = useState("");
    // totalAmount = +cartAmount + +shippingAmount;
    // const amount = totalAmount * 100;
    // const componentProps = {
    //     email,
    //     amount,
    //     currency: "ZAR",
    //     metadata: {
    //         name,
    //         surname,
    //         phone,
    //         email,
    //         addressLine1,
    //         addressLine2,
    //         city,
    //         province,
    //         postalCode,
    //     },
    //     publicKey,
    //     text: "Proceed with payment",
    //     onSuccess: () => {
    //         setEmail("");
    //         setName("");
    //         setSurname("");
    //         setPhone("");
    //         setAddressLine1("");
    //         setAddressLine2("");
    //         setCity("");
    //         setProvince("");
    //         setPostalCode("");
    //     },
    //     onClose: () => alert("An error has accured, please try again later"),
    // };

    // console.log(cartAmount);
    // console.log(shippingAmount);
    // console.log(cartCtx.items);
    // console.log("pc", postalCode);

    // const [showItem, setShowItem] = useState(false);
    // const sendorderInfo = (e) => {
    //     e.preventDefault();
    // };
    return (
        <div className="payment__page">
            <div className="payment__page__container">
                <PaymentStepOne />
            </div>
        </div>
    );
}

export default PaymentPage;
