import React, { Fragment, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import './PaymentForm.css'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3000/payment", {
          amount: 1000, //add total cart value here
          id: id,
        });

        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>We will contact you shortly regarding your order</h2>
        </div>
      )}
    </Fragment>
  );
}

export default PaymentForm;
