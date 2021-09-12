import React from "react";
import "./AboutUs.css";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='about__page'
    >
      About Us
    </motion.div>
  );
};

export default AboutUs;
