import React, { useEffect, useState, useContext } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";

import CartContext from "../../ContextStore/cart-ctx";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import CartItem from "../Cart/CartItem";
function Checkout() {
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // console.log(item);
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const cartCtx = useContext(CartContext);

  return (
    <div className='checkout__page'>
      {/** 
  {cartCtx.items.map((item) => 
      (<CheckoutProduct
        key={item.id}
        image={item.image}
        title={item.title}
        quantity={item.quantity}
        price={item.price}
        size={item.size}
        onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind preconfigures the parameters that the function will receive
        onAdd={cartItemAddHandler.bind(null, item)} />)
  )} 
  */}
      <div>
        <p className='checkout__page__header'>Review your shopping cart</p>
      </div>
      <div className='checkout__page__display'>
        <CheckoutProduct
          key={"t"}
          image={"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
          title={"bag"}
          quantity={"4"}
          price={"750"}
          size={"xl"}
          // onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind preconfigures the parameters that the function will receive
          // onAdd={cartItemAddHandler.bind(null, item)}
        />
        <CheckoutProduct
          key={"t"}
          image={"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
          title={"bag"}
          quantity={"4"}
          price={"750"}
          size={"xl"}
          // onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind preconfigures the parameters that the function will receive
          // onAdd={cartItemAddHandler.bind(null, item)}
        />
      </div>
      <div>
        <Link to='/payment'>Proceed to payment</Link>
      </div>
    </div>
  );
}

export default Checkout;
