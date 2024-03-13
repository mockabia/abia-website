import React, { useEffect, useState } from "react";
import "../Style/Payment.css";
import MaskedInput from "react-text-mask";
import { CheckBoxStyle2, PaymentInput } from "../../components/FormStyle";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CiCreditCard2 } from "react-icons/ci";
import * as GeneralJS from "./General";

const Payment = () => {
  const navigate                                  = useNavigate();
  const location                                  = useLocation();
  const { mode, amount, type }                    = location.state || {};
  const [selectedPlan, setSelectedPlan]           = useState(mode === "annually" ? "annually" : "monthly");
  const [formValues, setFormValues]               = useState({});
  const [errors, setErrors]                       = useState({});
  const [loading, setLoading]                     = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  useEffect(() => {
    setSelectedPlan(mode === "annually" ? "annually" : "monthly");
  }, [mode]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    GeneralJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };
  const handleInputChangeVal = (name, value) => {
    GeneralJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input fields
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] === "") {
        newErrors[key] = "Please enter details";
      }
    });

    // Validate checkbox
    if (!formValues.condition) {
      newErrors.condition = "Please agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Set loading state and simulate a 10-second delay
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmissionMessage("Subscription in Progress");

      // Simulate another delay for 10 seconds before showing success message
      setTimeout(() => {
        setSubmissionMessage("Successfully Completed");
      }, 10000);
    }, 0);
  };

  const handleBack = () => {
    navigate(-1); // Go back one step in the history
  };

  return (
      <div className="payment-box-container">
        {/* Payment input details */}
        {submissionMessage ? (
          <div className="payment-subscription-box">
            <h2>{submissionMessage}</h2>

            {submissionMessage === "Successfully Completed" && (
              <>
                <h5>
                  {formValues.contact_person} is an active ABIA Industry Partner
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
            {/* Display loading and submission messages */}
            {/* {loading && <p>Loading...</p>}
            {submissionMessage && <p>{submissionMessage}</p>} */}
            {/* <div>
            <h3>Payment Mode: {mode}</h3>
            <h3>Amount: {amount}</h3>
            <h3>Type: {type}</h3>
          </div>{" "} */}
            {/* Sub head section */}
            <div>
              <h4>Activate’s ABIA {type} Benefits</h4>
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
                  className={selectedPlan === "annually" ? "active" : ""}
                  onClick={() => handlePlanChange("annually")}
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
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
            {/* Name */}
            <PaymentInput
              name="contact_person"
              value={formValues.contact_person}
              onChange={(e) =>
                handleInputChange("contact_person", e.target.value)
              }
              InputProps={{
                placeholder: "Cardholder Name",
                style: { color: "#000", fontWeight: "600" },
              }}
            />
            {errors.contact_person && (
              <span className="error-message">{errors.contact_person}</span>
            )}
            <PaymentInput
              type="number"
              name="card_number"
              value={formValues.card_number}
              onChange={(e) => handleInputChange("card_number", e.target.value)}
              InputProps={{
                placeholder: "Card Number",
                style: { color: "#000", fontWeight: "600" },
                endAdornment: (
                  <div>
                    <CiCreditCard2 size={26} color="#000" />
                  </div>
                ),
              }}
            />
            <div className="mt-[-14px]">
              {errors.card_number && (
                <span className="error-message">{errors.card_number}</span>
              )}
            </div>
            {/* Expiry */}
            <div className="flex gap-[1rem]">
              <div className="flex flex-col gap-[5px]">
                <PaymentInput
                  name="expiry"
                  placeholder="Expiry - MM/YY"
                  value={formValues.expiry}
                  onChange={(e) => handleInputChange("expiry", e.target.value)}
                  InputProps={{
                    inputComponent: MaskedInput,
                    inputProps: {
                      mask: [/\d/, /\d/, "/", /\d/, /\d/],
                      guide: false,
                    },
                    placeholder: "Expiry - MM/YY",
                    style: { color: "#000", fontWeight: "600" },
                  }}
                />
                {errors.expiry && (
                  <span className="error-message">{errors.expiry}</span>
                )}
              </div>
              <div className="flex flex-col gap-[5px]">
                <PaymentInput
                  type="number"
                  name="ccv"
                  value={formValues.ccv}
                  onChange={(e) => handleInputChange("ccv", e.target.value)}
                  InputProps={{
                    placeholder: "CCV",
                    style: { color: "#000", fontWeight: "600" },
                  }}
                />
                {errors.ccv && (
                  <span className="error-message">{errors.ccv}</span>
                )}
              </div>
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
              {errors.condition && (
                <span className="error-message">{errors.condition}</span>
              )}
            </div>
            {/* Pay buttons */}
            <div className="payments-pay-buttons flex justify-normal gap-[1rem]">
              <button className="button-1" onClick={handleSubmit}>
                Pay
              </button>
              <button className="button-2" onClick={handleBack}>
                Back
              </button>
            </div>
          </div>
        )}
        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="flex justify-start items-center gap-[5px]">
            <h2>
              $
              {selectedPlan === "monthly"
                ? type === "Partnership"
                  ? 41.99
                  : type === "Featured"
                  ? 69.99
                  : 0
                : type === "Partnership"
                ? 499.0
                : type === "Featured"
                ? 799.0
                : amount}
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
            <h5>For ABIA {type} Program</h5>
          </div>
          <div className="border-b-4 border-white mt-[10px]"></div>
          {/* Business details */}
          {submissionMessage === "Successfully Completed" && (
            <div className="mt-[8px] flex flex-col gap-[5px]">
              <h4 style={{ fontWeight: "600" }}>Business Name</h4>
              <h5>{formValues.name}</h5>
              <h4 style={{ fontWeight: "600" }}>Contact Person</h4>
              <h5>{formValues.contact_person}</h5>
              <h4 style={{ fontWeight: "600" }}>State</h4>
              <h5>{formValues.state_val}</h5>
              <h4 style={{ fontWeight: "600" }}>Email</h4>
              <h5>{formValues.email}</h5>
              <h4 style={{ fontWeight: "600" }}>Phone</h4>
              <h5>{formValues.phone}</h5>
            </div>
          )}
        </div>
      </div>
  );
};

export default Payment;
