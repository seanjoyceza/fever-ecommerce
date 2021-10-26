import React, { useReducer, useEffect, useState } from "react";
import CartContext from "./cart-ctx";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount =
            +state.totalAmount + +action.item.price * action.item.quantity;
        // console.log(updatedTotalAmount);
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

        console.log("updatedItems",updatedItems);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "ADDALL") {
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

        let updatedTotalAmount = 0;
        for (let i = 0; i < updatedItems.length; i++) {
            updatedTotalAmount +=
                updatedItems[i].price * updatedItems[i].quantity;
        }
        // console.log(updatedItems);
        // console.log(`updatedTotalAmount is: ${updatedTotalAmount}`);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id && item.size === action.size
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.quantity === 1) {
            updatedItems = state.items.filter((item) => {
                return item.id !== action.id || item.size !== action.size;
            });
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            // console.log(updatedItem);
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

    const removeItemFromCart = (id, size) => {
        dispatchCartAction({ type: "REMOVE", id: id, size: size });
    };

    const addItemsToCartHandler = (items) => {
        dispatchCartAction({ type: "ADDALL", item: items });
    };

    const removeAllItemsFromCartHandler = () => {
        dispatchCartAction({ type: "REMOVEALL" });
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("user-cart"));
        // console.log(items);
        dispatchCartAction({ type: "ADDALL", item: items.items });
    }, []);

    useEffect(() => {
        localStorage.setItem("user-cart", JSON.stringify(cartState));
    }, [cartState]);

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
