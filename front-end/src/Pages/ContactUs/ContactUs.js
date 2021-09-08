import React from "react";
import "./ContactUs.css";
import { motion } from "framer-motion";

const ContactUs = () => {
    return <motion.div initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    animate={{ opacity: 1 }} className="contact__page">Contact Us</motion.div>;
};

export default ContactUs;
