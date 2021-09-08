import React from "react";
import "./Cart.css";
import { motion } from "framer-motion";

function Cart() {
    return <motion.div initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    animate={{ opacity: 1 }} className="cart__page">Cart</motion.div>;
}

export default Cart;
