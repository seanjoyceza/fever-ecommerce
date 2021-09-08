import React from "react";
import "./MyAccount.css";
import { motion } from "framer-motion";
import PageHeader from "./PageHeader";
import MyOrders from "./MyOrders";

function MyAccount() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <PageHeader />
            <MyOrders />
        </motion.div>
    );
}

export default MyAccount;
