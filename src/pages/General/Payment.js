import React, { useEffect, useState } from "react";
import AbiaPayment from "../Stripe/AbiaPayment";

const Payment = (props) => {
  
  return (
      <div className="payment">
        <AbiaPayment />
      </div>
  );
};

export default Payment;
