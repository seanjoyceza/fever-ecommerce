import React from "react";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
    const price = `R${props.price.toFixed(2)}`;

    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.title}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.quantity}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button>+</button>
                <button>-</button>
            </div>
        </li>
    );
};

export default CartItem;
