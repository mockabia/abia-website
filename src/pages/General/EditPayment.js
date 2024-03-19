import React, { useEffect, useState } from "react";
import AbiaPayment from "../Stripe/AbiaPayment";

const EditPayment = (props) => {
  
  return (
      <div className="editPayment">
        <AbiaPayment payFrom={2}/>
      </div>
  );
};

export default EditPayment;
