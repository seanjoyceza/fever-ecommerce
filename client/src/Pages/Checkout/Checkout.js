import React, { useContext, Fragment } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../../ContextStore/auth-ctx";

import CartContext from "../../ContextStore/cart-ctx";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";

const axios = require("axios").default;
axios.defaults.withCredentials = true;

function Checkout() {
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);

    const cartItemRemoveHandler = (id, size) => {
        // console.log(id);
        // console.log(size);

        if (authCtx.isLoggedIn) {
            //backend cart
            axios
                .post("http://localhost:3001/api/updateCartItem", {
                    productId: id,
                    productSize: size,
                    userId: authCtx.isLoggedIn,
                    increment: -1,
                })
                .then((res) => {
                    //frontend cart
                    cartCtx.removeItem(id, size);
                })
                .catch(() => {
                    console.log("did not send to backend!");
                });
        }
        //
    };

    const cartItemAddHandler = (item, id, size) => {
        // console.log(id);
        // console.log(size);

        if (authCtx.isLoggedIn) {
            //backend cart
            axios
                .post("http://localhost:3001/api/updateCartItem", {
                    productId: id,
                    productSize: size,
                    userId: authCtx.isLoggedIn,
                    increment: 1,
                })
                .then((res) => {
                    //frontend cart
                    cartCtx.addItem({ ...item, quantity: 1 });
                })
                .catch(() => {
                    console.log("did not send to backend!");
                });
        }
        //
    };

    const totalAmount = `R${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="checkout__page"
        >
            {/** 
  
  */}
            {hasItems ? (
                <Fragment>
                    <div>
                        <p className="checkout__page__header">
                            Review your shopping cart
                        </p>
                    </div>
                    <div className="checkout__page__display">
                        {cartCtx.items.map((item) => (
                            <CheckoutProduct
                                key={`${item.id}+${item.size}`}
                                image={item.image}
                                title={item.title}
                                quantity={item.quantity}
                                itemPrice={item.price}
                                size={item.size}
                                onRemove={cartItemRemoveHandler.bind(
                                    null,
                                    item.id,
                                    item.size
                                )} //bind preconfigures the parameters that the function will receive
                                onAdd={cartItemAddHandler.bind(
                                    null,
                                    item,
                                    item.id,
                                    item.size
                                )}
                            />
                        ))}
                    </div>
                    <div className="checkout__page__cartTotal__wrapper">
                        Cart total: {totalAmount}
                    </div>
                    <div className="checkout__page__payment__link__wrapper">
                        <Link
                            className="checkout__page__payment__link"
                            to="/payment"
                        >
                            Proceed to Payment Step 1
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <div className="checkout__page__empty__cart__wrapper">
                    <h2 className="checkout__page__empty__cart__h3">
                        Your cart is empty
                    </h2>
                    <Link className="checkout__page__empty__cart__link" to="/">
                        <h5 className="checkout__page__empty__cart__h5">
                            Visit our homepage
                        </h5>
                    </Link>
                    <p>or</p>
                    <Link
                        className="checkout__page__empty__cart__link"
                        to="/shop"
                    >
                        <h4 className="checkout__page__empty__cart__h4">
                            Shop
                        </h4>
                    </Link>
                </div>
            )}
        </motion.div>
    );
}

export default Checkout;
