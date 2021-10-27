import React, { useState, useEffect } from "react";
import "./MyAccount.css";
import { motion } from "framer-motion";
import PageHeader from "./PageHeader";
import MyOrders from "./MyOrders";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyAccount() {
  const [order, setOrder] = useState([]);
  const [order2, setOrder2] = useState({});

  //THIS USEEFFECT IS TO GET THE USER ORDER FROM LOCAL STORAGE. (THE AMOUNT IS NEEDED TO AS A VALUE TO BE PAID its the value of the cart and the shipping costs)
  useEffect(() => {
    const saved = localStorage.getItem("userOrders");
    const initialValue = JSON.parse(saved);
    console.log(typeof saved);

    // setShippingEmail(initialValue)
    setOrder(JSON.parse(Object.values(initialValue)[0].OrderItems));
    // console.log("iniital value typeof", typeof initialValue);
    // console.log(initialValue.items);

    Object.values(initialValue).forEach((val) =>
      Object.values(JSON.parse(val.OrderItems))[0].map((element, index) => {
        console.log(element.title);
      })
    );
  }, []);
  console.log("order t of", typeof order);
  console.log("orderrrr", order.items);

  const display_user_order = () => {
    if (order) {
      return order.items.map((item) => {
        for (let key in item) {
          return (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>         
              <td>{item.price}</td>
            </tr>
          );
        }
      });
    }
  };

  //   let ordered = order.items
  //   console.log(typeof JSON.parse(Object.values(order)[0].OrderItems));
  //   ordered.forEach(function(element, index) {
  //     console.log(element.id);
  // });
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
            <p className='myAccount__page__orders__wrapper__title'>
              My latest order
            </p>
            <div className='line'></div>
            <div className='order__display'>
              {!order.items ? (
                "no"
              ) : (
                <table className='table item__table'>
                  <thead className='table__head'>
                    <tr>
                      <th scope='col'>Item</th>
                      <th scope='col'>Size</th>
                      <th scope='col'>Quantity</th>
                      
                      <th scope='col'>Price</th>
                    </tr>
                  </thead>
                  <tbody>{display_user_order()}</tbody>
                </table>
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
