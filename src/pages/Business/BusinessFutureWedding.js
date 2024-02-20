import React, { useEffect, useState } from "react";
import "../Style/BusinessGetReviews.css";
import ContentHeader from "../../layouts/sidebar/ContentHeader";
import Select, { components } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { customSelectStyles2 } from "../../components/FormStyle";
import * as BusinessJS from "./Business";
import { VendorFutureDatePicker } from "../../components/DatepickerPublic";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const FutureWedding = () => {
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
  const [reseidentState, setResidentState] = useState([]);
  const [inputsErrors, setInputsErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [dataSet, setDataSet] = useState(false);

  // const location = useLocation();
  // const vendorInput = location.state?.vendorInput || {};

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // state fetch
  useEffect(() => {
    BusinessJS.fetchState(setStateOptions);
  }, []);

  const registrationGuidelines = [
    "1. ABIA will not release registered details to any third parties.",
    "2. Only register future weddings after a booking has been confirmed and a deposit has been received.",
    "3. Your Future Wedding  will display in your Wedding History,once the wedding date has passed.",
    "4. ABIA will send an automated reminder to your Wedding Client at least '2' times.",
  ];

  const handleInputChange = (fieldName, value) => {
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

  const handleResStateChange = (fieldName, selectedOption) => {
    const stateValue = selectedOption ? selectedOption.label : "";
    setResidentState(stateValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedOption.url,
    }));
    setInputsErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  // const handleDateChange = (fieldName, date) => {
  //   setFormValues({ ...formValues, [fieldName]: date });
  //   setInputsErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  // };

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
      errors.wedding_state = "Wedding state is required";
    }
    if (!formValues.state) {
      errors.state = "Resident state is required";
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
    console.log("Validation Errors:", errors);
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
      setFormValues((updatedFormValues) => {
        BusinessJS.updateManageWedding(2, updatedFormValues, setApiErrors);
        return updatedFormValues;
      });
    } else {
      setInputsErrors(validationErrors);
    }
  };

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
                <VendorFutureDatePicker
                  name="date_of_wedding"
                  value={formValues.date_of_wedding}
                  handleDateChange={(date) => {
                    handleDateChange("date_of_wedding", date);
                  }}
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
                  value={{ label: selectedState, value: selectedState }}
                  options={stateOptions}
                  onChange={(selectedOption) =>
                    handleStateChange("wedding_state", selectedOption)
                  }
                  styles={customSelectStyles2}
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
              <label className="header-text-past">Resident State*</label>
              <br />
              <div className="relative">
                <Select
                  name="state"
                  placeholder=""
                  value={{ label: reseidentState, value: reseidentState }}
                  options={stateOptions}
                  onChange={(selectedOption) =>
                    handleResStateChange("state", selectedOption)
                  }
                  styles={customSelectStyles2}
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

                {inputsErrors.state && (
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {inputsErrors.state}
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
                  email
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
              <label className="header-text-past">Phone*</label>
              <br />
              <div className="relative">
                <span className="phone-icon"></span>
                <input
                  name="phone"
                  type="number"
                  inputMode="tel"
                  className="input-style"
                  value={formValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              {inputsErrors.phone && (
                <p className="text-[12px] text-red-500 font-semibold mt-1">
                  {inputsErrors.phone}
                </p>
              )}
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

//  SELECT BADGE
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
  const maxToShow = 1;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
