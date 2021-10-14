import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import './StripeContainer.css'

import PaymentForm from '../PaymentForm/PaymentForm'

const PUBLIC_KEY =
  "pk_test_51HzgknDGOy5si9f7qvcWpHNgXGQmscbyNJp6Ha7utFLmSubyE1A8J3V2gTlQAp6jNDUxkDr948oTX7sm74kAMFNL00JWOFySvR";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return <Elements stripe={stripeTestPromise} >
  <PaymentForm className='stripe__container'/>
  </Elements>;
}

export default StripeContainer;
