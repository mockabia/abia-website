import React, { useEffect, useState } from "react";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/Payment.css";
import { CheckBoxStyle2, PaymentInput } from "../../components/FormStyle";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { CiCreditCard2 } from "react-icons/ci";

const Payment = () => {
  const { planType } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(
    planType === "annual" ? "annual" : "monthly"
  );
  const [formValues, setFormValues] = useState({
    email: "",
    cname: "",
    card_number: "",
    expiry: "",
    ccv: "",
    condition: true,
  });
  const monthlyAmount = 41.99;
  const annualAmount = 499.0;

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values:", formValues);
  };

  useEffect(() => {
    setSelectedPlan(planType === "annual" ? "annual" : "monthly");
  }, [planType]);
  return (
    <LayoutGeneral>
      <div className="payment-box-container">
        <div className="payment-detail-box">
          {/* Logo section */}
          <div className="payment-header-div">
            <div>
              <h2>ABIA Weddings Australia</h2>
            </div>
          </div>
          {/* Sub head section */}
          <div>
            <h4>Activate’s ABIA Partnership Benefits</h4>
            <h5 className="mt-[5px] mb-[8px]">Choose Your Plan:</h5>
            {/* Plan buttons */}
            <div className="flex justify-normal gap-[1rem]">
              <button
                className={selectedPlan === "monthly" ? "active" : ""}
                onClick={() => handlePlanChange("monthly")}
              >
                Monthly
              </button>
              <button
                className={selectedPlan === "annual" ? "active" : ""}
                onClick={() => handlePlanChange("annual")}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Input Fields */}
          {/* Emal */}
          <PaymentInput
            name="email"
            value={formValues.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            InputProps={{
              placeholder: "Email",
              style: { color: "#000", fontWeight: "600" },
            }}
          />
          {/* Name */}
          <PaymentInput
            name="cname"
            value={formValues.cname}
            onChange={(e) => handleInputChange("cname", e.target.value)}
            InputProps={{
              placeholder: "Cardholder Name",
              style: { color: "#000", fontWeight: "600" },
            }}
          />
          <PaymentInput
            name="card_number"
            value={formValues.card_number}
            onChange={(e) => handleInputChange("card_number", e.target.value)}
            InputProps={{
              placeholder: "Card Number",
              style: { color: "#000", fontWeight: "600" },
              endAdornment: (
                <div>
                  <CiCreditCard2 size={26} color="#d7d7d7" />
                </div>
              ),
            }}
          />
          <div className="flex gap-[1rem]">
            <PaymentInput
              name="expiry"
              placeholder="Expiry - MM/YY"
              value={formValues.expiry}
              onChange={(e) => handleInputChange("expiry", e.target.value)}
              InputProps={{
                placeholder: "Expiry - MM/YY",
                style: { color: "#000", fontWeight: "600" },
              }}
            />
            <PaymentInput
              name="ccv"
              value={formValues.ccv}
              onChange={(e) => handleInputChange("ccv", e.target.value)}
              InputProps={{
                placeholder: "CCV",
                style: { color: "#000", fontWeight: "600" },
              }}
            />
          </div>
          {/* Checkbox */}
          <div>
            <FormControlLabel
              value="end"
              control={
                <CheckBoxStyle2
                  name="condition"
                  checked={formValues.condition}
                  onChange={(e) =>
                    handleInputChange("condition", e.target.checked)
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={
                <span
                  style={{
                    fontFamily: "raleway",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                >
                  I{" "}
                  <span style={{ textTransform: "lowercase" }}>
                    Agree To The{" "}
                  </span>
                  <span
                    style={{ textTransform: "capitalize", color: "#6cc2bc" }}
                  >
                    <Link>Payment Terms And Conditions </Link>
                  </span>
                  <span style={{ textTransform: "lowercase" }}>Of</span> ABIA
                  Weddings Australia.
                </span>
              }
              labelPlacement="end"
            />
          </div>
          {/* Pay buttons */}
          <div className="payments-pay-buttons flex justify-normal gap-[1rem]">
            <button className="button-1" onClick={handleSubmit}>
              Pay
            </button>
            <button className="button-2">Back</button>
          </div>
        </div>
        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="flex justify-start items-center gap-[5px]">
            <h2>
              ${selectedPlan === "monthly" ? monthlyAmount : annualAmount}
            </h2>
            <h4>{selectedPlan === "monthly" ? "per month" : "per year"}</h4>
          </div>
          <h5>
            {selectedPlan === "monthly"
              ? "+ $10 for one-time setup fee $"
              : "+ $10 for Setup Fee"}
          </h5>
          <div className="mt-[8px] flex flex-col gap-[8px]">
            <h3>Payment</h3>
            <h5>
              {selectedPlan === "monthly"
                ? "Monthly (12 month minimum)"
                : "Annual"}
            </h5>
            <h5>For ABIA Partnership Program</h5>
          </div>
        </div>
      </div>
    </LayoutGeneral>
  );
};

export default Payment;
