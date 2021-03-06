import React, { useEffect, useState, useContext } from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./Cart.css";
import AuthContext from "../../ContextStore/auth-ctx";

//components
import CartContext from "../../ContextStore/cart-ctx";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
// import { Button } from "react-bootstrap";

const axios = require("axios").default;
axios.defaults.withCredentials = true;

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

const Cart = (props) => {
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);

    const totalAmount = `R${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

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

    const cartItems = cartCtx.items.map((item) => {
        return (
            //Remember the return keyword when using map - does not come up as an error
            <CartItem
                key={`${item.id}+${item.size}`}
                image={item.image}
                title={item.title}
                quantity={item.quantity}
                price={item.price}
                size={item.size}
                onRemove={cartItemRemoveHandler.bind(null, item.id, item.size)} //bind preconfigures the parameters that the function will receive
                onAdd={cartItemAddHandler.bind(null, item, item.id, item.size)}
            />
        );
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

    //button bump effect
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const btnClasses = `${"link"} ${btnIsHighlighted ? "bump" : ""}`;
    const { items } = cartCtx;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <div className="cart-div">
            <div>
                <p className={btnClasses} onClick={showCartHandler}>
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
                        <div className="d-grid gap-2">
                            <div className="your_cart_note1">
                                Add order note
                            </div>

                            <div className="your_cart_note2">
                                Shipping & taxes calculated at checkout
                            </div>

                            <Link
                                to="/checkout"
                                className="btn btn-success"
                                onClick={onCloseHandler}
                            >
                                Check Out | {totalAmount}
                            </Link>
                        </div>
                    </div>
                )}
            </SlidingPane>
        </div>
    );
};

export default Cart;
