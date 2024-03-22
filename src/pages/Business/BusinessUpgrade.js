import React, { useState, useEffect } from "react";
import AbiaMembershipoffers from "../Stripe/AbiaMembershipoffers";

const BusinessUpgrade = () => {
  const logined = 1;
  return (
      <div className="upgradeDiv">
        <AbiaMembershipoffers logined={logined} redirect={window.PAY} />
      </div>
  );
};

export default BusinessUpgrade;
