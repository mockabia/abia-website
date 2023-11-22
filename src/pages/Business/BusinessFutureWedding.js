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
import { customSelectStyles } from "../../components/FormStyle";

import Calendar from "../../third-party-packs/Calendar";
import * as BusinessJS from "./Business";
import ReactDatePicker from "react-datepicker";

const schema = yup.object().shape({
  bride: yup.string().required("Client's name is required"),
  groom: yup.string().required("Partner's name is required"),
  date_of_wedding: yup.date().required("Date of wedding is required"),
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
  phone: yup.number().required("Phone no: is required"),
  wedding_state: yup.string().required("The state field is required."),
  state: yup.string().required("The Resident state is required."),
  vcid: yup.array().required("Services Booked is required."),
});

const FutureWedding = () => {
  const [stateOptions, setStateOptions] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [reseidentState, setResidentState] = useState([]);
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
      state: "",
      email: "",
      confirm_email: "",
      phone: null,
      vcid: null,
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
    "2. Only register future weddings after a booking has been confirmed and a deposit has been received.",
    "3. Your Future Wedding  will display in your Wedding History,once the wedding date has passed.",
    "4. ABIA will send an automated reminder to your Wedding Client at least '2' times.",
  ];

  const handleStateChange = (selectedOption, field) => {
    const stateValue = selectedOption ? selectedOption.label : "";
    setSelectedState({ label: stateValue, value: stateValue });
    field.onChange(stateValue);
  };
  const handleResStateChange = (selectedOption, field) => {
    const stateValue = selectedOption ? selectedOption.label : "";
    setResidentState({ label: stateValue, value: stateValue });
    field.onChange(stateValue);
  };

  const onSubmitForm = (data) => {
    const formValues = {
      birde: watch("bride"),
      groom: watch("groom"),
      date_of_wedding: watch("date_of_wedding") || null,
      wedding_state: watch("wedding_state"),
      state: watch("state"),
      email: watch("email"),
      confirm_email: watch("confirm_email"),
      phone: watch("phone") || null,
      vcid: watch("vcid"),
    };

    console.log("Form data:", data);
  };

  const onInvalid = (errors) => console.error(errors);
  return (
    <>
      <div className="md:hidden">
        <ContentHeader title="Register Past Weddings" />
      </div>
      <div className="register-past">
        <div className="main-header-past">
          <h2 className="">
            Schedule an online voting form to be sent 3 days after wedding date.
          </h2>
          <p className="mt-[10px] whitespace-adjust">
            Register your clients below, and they will receive a customised
            voting link 3 days after their wedding date. Furthermore, ABIA will
            send '1' email asking if they need further help planning their
            wedding day.{" "}
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
                {index === 2 ? (
                  <p className="whitespace-adjust">
                    3. Your Future Weddings will display in your{" "}
                    <span>
                      <a
                        className="text-[#3fa19a] font-semibold  underline underline-offset-4 "
                        href="www.abia.com.au/vendor/wedding-history"
                      >
                        Wedding History
                      </a>
                    </span>
                    , once the wedding date has passed.
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
                        className="example-custom-input"
                        {...field}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="MM/dd/yyyy" // Customize the date format
                        placeholderText="Select date"
                        minDate={new Date()}
                      />
                    )}
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
                      value={selectedState}
                      options={stateOptions}
                      onChange={(selectedOption) =>
                        handleStateChange(selectedOption, field)
                      }
                      styles={customSelectStyles}
                      components={{
                        MultiValue,
                        IndicatorSeparator: null,
                        DropdownIndicator: () => (
                          <div>
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              className="dropDown-position"
                              style={{ color: "#7c7c7c" }}
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
              <label className="header-text-past">Resident State*</label>
              <br />
              <div className="relative">
                <Controller
                  name="state"
                  control={control}
                  // rules={{ required: "Wedding State is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      name="state"
                      value={reseidentState}
                      options={stateOptions}
                      onChange={(selectedOption) =>
                        handleResStateChange(selectedOption, field)
                      }
                      styles={customSelectStyles}
                      components={{
                        MultiValue,
                        IndicatorSeparator: null,
                        DropdownIndicator: () => (
                          <div>
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              className="dropDown-position"
                              style={{ color: "#7c7c7c" }}
                            />
                          </div>
                        ),
                      }}
                    />
                  )}
                />
                {errors.state && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.state.message}
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
              <label className="header-text-past">Phone*</label>
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
              {errors.phone && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {errors.phone.message}
                </p>
              )}
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
                      options={categoryOptions}
                      styles={customSelectStyles}
                      closeMenuOnSelect={false}
                      blurInputOnSelect={false} //bug fixed
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
                              style={{ color: "#7c7c7c" }}
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

export default FutureWedding;

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#d4eefa",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""} selected`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 2;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
