import React, { useReducer } from "react";
import CartContext from "./cart-ctx";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.quantity;
        // console.log(updatedItems);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    return;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeItemFromCart = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
