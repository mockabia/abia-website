import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AbiaMembershipoffers from "../Stripe/AbiaMembershipoffers";

const Partnership = () => {
  const location                = useLocation();
  let [redirect,setRedirect]    = useState("");
  useEffect(() => {
    let urls      = location.pathname.split('/').slice(-2);
    let decodeId  = urls[0] !="" ? urls[1] : "";
    let url       = urls[0];
    if(decodeId!="" && url==window.OFFER_SUBSCRIPTION.replace('/', '')){
      setRedirect(window.OFFER_PAYMENT+'/'+decodeId)
    }else{
      setRedirect(window.PUBLIC_PAYMENT)
    }
  }, []);

  return (
    <div className="partnership">
      <AbiaMembershipoffers redirect={redirect}/>
    </div>
  );
};

export default Partnership;
