import React, { useState, useEffect } from "react";
import AbiaMembershipoffers from "../Stripe/AbiaMembershipoffers";

const BusinessUpgrade = () => {
  return (
      <div className="upgradeDiv">
        <AbiaMembershipoffers  redirect={window.PAY} />
      </div>
  );
};

export default BusinessUpgrade;
