import React, { useReducer } from "react";
import OrdersContext from "./orders-ctx";

const defaultOrdersState = {
    orders: [],
};

const ordersReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedOrders = action.item;

        return {
            orders: updatedOrders,
        };
    }

    if (action.type === "REMOVE") {
        const updatedOrders = [];
        return {
            orders: updatedOrders,
        };
    }
};

const OrdersProvider = (props) => {
    const [ordersState, dispatchOrdersAction] = useReducer(
        ordersReducer,
        defaultOrdersState
    );

    const addOrderHandler = (item) => {
        dispatchOrdersAction({ type: "ADD", item: item });
    };

    const removeOrderHandler = (id) => {
        dispatchOrdersAction({ type: "REMOVE", id: id });
    };

    const ordersContext = {
        userOrders: ordersState.orders,
        addOrder: addOrderHandler,
        removeOrder: removeOrderHandler,
    };

    return (
        <OrdersContext.Provider value={ordersContext}>
            {props.children}
        </OrdersContext.Provider>
    );
};

export default OrdersProvider;
