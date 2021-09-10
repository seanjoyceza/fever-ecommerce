import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./Cart.css";
import CartContext from "../../ContextStore/cart-ctx";
import CartItem from "./CartItem";
import Modal from "../../Components/UI/Modal";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `R${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = () => {};

    const cartItemAddHandler = () => {};

    const cartItems = cartCtx.items.map((item) => {
        <CartItem
            key={item.id}
            title={item.title}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />;
    });

    const [modalState, setModalState] = useState(false);

    const showCartHandler = () => {
        setModalState(true);
    };

    const onCloseHandler = () => {
        setModalState(false);
    };

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.quantity;
    }, 0);

    return (
        <div>
            <div>
                <p className="link" onClick={showCartHandler}>
                    Cart ({numberOfCartItems})
                </p>
            </div>
            <SlidingPane
                isOpen={modalState}
                title="Cart"
                from="right"
                width={windowDimensions.width >= 520 ? "400px" : "280px"}
                onRequestClose={onCloseHandler}
            >
                {cartItems}
                {!hasItems && <div>Your cart is currently empty.</div>}
                {hasItems >= 1 && (
                    <div>
                        <button className="btn checkout-btn">
                            Check Out | {totalAmount}
                        </button>
                        <Link
                            to="/checkout-page"
                            className="yourbag-btn-link"
                            onClick={onCloseHandler}
                        >
                            <button className="btn yourbag-btn">
                                Your Bag
                            </button>
                        </Link>
                    </div>
                )}
            </SlidingPane>
        </div>
    );
};

export default Cart;
