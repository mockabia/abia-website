import React, { useEffect, useState } from "react";
import "../Style/Payment.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StripePay from "./StripePay";
import * as GeneralJS from "../General/General";

const Payment = (props) => {
  const navigate                                  = useNavigate();
  const location                                  = useLocation();
  const { mode, amount, type }                    = location.state || {};
  const [selectedPlan, setSelectedPlan]           = useState(mode === "annually" ? "annually" : "monthly");
  const [errors, setErrors]                       = useState({});
  const [loading, setLoading]                     = useState(false);
  const [paymentStatus, setPaymentStatus]         = useState(false);
  const rightPanel                                = props.rightPanel;
  const [paysettings, setPaysettings]             = useState({});
  const [formvalues, setFormvalues]               = useState({});
  const paymentuser                               = location.state.request;
  const paymentAPI                                = location.state.paymentAPI;

  const handlePlanChange = (plan) => {
    setFormvalues((values) => ({ ...values, ['stype']: plan }));
  };
  useEffect(() => {
    setFormvalues((values) => ({ ...values,... props.formvalues}));
  }, [props.formvalues]);

  useEffect(() => {
    GeneralJS.fetchPayment(setPaysettings)
    setFormvalues((values) => ({ ...values,...paymentuser }));
  }, []);
  
  useEffect(() => {
    let ftypeArray              = {}
    ftypeArray[0]               = {}
    ftypeArray[1]               = {}
    if (formvalues.stype == "0") {
      ftypeArray[0].setupfee    = paysettings.newregfees;
      ftypeArray[0].amounttopay = paysettings.monthlyregfees;
      ftypeArray[0].payamount   = paysettings.monthlyregfees;
      ftypeArray[1].setupfee    = paysettings.newregfees;
      ftypeArray[1].amounttopay = paysettings.monthlyfregfees;
      ftypeArray[1].payamount   = paysettings.monthlyfregfees;
    }else {
      ftypeArray[0].setupfee    = paysettings.newregfees;
      ftypeArray[0].amounttopay = paysettings.annualregfees;
      ftypeArray[0].payamount   = paysettings.annualregfees;
      ftypeArray[1].setupfee    = paysettings.newregfees;
      ftypeArray[1].amounttopay = paysettings.annualfregfees;
      ftypeArray[1].payamount   = paysettings.annualfregfees;
    }
    setFormvalues((values) => ({ ...values,...ftypeArray[formvalues.ftype] }));
  }, [paysettings,formvalues.stype]);


  const formatCurrency = (value) => {
      if (value === undefined) {
      return "";
      }
      return (Math.round(value * 100) / 100).toFixed(2);
  };

  return (
      <div className="payment-box-container">
        
        {/* <pre>{JSON.stringify(formvalues, null, 2)}</pre> */}
        {/* Payment input details */}
        {paymentStatus ? (
          <div className="payment-subscription-box">
            <h2>Successfully Completed</h2>

            {paymentStatus === true && (
              <>
                <h5>
                  {formvalues.contact_person} is an active ABIA Industry Partner
                </h5>
                <h5>
                  Please check you indox as we have resent your login details
                </h5>
                <div className="mt-[1rem]">
                  <login className="payment-login-button">
                    Login to your ABIA account
                  </login>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="payment-detail-box">
            {/* Logo section */}
            <div className="payment-header-div">
              <div>
                <h2>ABIA Weddings Australia</h2>
              </div>
            </div>
            {/* Sub head section */}
            <div>
              <h4>Activate’s ABIA {type} Benefits</h4>
              <h5 className="mt-[5px] mb-[8px]">Choose Your Plan:</h5>
              {/* Plan buttons */}
              <div className="flex justify-normal gap-[1rem]">
                <button
                  className={formvalues.stype==0 ? "active" : ""}
                  onClick={() => handlePlanChange(0)}
                >
                  Monthly
                </button>
                <button
                  className={formvalues.stype==1 ? "active" : ""}
                  onClick={() => handlePlanChange(1)}
                >
                  Annual
                </button>
              </div>
            </div>
            {/* Input Fields */} 
            {/* Emal */}
            {formvalues.payamount && (
              <StripePay request={formvalues} paymentAPI={paymentAPI} setPaymentStatus={setPaymentStatus} />
            )}
          </div>
        )}
        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="flex justify-start items-center gap-[5px]">
            <h2>
            ${formvalues && formatCurrency(formvalues.amounttopay)}
            </h2>
            <h4>{formvalues.stype==0 ? "per month" : "per year"}</h4>
          </div>
          <h5>
            {formvalues.stype==0 ?(
              <span>+ ${formvalues && formvalues.setupfee} for one-time setup fee $</span>
              ): (
                <span>+ ${formvalues && formvalues.setupfee} for Setup Fee</span>
              )}
          </h5>
          <div className="mt-[8px] flex flex-col gap-[8px]">
            <h3>Payment</h3>
            <h5>
              {formvalues.stype==0
                ? "Monthly (12 month minimum)"
                : "Annual"}
            </h5>
            <h5>For ABIA {type} Program</h5>
          </div>
          <div className="border-b-4 border-white mt-[10px]"></div>
          {/* Business details */}
          {paymentStatus || rightPanel && (
            <div className="mt-[8px] flex flex-col gap-[5px]">
              {formvalues.holdername && (
                <>
                  <h4 style={{ fontWeight: "600" }}>Business Name</h4>
                  <h5>{formvalues.holdername}</h5>
                </>
              )}
              {formvalues.contact_person && (
                <>
                  <h4 style={{ fontWeight: "600" }}>Contact Person</h4>
                  <h5>{formvalues.contact_person}</h5>
                </>
              )}
              {formvalues.state && (
                <>
                  <h4 style={{ fontWeight: "600" }}>State</h4>
                  <h5>{formvalues.state}</h5>
                </>
              )}
              {formvalues.email && (
                <>
                  <h4 style={{ fontWeight: "600" }}>Email</h4>
                  <h5>{formvalues.email}</h5>
                </>
              )}
              {formvalues.phone && (
                <>
                  <h4 style={{ fontWeight: "600" }}>Phone</h4>
                  <h5>{formvalues.phone}</h5>
                </>
              )}
            </div>
          )}
        </div>
      </div>
  );
};

export default Payment;
