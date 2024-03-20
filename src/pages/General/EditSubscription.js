import React, { useState, useEffect } from "react";
import AbiaMembershipoffers from "../Stripe/AbiaMembershipoffers";

const Partnership = () => {
  
  return (
    <div className="editSubscription partnership">
      <AbiaMembershipoffers redirect={window.EDIT_PAYMENT} />
    </div>
  );
};

export default Partnership;
