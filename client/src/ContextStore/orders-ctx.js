import React from "react";

const OrdersContext = React.createContext({
    userOrders: [],
    addOrder: (item) => {},
    removeOrder: (item) => {},
});

export default OrdersContext;
