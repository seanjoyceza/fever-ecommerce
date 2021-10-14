import React, { Fragment, useState } from "react";
import StripeContainer from "./StripeContainer/StripeContainer";
import './PaymentPage.css'

function PaymentPage() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className='payment__page'>
      {showItem ? (
        <StripeContainer />
      ) : (
        <Fragment>
        <p> buy this thing</p>
          <button onClick={() => setShowItem(true)}> Purchase</button>
        </Fragment>
      )}
    </div>
  );
}

export default PaymentPage;
