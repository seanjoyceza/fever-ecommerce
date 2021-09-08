import React from "react";
import "./MyAccount.css";
import { motion } from "framer-motion";

function MyAccount() {
  return <motion.div initial={{ opacity: 0 }}
  exit={{ opacity: 0 }}
  animate={{ opacity: 1 }} className='my-account__page'>my account</motion.div>;
}

export default MyAccount;
