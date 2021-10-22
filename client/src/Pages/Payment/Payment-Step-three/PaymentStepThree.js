import React, { useEffect, useState, useContext, Fragment } from "react";
import './PaymentStepThree.css'

import CartContext from "../../../ContextStore/cart-ctx";
import { PaystackButton } from "react-paystack";

function PaymentStepThree() {
useEffect(() => {
 
    const saved = localStorage.getItem("shipping_email");
    const initialValue = JSON.parse(saved);
    
    setShippingEmail(initialValue)
    setEmail(initialValue)
  
  
}, [])


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

  //PAYSTACK -----------------------------------------------------------------
  let totalAmount;
  const publicKey = "pk_test_e6a50ea8a510d5701bffdf68cb9ea88692b8b5b1";

  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingAmount, setShippingAmount] = useState("");
  const [shippingOption, setShippingOption] = useState(() => {
    const saved = localStorage.getItem("shipping_option");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [shippingEmail, setShippingEmail] = useState("");
  const [email, setEmail] = useState('');
 

  console.log(shippingOption);
  console.log(email);

 
  console.log("e",email);
  totalAmount = +cartAmount + +shippingOption;
  const amount = totalAmount * 100;
  // const email = shippingEmail;
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
  console.log(shippingAmount);
  console.log(cartCtx.items);
  console.log("pc", postalCode);
  const [showItem, setShowItem] = useState(false);
  const sendorderInfo =(e) => {
    e.preventDefault()
  }
    
    return (
        <div>
        final page
        
        {`totalAmount ${totalAmount}`}
        {`cartAmount ${cartAmount}`}
        {`email ${email}`}
       
          <PaystackButton className='paystack-button' {...componentProps} />
          
        </div>
     
            
        
    )
}

export default PaymentStepThree
