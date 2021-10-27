import React, { useState } from "react";
import "./MyAccount.css";
import { motion } from "framer-motion";
import PageHeader from "./PageHeader";
import MyOrders from "./MyOrders";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyAccount() {
  const [order, setOrder] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='myAccount__page'
    >
      <div className='myAccount__page__wrapper'>
        <div className='myAccount__page__wrapper__top'>
          <h3 className='myAccount__page__wrapper__top__title'> My Account</h3>
          <p>Welcome back, {"name"}!</p>
        </div>

        <div className='myAccount__page__wrapper__bottom'>
          <div className='myAccount__page__orders__wrapper'>
            <p className='myAccount__page__orders__wrapper__title'>My orders</p>
            <div className='line'></div>
            <div className='order__display'>
              {order ? (
                <p>this is your order</p>
              ) : (
                <p>You haven't placed any orders yet</p>
              )}
            </div>
          </div>
          <div className='track__your__order__wrapper'>
            <p className='track__your__order__wrapper__title'>
              track your order
            </p>
            <div className='line'></div>
            <Link className='track__your__order__wrapper__button' to=''>
              Track
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MyAccount;
