import React from "react";
import "./Shop.css";
import { motion } from "framer-motion";

const Shop = () => {
    return <motion.div initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    animate={{ opacity: 1 }} className="home__page">Shop</motion.div>;
};

export default Shop;
