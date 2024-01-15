import React, { useEffect, useState } from "react";
import "../Style/BusinessGetReviews.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

import Calendar from "../../third-party-packs/Calendar";
import * as BusinessJS from "./Business";
import ReactDatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import { subDays } from "date-fns";

const schema = yup.object().shape({
  bride: yup.string().required("Client's name is required"),
  groom: yup.string().required("Partner's name is required"),
  date_of_wedding: yup
    .date()
    .nullable()
    .required("Date of wedding is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  confirm_email: yup
    .string()
    .required("Confirm email is required")
    .email("Invalid email address")
    .oneOf([yup.ref("email"), null], "Emails must match"),
  phone: yup.number(),
  // phone: yup.number().max(13, "Phone number must not exceed 13 characters"),

  wedding_state: yup.string().required("The state field is required."),
  vcid: yup.array().min(1, "Services Booked is required."),
});

const PastWedding = () => {
  const [stateOptions, setStateOptions] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [inputsErrors, setInputsErrors] = useState({});

  const location = useLocation();
  const { vendorInput } = location.state || {};

  console.log("Vendor in ID:", vendorInput.vid);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      birde: "",
      groom: "",
      date_of_wedding: null,
      wedding_state: "",
      email: "",
      confirm_email: "",
      phone: "",
      vcid: [],
    },
  });

  console.log("useForm executed");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Select option data

  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
    BusinessJS.fetchCategory(setCategoryOptions);
  }, []);

  const registrationGuidelines = [
    "1. ABIA will not release registered details to any third parties.",
    "2. Only register weddings that took place in the past 12 months from 00-00-0000.",
    "3. Your Wedding Client has 365 days from their wedding date to complete the form.",
    "4. You can resend the online voting forms every 3 days.",
    "5. ABIA will send an automated reminder to your Wedding Client at least '2' times.",
  ];

  const handleStateChange = (selectedOption, field) => {
    const stateValue = selectedOption ? selectedOption.label : "";
    setSelectedState({ label: stateValue, value: stateValue });
    field.onChange(stateValue);
  };

  const onSubmitForm = (data) => {
    const formValues = {
      birde: watch("bride"),
      groom: watch("groom"),
      date_of_wedding: watch("date_of_wedding"),
      wedding_state: watch("wedding_state"),
      email: watch("email"),
      confirm_email: watch("confirm_email"),
      phone: watch("phone"),
      vcid: Array.isArray(watch("vcid")) ? watch("vcid") : [],
      vid: vendorInput.vid,
    };

    // Trigger validation for the vcid field
    schema.validate(formValues).catch((err) => {
      if (err.path === "vcid") {
        setInputsErrors({ vcid: err.message });
      }
    });
    // Check if vcid is empty and display error message if needed
    if (!formValues.vcid || formValues.vcid.length === 0) {
      setInputsErrors({ vcid: "Service booked is required" });
      return;
    }

    BusinessJS.updateManageWedding(1, formValues, setInputsErrors);
    console.log("Form data:", formValues);
  };
  // Business.updateBusiness(1, formValues, setInputsErrors);
  const onInvalid = (errors) => console.error(errors);

  // console.log("  ", inputsErrors);
  return (
    <>
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
              onSubmit={handleSubmit(onSubmitForm, onInvalid)}
            >
              <label className="t">Client's Full Name*</label>
              {/* <br /> */}
              <div className="relative">
                <span className="user-icon"></span>
                <input
                  name="bride"
                  type="text"
                  className="input-style"
                  {...register("bride")}
                />
              </div>
              {errors.bride && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.bride.message}
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
                  {...register("groom")}
                />
              </div>
              {errors.groom && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.groom.message}
                </p>
              )}
              <br />
              <div className="mt-[0px]">
                <label>Wedding Date*</label>
                <div className="relative">
                  <Controller
                    name="date_of_wedding"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="example-custom-input get-review-font"
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="MM/dd/yyyy"
                        maxDate={subDays(new Date(), 1)}
                      />
                    )}
                    rules={{ required: "Date of wedding is required" }}
                    as={ReactDatePicker}
                  />

                  {errors.date_of_wedding && (
                    <p className=" mt-[2rem] text-[12px] text-[#f20431] font-extrabold">
                      {errors.date_of_wedding.message}
                    </p>
                  )}
                </div>
                {!errors.date_of_wedding && (
                  <p className="text-[12px] text-[#f20431] font-extrabold mt-[40px]">
                    Wedding Date must be before 00-00-0000.{" "}
                  </p>
                )}
              </div>
              <br />
              <label className="header-text-past">Wedding State*</label>
              <br />
              <div className="relative">
                <Controller
                  name="wedding_state"
                  control={control}
                  // rules={{ required: "Wedding State is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      name="wedding_state"
                      placeholder=""
                      options={stateOptions}
                      onChange={(selectedOption) =>
                        handleStateChange(selectedOption, field)
                      }
                      styles={customSelectStyles2}
                      value={selectedState}
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
                  )}
                />
                {errors.wedding_state && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.wedding_state.message}
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
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.email.message}
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
                  {...register("confirm_email")}
                />
              </div>
              {errors.confirm_email && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.confirm_email.message}
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
                  {...register("phone")}
                  className="input-style"
                />
              </div>
              <br />
              <label className="header-text-past">Services Booked*</label>
              <br />
              <div className="relative">
                <Controller
                  name="vcid"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      placeholder={""}
                      options={categoryOptions}
                      styles={customSelectStyles2}
                      closeMenuOnSelect={false}
                      blurInputOnSelect={false}
                      hideSelectedOptions={false}
                      isClearable={false}
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
                  )}
                />
                {errors.vcid && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.vcid.message}
                  </p>
                )}
              </div>
              <br />
              <div className="relative space-y-3">
                <button type="submit" className="submit-button">
                  submit
                </button>

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
