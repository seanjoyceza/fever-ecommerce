import React, { useEffect, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./Cart.css";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

const Cart = (props) => {
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
    return (
        <div>
            <div>
                <p className="link" onClick={showCartHandler}>
                    Cart (0)
                </p>
            </div>
            <SlidingPane
                // closeIcon={<div>Cart</div>}
                isOpen={modalState}
                title="Cart"
                from="right"
                width={windowDimensions.width >= 520 ? "400px" : "280px"}
                // disabled={"happy" === mood ? false : true}
                onRequestClose={onCloseHandler}
            >
                <div>Your cart is currently empty</div>
                <div>
                    <button className="btn checkout-btn">Check Out</button>
                    <button className="btn yourbag-btn">Your Bag</button>
                </div>
            </SlidingPane>
        </div>
    );
};

export default Cart;
