import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import "./PaymentStepOne.css";

import CartContext from "../../../ContextStore/cart-ctx";

function PaymentStepOne() {
  const [shippingAmount, setShippingAmount] = useState([]);

  useEffect(() => {
    // storing input name
    localStorage.setItem("shipping_option", JSON.stringify(shippingAmount));
  }, [shippingAmount]);

  //CONTEXT API FOR CART
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // console.log(item);
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const cartCtx = useContext(CartContext);

  const cartAmount = cartCtx.totalAmount;

  const hasItems = cartCtx.items.length > 0;

  let totalAmount = +cartAmount + +shippingAmount;

  totalAmount = +cartAmount + +shippingAmount;
  return (
    <div className='payment__page__left'>
      <div className='payment__page__left__wrapper'>
        <p className='payment__page__left__wrapper__title'>Cart totals</p>
        <div className='payment__page__subtotal'>
          <p>Sub-total: </p>
          <p className='payment__page__subtotal__value'>{cartAmount} </p>
        </div>
        <div className='payment__page__shipping__options__display'>
          <p>Shipping:(please select an option best suited to your order)</p>
          <div className='payment__page__shipping__options'>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={70.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Local Overnight – A Flyer/Bag For Up To 2kg: R70.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={(95.0, 55)}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Local Overnight - A Box For Up To 30kg - Not Bigger Then 500mm X
                500mm X 500mm: R95.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={120.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Overnight Courier - A Flyer/Bag Up To 2kg - Major Centers - NO
                LIPOS: R120.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={120.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Overnight Courier - A Flyer/Bag Up To 2kg - Regional Areas - NO
                LIPOS: R120.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={135.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Road Freight - A Flyer/Bag Up To 2kg - Major Centers: R135.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={135.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Road Freight - A Flyer/Bag Up To 2kg - Regional Areas: R135.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={195.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Economy Road - Anything Up To 15kg – Inside A 450mm X 450mm X
                450mm Box - Major Centers – Delivery Within 2 To 3 Working Days:
                R195.00
              </label>
            </div>
            <div className='payment__page__shipping__option'>
              <input
                className='payment__page__shipping__option__input'
                type='radio'
                id='shipping value'
                name='drone'
                value={195.0}
                onChange={(e) => setShippingAmount(e.target.value)}
              />
              <label className='payment__page__shipping__option__label'>
                Economy Road - Anything Up To 15kg - Inside A 450mm X 450mm X
                450mm Box - Regional Areas – Delivery Within 3 To 5 Working
                Days: R195.00
              </label>
            </div>
          </div>
        </div>
        <div className='payment__page__total'>
          <p>Shipping costs: </p>
          <p className='payment__page__total__value'>
            {shippingAmount ? `R${shippingAmount}` : "--"}
          </p>
        </div>
        <div className='payment__page__total'>
          <p>Total: </p>
          <p className='payment__page__total__value'>
            {totalAmount ? `R${totalAmount}` : "--"}
          </p>
        </div>
      </div>
      <Link to='/payment-step-2'>proceed</Link>
    </div>
  );
}

export default PaymentStepOne;
