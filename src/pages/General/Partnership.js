import React, { useState, useEffect } from "react";
import AbiaMembershipoffers from "../Stripe/AbiaMembershipoffers";

const Partnership = () => {
  
  return (
    <div className="partnership">
      <AbiaMembershipoffers redirect={window.PUBLIC_PAYMENT}/>
    </div>
  );
};

export default Partnership;
