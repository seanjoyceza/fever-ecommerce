import React from "react";
import "./ThankYou.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import greenArrow from "./assets/green-arrow.png";

function ThankYou() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="thankYou__page"
        >
            <div className="thankYou__page__wrapper">
                <img
                    className="thankYou__page__image"
                    src={greenArrow}
                    alt="green tick"
                />
                <h3>Thank you.</h3>
                {console.log("ran")}
                <Link className="thankYou__page__empty__cart__link" to="/">
                    <h5 className="thankYou__page__empty__cart__h5">
                        Visit our homepage
                    </h5>
                </Link>
                <p className="or__wrapper">or</p>
                <Link className="thankYou__page__empty__cart__link" to="/shop">
                    <h4 className="thankYou__page__empty__cart__h4">Shop</h4>
                </Link>
                <div className="thankYou__page__info">
                    <p>We will contact you shortly regarding your order! </p>
                </div>
            </div>
        </motion.div>
    );
}

export default ThankYou;
