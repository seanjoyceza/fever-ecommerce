import React from "react";
import "./MyOrders.css";
import { motion } from "framer-motion";

function MyOrders() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="my_orders">
                <div className="my_orders__top">
                    <div className="my_orders__top-left">
                        <div className="my_orders__slogan">
                            <p className="my_orders__slogan__orders">
                                My Orders
                            </p>
                            <p className="my_orders__slogan__message">
                                You haven't placed any orders yet.
                            </p>
                        </div>
                    </div>
                    <div className="my_orders__top-right">
                        <div className="my_orders__slogan">
                            <p className="my_orders__slogan__orders">
                                No Addresses
                            </p>
                            <p className="my_orders__slogan__message">
                                You haven't placed any orders yet.
                            </p>

                            <button className="jokeBtn btn">
                                Manage Addresses
                            </button>
                        </div>
                    </div>
                    <div className=""></div>
                </div>
            </div>
        </motion.div>
    );
}

export default MyOrders;
