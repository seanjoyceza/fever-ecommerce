import React, { useEffect, useState, useContext, Fragment } from "react";
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

  const totalAmount = `R${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  return (
    <div className='checkout__page'>
      {/** 
  
  */}
      {hasItems ? (
        <Fragment>
          {" "}
          <div>
            <p className='checkout__page__header'>Review your shopping cart</p>
          </div>
          <div className='checkout__page__display'>
            {cartCtx.items.map((item) => (
              <CheckoutProduct
                key={item.id}
                image={item.image}
                title={item.title}
                quantity={item.quantity}
                itemPrice={item.price}
                size={item.size}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind preconfigures the parameters that the function will receive
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </div>
          <div className='checkout__page__cartTotal__wrapper'>Cart total: {totalAmount}</div>
          <div className='checkout__page__payment__link__wrapper'>
            <Link className='checkout__page__payment__link' to='/payment'>Proceed to payment</Link>
          </div>
        </Fragment>
      ) : (
        <div className='checkout__page__empty__cart__wrapper'>
          <h2 className='checkout__page__empty__cart__h3'>Your cart is empty</h2>
          <Link className='checkout__page__empty__cart__link' to='/'>
            <h5 className='checkout__page__empty__cart__h5'>Visit our homepage</h5>
          </Link>
          <p>or</p>
          <Link className='checkout__page__empty__cart__link' to='/shop'>
            <h4 className='checkout__page__empty__cart__h4'>Shop</h4>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;
