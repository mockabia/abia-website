import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as GeneralJS from "../General/General";
import * as servicesPage from "../../services/generalServices";
import AbiaPayment from "../Stripe/AbiaPayment";

const Payment = (props) => {
  const location                        = useLocation();
  //const decodeId                        = location.pathname.split("/").pop();
  const [formvalues, setFormvalues]     = useState({});
  const [payFrom, setPayFrom]           = useState(1);
  const [rightPanel, setRightPanel]     = useState(0);
  const paymentAPI                      = servicesPage.STRIPE_API['PARTNERSHIP_PUBLIC'];

  useEffect(() => {
    let urls      = location.pathname.split('/').slice(-2);
    let decodeId  = urls[0] !="" ? urls[1] : "";
    let url       = urls[0];

    if(decodeId!="" && url==window.PUBLIC_PAYMENT.replace('/', '')){
      GeneralJS.fetchFindPaydecode(decodeId,setFormvalues);
      setPayFrom(3)
      setRightPanel(1)
    }else if(decodeId!="" && url==window.ADD_NEWCARD.replace('/', '')){
      GeneralJS.fetchFindPaydecode(decodeId,setFormvalues);
      setPayFrom(6)
      setRightPanel(1)
    }else if(decodeId!="" && url==window.OFFER_PAYMENT.replace('/', '')){
      //GeneralJS.fetchFindOfferdecode(decodeId,setFormvalues);
      setPayFrom(4)
      setRightPanel(1)
    }
  }, []);
/*   useEffect(() => {
    alert(payFrom)
  }, [payFrom]); */

  return (
      <div className="payment">
        <AbiaPayment payFrom={payFrom} formvalues={formvalues} paymentAPI={paymentAPI} rightPanel={rightPanel}/>
      </div>
  );
};

export default Payment;
