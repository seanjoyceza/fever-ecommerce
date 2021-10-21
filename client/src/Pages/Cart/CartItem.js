import React from "react";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
    const price = `R${parseInt(props.price).toFixed(2)}`;

    return (
        <li className={classes["cart-item"]}>
            <div className={classes.image_containter}>
                <img
                    className={classes.productCard__image}
                    src={props.image}
                    alt="product"
                />
            </div>
            <div className={classes.actions}>
                <div>
                    <h2 className={classes.title}>{props.title}</h2>
                    <p className={classes.size}>{props.size}</p>
                    <p className={classes.price}>{price}</p>
                    <div className={classes.div_align}>
                        <div className={classes.quantity__select}>
                            <button
                                className={classes.quantity__plus}
                                onClick={props.onRemove}
                            >
                                -
                            </button>
                            <span className={classes.quantity__number}>
                                x{props.quantity}
                            </span>
                            <button
                                className={classes.quantity__minus}
                                onClick={props.onAdd}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
