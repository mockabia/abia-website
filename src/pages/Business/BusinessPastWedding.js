import React, { useEffect, useState } from "react";
import "../Style/BusinessGetReviews.css";
import { Controller, useForm } from "react-hook-form";
import ContentHeader from "../../layouts/sidebar/ContentHeader";

import Select, { components } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  customSelectStyles2,
  MoreSelectedBadge,
  MultiValue,
} from "../../components/FormStyle";

import * as BusinessJS from "./Business";
import { useLocation } from "react-router-dom";
import {
  RatingDatePicker,
  VendorDatePicker,
} from "../../components/DatepickerPublic";
import { format } from "date-fns";

const PastWedding = () => {
  const [vendorInput, setVendorInputs] = useState({});
  const vendorId = vendorInput.vid;
  const [formValues, setFormValues] = useState({
    bride: "",
    groom: "",
    date_of_wedding: null,
    wedding_state: "",
    email: "",
    confirm_email: "",
    phone: "",
    vcid: [],
    vid: "",
  });
  const [stateOptions, setStateOptions] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [inputsErrors, setInputsErrors] = useState({});
  // const [errors, setInputsErrors] = React.useState({});
  const [dataSet, setDataSet] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  // vendor inputs for vid
  useEffect(() => {
    BusinessJS.fetchbusiness(setVendorInputs, setDataSet);
  }, []);

  // Vendor services
  useEffect(() => {
    if (vendorInput && vendorInput.vid) {
      BusinessJS.fetchBusinessServices(setCategoryOptions, vendorInput.vid);
    }
  }, [vendorInput]);

  // state fetch
  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);

  const registrationGuidelines = [
    "1. ABIA will not release registered details to any third parties.",
    "2. Only register weddings that took place in the past 12 months from 00-00-0000.",
    "3. Your Wedding Client has 365 days from their wedding date to complete the form.",
    "4. You can resend the online voting forms every 3 days.",
    "5. ABIA will send an automated reminder to your Wedding Client at least '2' times.",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Select option data

  const handleInputChange = (fieldName, value) => {
    // console.log(`Updating ${fieldName} with value: ${value}`);
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
    setInputsErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleStateChange = (fieldName, selectedOption) => {
    const stateValue = selectedOption ? selectedOption.label : "";
    setSelectedState(stateValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedOption.url,
    }));
    setInputsErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleDateChange = (fieldName, date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = format(date, "yyyy-MM-dd");
      console.log("Selected Date:", formattedDate);
      setFormValues({ ...formValues, [fieldName]: formattedDate });
      setInputsErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    }
  };
  const handleServicesChange = (selectedOptions) => {
    const selectedVcid = selectedOptions.map((option) => option.value);
    setFormValues({ ...formValues, vcid: selectedVcid });
    setInputsErrors((prevErrors) => ({ ...prevErrors, vcid: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.bride) {
      errors.bride = "Full Name is required";
    }
    if (!formValues.groom) {
      errors.groom = "Partner's Name is required";
    }

    if (!formValues.date_of_wedding) {
      errors.date_of_wedding = "Wedding Date is required";
    }
    if (!formValues.wedding_state) {
      errors.wedding_state = "State is required";
    }

    if (!formValues.email) {
      // Validate Email
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid Email";
    }

    if (!formValues.confirm_email) {
      // Validate Email
      errors.confirm_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.confirm_email)) {
      errors.confirm_email = "Invalid Email";
    }

    if (!formValues.phone) {
      errors.phone = "Partner's Name is required";
    }
    if (!formValues.vcid || formValues.vcid.length === 0) {
      errors.vcid = "Service booked is required";
    }
    // console.log("Validation Errors:", errors);
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        vid: vendorId,
      }));
      // Use the updated formValues returned by setFormValues
      setFormValues((updatedFormValues) => {
        BusinessJS.updateManageWedding(1, updatedFormValues, setApiErrors);
        // console.log("Current form values:", { updatedFormValues });
        return updatedFormValues; // Ensure the state is correctly updated
      });
    } else {
      setInputsErrors(validationErrors);
    }
  };
  return (
    <>
      {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
      <div className="md:hidden">
        <ContentHeader title="Register Past Weddings" />
      </div>
      <div className="register-past">
        <div className="main-header-past">
          <h2 className="">
            Send an online voting form to your wedding clients today
          </h2>
          <p className="mt-[10px] whitespace-adjust">
            Your clients will receive a customised voting link delivered
            directly to their inbox/junk mail. We highly recommend you text or
            email your client advising{" "}
            <span className="text-[#3fa19a] font-[600] cursor-pointer ">
              vote@abia.com.au
            </span>{" "}
            has sent them an email.
          </p>
        </div>
        {/* Registration Guidelines */}
        <div className="card-past">
          <h3 className="lg:ml-[11px]">Registration Guide:</h3>
          <ul className="custom-ol">
            {registrationGuidelines.map((guideline, index) => (
              <li key={index} className="mt-[10px] custom-li">
                {index === 3 ? (
                  <p className="whitespace-adjust">
                    4. You can{" "}
                    <span>
                      <a
                        className="text-[#6cc2bc] font-semibold underline"
                        href="www.abia.com.au/vendor/wedding-history"
                      >
                        resend the online voting forms
                      </a>{" "}
                    </span>
                    every 3 days.
                  </p>
                ) : (
                  <p className="whitespace-adjust">{guideline}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Register - Form */}
        <div className="form-grid">
          <div className="mt-[25px]">
            <form
              className="space-y-0 font-semibold"
              onSubmit={handleFormSubmit}
            >
              <label className="t">Client's Full Name*</label>
              {/* <br /> */}
              <div className="relative">
                <span className="user-icon"></span>
                <input
                  name="bride"
                  type="text"
                  className="input-style"
                  value={formValues.bride}
                  onChange={(e) => handleInputChange("bride", e.target.value)}
                />
              </div>
              {inputsErrors.bride && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {inputsErrors.bride}
                </p>
              )}
              <br />
              <label className="header-text-past">Partner's Name*</label>
              <br />
              <div className="relative">
                <span className="heart-icon"></span>
                <input
                  name="groom"
                  type="text"
                  className="input-style"
                  value={formValues.groom}
                  onChange={(e) => handleInputChange("groom", e.target.value)}
                />
              </div>
              {inputsErrors.groom && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {inputsErrors.groom}
                </p>
              )}
              <br />
              <div className="mt-[0px] flex flex-col gap-[5px]">
                <label>Wedding Date*</label>
                <VendorDatePicker
                  name="date_of_wedding"
                  value={formValues.date_of_wedding}
                  handleDateChange={(date) =>
                    handleDateChange("date_of_wedding", date)
                  }
                />

                {inputsErrors.date_of_wedding && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {inputsErrors.date_of_wedding}
                  </p>
                )}
              </div>
              <br />
              <label className="header-text-past">Wedding State*</label>
              <br />
              <div className="relative">
                <Select
                  name="wedding_state"
                  placeholder=""
                  options={stateOptions}
                  onChange={(selectedOption) =>
                    handleStateChange("wedding_state", selectedOption)
                  }
                  styles={customSelectStyles2}
                  value={{ label: selectedState, value: selectedState }}
                  components={{
                    MultiValue,
                    IndicatorSeparator: null,
                    DropdownIndicator: () => (
                      <div>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="dropDown-position"
                          style={{
                            color: "#7c7c7c",
                            marginRight: "1.5rem",
                          }}
                        />
                      </div>
                    ),
                  }}
                />

                {inputsErrors.wedding_state && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {inputsErrors.wedding_state}
                  </p>
                )}
              </div>
              <br />
              <label className="header-text-past">Email*</label>
              <br />
              <div className="relative">
                <span className="email-icon"></span>
                <input
                  name="email"
                  type="email"
                  className="input-style"
                  value={formValues.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              {inputsErrors.email && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {inputsErrors.email}
                </p>
              )}
              <br />
              <label className="header-text-past">Confirm Email*</label>
              <br />
              <div className="relative">
                <span className="email-icon"></span>
                <input
                  name="confirm_email"
                  type="email"
                  className="input-style"
                  value={formValues.confirm_email}
                  onChange={(e) =>
                    handleInputChange("confirm_email", e.target.value)
                  }
                />
              </div>
              {inputsErrors.confirm_email && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {inputsErrors.confirm_email}
                </p>
              )}
              <br />
              <label className="header-text-past">Phone</label>
              <br />
              <div className="relative">
                <span className="phone-icon"></span>
                <input
                  name="phone"
                  type="number"
                  inputMode="tel"
                  value={formValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="input-style"
                />
              </div>
              <br />
              <label className="header-text-past">Services Booked*</label>
              <br />
              <div className="relative">
                <Select
                  name="vcid"
                  isMulti
                  placeholder={""}
                  options={categoryOptions}
                  styles={customSelectStyles2}
                  closeMenuOnSelect={false}
                  blurInputOnSelect={false}
                  hideSelectedOptions={false}
                  isClearable={false}
                  onChange={handleServicesChange}
                  components={{
                    MultiValue,
                    IndicatorSeparator: null,
                    DropdownIndicator: () => (
                      <div>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="dropDown-position"
                          style={{
                            color: "#7c7c7c",
                            marginRight: "1.5rem",
                          }}
                        />
                      </div>
                    ),
                  }}
                />

                {inputsErrors.vcid && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {inputsErrors.vcid}
                  </p>
                )}
              </div>
              <br />
              <div className="relative space-y-3">
                <div>
                  <button type="submit" className="submit-button">
                    submit
                  </button>
                </div>
                <p className="disclaimer-button-text whitespace-adjust ">
                  By clicking submit, you agree that all information provided is
                  legitimate and correct.
                </p>
              </div>
            </form>
          </div>
          {/* Submit Button */}
        </div>
      </div>
    </>
  );
};

export default PastWedding;
