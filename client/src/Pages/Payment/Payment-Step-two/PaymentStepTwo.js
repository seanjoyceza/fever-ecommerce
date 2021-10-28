import React, { useEffect, useState, useContext } from "react";
import "./PaymentStepTwo.css";

import CartContext from "../../../ContextStore/cart-ctx";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'

function PaymentStepOne() {
  //CONTEXT API FOR CART
  // const cartItemRemoveHandler = (id) => {
  //   cartCtx.removeItem(id);
  // };

  // const cartItemAddHandler = (item) => {
  //   // console.log(item);
  //   cartCtx.addItem({ ...item, quantity: 1 });
  // };
  const cartCtx = useContext(CartContext);

  const cartAmount = cartCtx.totalAmount;

  // const hasItems = cartCtx.items.length > 0;

  //PAYSTACK -----------------------------------------------------------------
  let totalAmount;
  const publicKey = "pk_test_e6a50ea8a510d5701bffdf68cb9ea88692b8b5b1";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingAmount, setShippingAmount] = useState("");
  const [notComplete, setNotComplete] = useState(true);

  useEffect(() => {
    localStorage.setItem("shipping_name", JSON.stringify(name));
  }, [name]);
  useEffect(() => {
    localStorage.setItem("shipping_email", JSON.stringify(email));
  }, [email]);
  useEffect(() => {
    localStorage.setItem("shipping_phone", JSON.stringify(phone));
  }, [phone]);

  //MAKING SURE ALL FIELDS ARE FILLED IN PRIOR TO MAKING PAYMENT
  // if (name.length === 0) {
  //   alert("complete name");
  // } else {
  //   setNotComplete(false);
  // }

  totalAmount = +cartAmount + +shippingAmount;
  const amount = totalAmount * 100;
  const componentProps = {
    email,
    amount,
    currency: "ZAR",
    metadata: {
      name,
      surname,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
    },
    publicKey,
    text: "Proceed with payment",
    onSuccess: () => {
      setEmail("");
      setName("");
      setSurname("");
      setPhone("");
      setAddressLine1("");
      setAddressLine2("");
      setCity("");
      setProvince("");
      setPostalCode("");
    },
    onClose: () => alert("An error has accured, please try again later"),
  };

  console.log(cartAmount);
  console.log(typeof shippingAmount);
  console.log(cartCtx.items);
  console.log("pc", postalCode);
  // const [showItem, setShowItem] = useState(false);
  // const sendorderInfo = (e) => {
  //   e.preventDefault();
  // };
  //  const checkName = () => {

  //  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='payment__page__right'>
        <p className='payment__page__right__title'>Billing Information</p>
        <div className='payment__page__right__form'>
          {/*-------------------------------------------------------------------------------------------- */}
          <form>
            <input
              type='hidden'
              name='_next'
              value='http://localhost:3000/payment-step-3'
            ></input>
            <input
              type='hidden'
              name='_subject'
              value='New submission!'
            ></input>
            <input type='hidden' name='_captcha' value='false'></input>

            {/*-------------------------------------------------------------------------- */}

            <div className='checkout-field '>
              <label>Name and Surname</label>
              <input
                required
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='checkout-field'>
              <label>Email</label>
              <input
                required
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Phone Number</label>
              <input
                required
                type='text'
                id='phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Address Line 1</label>
              <input
                required
                type='text'
                id='Adress Line 1'
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Address Line 2</label>
              <input
                required
                type='text'
                id='Adress Line 2'
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>

            <div className='checkout-field'>
              <label>City</label>
              <input
                required
                type='text'
                id='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Province</label>
              <input
                required
                type='text'
                id='province'
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className='checkout-field'>
              <label>Postal Code</label>
              <input
                required
                type='text'
                id='postalcode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </form>

          {/*----------------HIDDEN FORM (THIS SENDS ORDER THROUGH TO STORE OWNER)---------------------------- */}

          <form
            action='https://formsubmit.co/harryminnie6@gmail.com'
            method='POST'
          >
            <input
              type='hidden'
              name='_next'
              value='http://localhost:3000/payment-step-3'
            ></input>
            <input
              type='hidden'
              name='_subject'
              value='New submission!'
            ></input>
            <input type='hidden' name='_captcha' value='false'></input>
            <input
              required
              type='text'
              name='Name'
              className='hidden__form__inputs'
              value={JSON.stringify(name)}
            />
            <input
              required
              type='text'
              name='Email'
              className='hidden__form__inputs'
              value={JSON.stringify(email)}
            />
            <input
              required
              type='text'
              name='Phone'
              className='hidden__form__inputs'
              value={JSON.stringify(phone)}
            />
            <input
              required
              type='text'
              name='Address Line 1'
              className='hidden__form__inputs'
              value={JSON.stringify(addressLine1)}
            />
            <input
              required
              type='text'
              name='Address Line 1'
              className='hidden__form__inputs'
              value={JSON.stringify(addressLine2)}
            />
            <input
              required
              type='text'
              name='City'
              className='hidden__form__inputs'
              value={JSON.stringify(city)}
            />
            <input
              required
              type='text'
              name='Province'
              className='hidden__form__inputs'
              value={JSON.stringify(province)}
            />
            <input
              required
              type='text'
              name='Postal Code'
              className='hidden__form__inputs'
              value={JSON.stringify(postalCode)}
            />
            <div className='input__wrapper'>
              <textarea
                name='ordered items'
                className='hidden__form__inputs'
                id='textarea-input'
                defaultValue={JSON.stringify(cartCtx.items)}
              ></textarea>
            </div>
            {/*CHECKING IF ALL THE FILEDS ARE FILLED IN */}
            {name.length === 0 ||
            email.length <= 0  ||
            phone.length > 10 ||
            addressLine1.length == 0 ||
            addressLine2.length == 0 ||
            city.length == 0 ||
            province.length <= 2 ||
            postalCode.length < 3 ? (
              <p className={"contact__form__submitButton__not__complete"}>
                Proceed to final step
              </p>
            ) : (
              <button type='submit' className={"contact__form__submitButton"}>
                Proceed to final step
              </button>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default PaymentStepOne;
