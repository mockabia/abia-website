import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/BusinessPayment.css";
import MaskedInput from "react-text-mask";
import { CheckBoxStyle2, PaymentInput } from "../../components/FormStyle";
import { Checkbox, FormControlLabel, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { CiCreditCard2 } from "react-icons/ci";
import * as BusinessJS from "./Business";

const BusinessPaymentPage = () => {
  const { planType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, amount, type } = location.state || {};

  const [selectedPlan, setSelectedPlan] = useState(
    mode === "annually" ? "annually" : "monthly"
  );
  const [vendorDetails, setVendorDetails] = useState({});
  const [formValues, setFormValues] = useState({
    email: "" || vendorDetails.email,
    contact_person: "" || vendorDetails.contact_person,
    card_number: "",
    expiry: "",
    ccv: "",
    condition: true,
  });

  const [dataSet, setDataSet] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    // Check if data has already been fetched
    if (!isDataFetched) {
      BusinessJS.fetchbusiness(setVendorDetails, setDataSet);
      setIsDataFetched(true);
    }
    console.log("Vendor details:", vendorDetails);
  }, [vendorDetails, isDataFetched]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };
  // console.log("Selected plan:", selectedPlan);

  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: "",
    });
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
    console.log("Form Values:", formValues);
  };

  useEffect(() => {
    setSelectedPlan(mode === "annually" ? "annually" : "monthly");
  }, [mode]);

  const handleBack = () => {
    navigate(-1); // Go back one step in the history
  };

  return (
    <div>
      {dataSet ? (
        <div className="payment-box-container">
          <div className="payment-detail-box">
            {/* Logo section */}
            <div className="payment-header-div">
              <div>
                <h2>ABIA Weddings Australia</h2>
              </div>
            </div>
            {/* Display the passed state values */}

            {/* <div>
              <h3>Payment Mode: {mode}</h3>
              <h3>Amount: {amount}</h3>
              <h3>Type: {type}</h3>
            </div> */}
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
              value={vendorDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              InputProps={{
                placeholder: "Email",
                style: { color: "", fontWeight: "600" },
              }}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
            {/* Name */}
            <PaymentInput
              name="contact_person"
              value={vendorDetails.contact_person}
              onChange={(e) => handleInputChange("cname", e.target.value)}
              InputProps={{
                placeholder: "Cardholder Name",
                style: { color: "#000", fontWeight: "600" },
              }}
            />
            {errors.contact_person && (
              <span className="error-message">{errors.contact_person}</span>
            )}
            {/* card number */}
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
                  type="number"
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
          {/* Payment Summary */}
          <div className="payment-summary">
            <div className="flex flex-col gap-[8px] ">
              <h3>Payment Summary</h3>
              <div className="flex justify-start items-center gap-[8px]">
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
              <div className="mt-[8px] flex flex-col gap-[8px] ">
                <h3>Payment</h3>
                <h5>
                  {selectedPlan === "monthly"
                    ? "Monthly (12 month minimum)"
                    : "Annual"}
                </h5>
                <h5>For ABIA {type} Program</h5>
              </div>
              <div className="border-b-4 border-white mt-[10px]"></div>
            </div>

            {/* Business details */}
            <div className="mt-[8px] flex flex-col gap-[5px]">
              <h4 style={{ fontWeight: "600" }}>Business Name</h4>
              <h5>{vendorDetails.name}</h5>
              <h4 style={{ fontWeight: "600" }}>Contact Person</h4>
              <h5>{vendorDetails.contact_person}</h5>
              <h4 style={{ fontWeight: "600" }}>State</h4>
              <h5>{vendorDetails.state_val}</h5>
              <h4 style={{ fontWeight: "600" }}>Email</h4>
              <h5>{vendorDetails.email}</h5>
              <h4 style={{ fontWeight: "600" }}>Phone</h4>
              <h5>{vendorDetails.phone}</h5>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-[2rem]">
            <Skeleton variant="rectangular" width={600} height={20} />
            <br />
            <Skeleton variant="rectangular" width={600} height={20} />
            <br />
            <Skeleton variant="rectangular" width={600} height={20} />
            <br />
            <Skeleton variant="rectangular" width={600} height={60} />
            <br />
            <Skeleton variant="rectangular" width={600} height={60} />
            <br />
            <Skeleton variant="rectangular" width={600} height={60} />
            <br />
            <Skeleton variant="rectangular" width={600} height={60} />
            <br />
            <Skeleton variant="rounded" width={210} height={60} />
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessPaymentPage;
