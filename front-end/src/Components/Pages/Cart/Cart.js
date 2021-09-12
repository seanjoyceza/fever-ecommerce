import React, { useEffect, useState, useContext } from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./Cart.css";

//components
import CartContext from "../../../ContextStore/cart-ctx";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import Button from "../../UI/Button";

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

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        // console.log(item);
        cartCtx.addItem({ ...item, quantity: 1 });
    };

    const cartItems = cartCtx.items.map((item) => {
        return (
            //Remember the return keyword when using map - does not come up as an error
            <CartItem
                key={item.id}
                image={item.image}
                title={item.title}
                quantity={item.quantity}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind preconfigures the parameters that the function will receive
                onAdd={cartItemAddHandler.bind(null, item)}
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
        <div>
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
                        <Button type={"checkout-btn"}>
                            Check Out | {totalAmount}
                        </Button>
                        <Link
                            to="/checkout-page"
                            className="yourbag-btn-link"
                            onClick={onCloseHandler}
                        >
                            <Button type={"yourbag-btn"}>Your Bag</Button>
                        </Link>
                    </div>
                )}
            </SlidingPane>
        </div>
    );
};

export default Cart;
