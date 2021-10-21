import React, { useReducer, useEffect, useState } from "react";
import CartContext from "./cart-ctx";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.quantity;

        const existingCartItemIndex = state.items.findIndex(
            (item) =>
                item.id === action.item.id && item.size === action.item.size
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        localStorage.setItem("userCart", updatedItems);
        localStorage.setItem("totalAmount", updatedTotalAmount);

        console.log(updatedItems);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "ADDALL") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.quantity;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        // console.log(updatedItems);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.quantity === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVEALL") {
        return {
            items: [],
            totalAmount: 0,
        };
    }

    //note to self - check bookmark for updating reducer state with useEffect
    // if (action.type === "UPDATE") {
    //     console.log(localStorage.getItem("userCart"));
    //     let cartItems;
    //     if (localStorage.getItem("userCart")) {
    //         return (cartItems = localStorage.getItem("userCart"));
    //     }

    //     return {
    //         items: cartItems,
    //     };
    // }

    return defaultCartState;
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

    const addItemsToCartHandler = (items) => {
        dispatchCartAction({ type: "ADDALL", item: items });
    };

    const removeAllItemsFromCartHandler = () => {
        dispatchCartAction({ type: "REMOVEALL" });
    };

    // const updateOnReload = () => {
    //     dispatchCartAction({ type: "UPDATE" });
    // };

    // useEffect(() => {
    //     updateOnReload();
    // }, []);

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCart,
        addItems: addItemsToCartHandler,
        removeAll: removeAllItemsFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
