import React, { useEffect, useState } from "react";
import AbiaPayment from "../Stripe/AbiaPayment";

const BusinessPaymentPage = (props) => {
  
  const [formvalues, setFormvalues]               = useState({});

  useEffect(() => {
    let token       = localStorage.getItem("vendorToken");
    token           = JSON.parse(token);
    let userSession = token && token.user ? token.user : null;
    setFormvalues((values) => ({ ...values, ['name']: userSession.name, ['holdername']: userSession.name, 
          ['email']: userSession.email, ['contact_person']: userSession.contact_person ,
          ['phone']: userSession.phone,['paybyusing']: 1,['state']: userSession.state }));
  }, []);
  
  return (
      <div className="payment">
        <AbiaPayment formvalues={formvalues} rightPanel={1} payFrom={1}/>
      </div>
  );
};

export default BusinessPaymentPage;
