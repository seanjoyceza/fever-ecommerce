import React from "react";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
    // console.log(props.price);
    const price = `R${parseInt(props.price).toFixed(2)}`;

    return (
        <li className={classes["cart-item"]}>
            <div>
                <div className="productCard__image_holder">
                    <img
                        className="productCard__image"
                        src={props.image}
                        alt="product"
                    />
                </div>
                <h2>{props.title}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.quantity}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onAdd}>+</button>
                <button onClick={props.onRemove}>-</button>
            </div>
        </li>
    );
};

export default CartItem;
