import React, { useEffect, useState, useContext, Fragment } from "react";

import "./PaymentPage.css";
//CART CONTEXT
import CartContext from "../../ContextStore/cart-ctx";
// import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import CartItem from "../Cart/CartItem";

//PAYSTACK
import { PaystackButton } from "react-paystack";

function PaymentPage() {
  //CONTEXT API FOR CART
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    // console.log(item);
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount;
  const hasItems = cartCtx.items.length > 0;

  //PAYSTACK -----------------------------------------------------------------

  const publicKey = "pk_test_e6a50ea8a510d5701bffdf68cb9ea88692b8b5b1";
  const amount = totalAmount * 100;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    currency: "ZAR",
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Proceed with payment",
    onSuccess: () => {
      setEmail("");
      setName("");
      setPhone("");
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  const [showItem, setShowItem] = useState(false);
  return (
    <div className='payment__page'>
      <div className='payment__page__container'>
        <div className='item'>
          <div className='overlay-effect'></div>

          <div className='item-details'>
            <h5 className='item-details__amount'>Cart total</h5>
            <p className='item-details__amount'>R {amount / 100}</p>
          </div>
        </div>
        <div className='checkout'>
          <div className='checkout-form'>
            <div className='checkout-field'>
              <label>Name</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Email</label>
              <input
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Phone</label>
              <input
                type='text'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <PaystackButton className='paystack-button' {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
