import React from "react";
import { motion } from "framer-motion";
import './Boards.css'

function Boards() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='boards__page'
    >
    boards
    
    </motion.div>
  );
}

export default Boards;
