import React from "react";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/BusinessSignup.css";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import * as servicesPage from "../../services/vendor/signupPageService";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { default as Select } from "react-select";
import {
  CustomDropdownSelectStyles,
  ForgetBox,
} from "../../components/FormStyle";
import axios from "axios";
import * as apiurls from "../../api/apiUrls";
import { useNavigate } from "react-router-dom";
import {
  CommonInput,
  CommonSelect,
} from "../../components/Login and Signup/business-Signup/VSignuPComponents";
import * as BusinessJS from "../Business/Business";
import { validateBusinessSignupForm } from "../Plugins/customValidator";
import { Box, IconButton, Modal } from "@mui/material";

const BusinessSignup = () => {
  const [formStep, setFormStep] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact_person: "",
    mobile_phone: "",
    website: "",
    state: "",
    first_category: "",
    avgperyear: "",
    findus: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [registerLocation, setRegisterLocation] = useState([]);
  const [registerService, setRegisterService] = useState([]);
  const [registerBooking, setRegisterBooking] = useState([]);
  const [registerFindUs, setRegisterFindUs] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedFindUs, setSelectedFindUs] = useState(null);
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();

  //handlechange
  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the current field
    }));
  };

  // handle select
  const handleSelectChange = (name, selectedOption) => {
    if (name === "state") {
      setSelectedState(selectedOption.label);
      // console.log("Selected state URL:", selectedOption.url);
      setFormValues((prevValues) => ({
        ...prevValues,
        state: selectedOption.url,
      }));
    }
    if (name === "first_category") {
      setSelectedCategory(selectedOption.label);
      console.log("Selected services:", selectedOption.value);
      setFormValues((prevValues) => ({
        ...prevValues,
        first_category: selectedOption.value,
      }));
    }
    if (name === "avgperyear") {
      setSelectedBooking(selectedOption.label);
      console.log("Selected booking:", selectedOption.value);
      setFormValues((prevValues) => ({
        ...prevValues,
        avgperyear: selectedOption.value,
      }));
    }
    if (name === "findus") {
      setSelectedFindUs(selectedOption.label);
      console.log("Selected findus:", selectedOption.value);
      setFormValues((prevValues) => ({
        ...prevValues,
        findus: selectedOption.value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // next page
  const compleTeFormStep = (data) => {
    const validationErrors = validateBusinessSignupForm(formValues, formStep);
    setErrors(validationErrors);

    // If there are errors, do not proceed to the next step
    if (Object.keys(validationErrors).length === 0) {
      setFormValues({ ...formValues, ...data });
      setFormStep((current) => current + 1);
    }
  };
  // const compleTeFormStep = (data) => {
  //   setFormValues({ ...formValues, ...data });
  //   setFormStep((current) => current + 1);
  // };
  // previous page
  const prevStep = () => {
    setFormStep((current) => current - 1);
  };

  // Modal
  const handleClose = () => {
    setModalState(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateBusinessSignupForm(formValues, formStep);
    setErrors(validationErrors);
    // If there are errors, prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    const submissionResult = await BusinessJS.vendorBusinessSubmit(
      formValues,
      setInputErrors
    );
    // If the submission is successful, set modalState to true
    if (submissionResult.success) {
      setModalState(true);
    }
    console.log("formValues submitted:", formValues);
  };

  // Api
  useEffect(() => {
    BusinessJS.fetchState(setRegisterLocation);
    BusinessJS.fetchCategory(setRegisterService);
    BusinessJS.fetchBookingsPerYear(setRegisterBooking);
    BusinessJS.fetchFindUS(setRegisterFindUs);
  }, []);
  return (
    <>
      <div className=" desktop-form">
        <form onSubmit={handleSubmit}>
          {formStep === 0 && (
            <section className="register-container register-container-1  relative">
              <div class=" register-page1-div1 ">
                <div className="register-mobile-input-section">
                  <div className="register-counter">1/3</div>
                  <br />

                  <div className="register-signup-header">
                    Let's get started.
                    {/* <span className="register-position-adjust">fef01</span>{" "} */}
                  </div>
                  <br />
                  {/* business name */}

                  <CommonInput
                    label="Business Name*"
                    type="text"
                    name="name"
                    id="bname"
                    value={formValues.name}
                    onChange={(name, value) => handleChange(name, value)}
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                  {/* Email */}
                  <CommonInput
                    label="Email*"
                    type="text"
                    name="email"
                    id="email"
                    value={formValues.email}
                    onChange={(name, value) => handleChange(name, value)}
                    // onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                  {/* Phone */}
                  <CommonInput
                    label="Phone*"
                    type="number"
                    name="mobile_phone"
                    id="mobile_phone"
                    inputMode="tel"
                    value={formValues.mobile_phone}
                    onChange={(name, value) => handleChange(name, value)}
                    // onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.mobile_phone && (
                    <div className="error-message">{errors.mobile_phone}</div>
                  )}
                  <div>
                    <br />
                    <button
                      type="button"
                      className="register-next-button"
                      onClick={compleTeFormStep}
                    >
                      Next
                    </button>
                  </div>
                </div>

                <br />
                <br />
                <br />
              </div>

              {/* image */}
              <div class=" register-page1-div2"></div>
            </section>
          )}
          {formStep === 1 && (
            <section className="register-container register-container-2 relative">
              <div class="register-page2-div1">
                <div className="register-mobile-input-section">
                  <div className="register-counter">2/3</div>
                  <br />
                  <div className="register-signup-header">
                    Let'smake it personal
                  </div>
                  <br />

                  <CommonInput
                    label=" Contact Name*"
                    type="text"
                    name="contact_person"
                    id="contact_person"
                    value={formValues.contact_person}
                    onChange={(name, value) => handleChange(name, value)}
                    // onChange={(e) =>
                    //   handleChange("contact_person", e.target.value)
                    // }
                  />
                  {errors.contact_person && (
                    <div className="error-message">{errors.contact_person}</div>
                  )}

                  {/* lcoation */}
                  <CommonSelect
                    name="state"
                    id="state"
                    label="Where are you based?*"
                    options={registerLocation}
                    value={registerLocation.find(
                      (option) => option.label === selectedState
                    )}
                    onChange={handleSelectChange}
                    // value={selectedState}
                  />
                  {errors.state && (
                    <div className="error-message">{errors.state}</div>
                  )}
                  {/* services */}
                  <CommonSelect
                    id="first_category"
                    name="first_category"
                    label="Primary Services*"
                    options={registerService}
                    value={registerService.find(
                      (option) => option.label === selectedCategory
                    )}
                    onChange={handleSelectChange}
                    // value={selectedCategory}
                  />
                  {errors.first_category && (
                    <div className="error-message">{errors.first_category}</div>
                  )}
                  <br />
                  <div className="flex items-center gap-3">
                    <AiOutlineArrowLeft
                      size={34}
                      fill="#b8b8b8"
                      className="cursor-pointer"
                      onClick={prevStep}
                    />
                    <button
                      // disabled={!isValid}
                      type="button"
                      className="register-next-button"
                      onClick={compleTeFormStep}
                    >
                      Next
                    </button>
                    <div className="blank-div ">ABCD</div>
                  </div>
                </div>

                <br />
                <br />
                <br />
              </div>

              {/* image */}
              <div class="register-page2-div2"></div>
            </section>
          )}

          {formStep === 2 && (
            <section className="register-container register-container-3 relative">
              <div class="register-page3-div1">
                <div className="register-mobile-input-section">
                  <div className="register-counter">3/3</div>
                  <div className="register-signup-header">
                    Last, but not least
                    <span className="register-position-adjust">fef01</span>{" "}
                  </div>
                  <br />
                  {/* webiste */}

                  <CommonInput
                    label="Website"
                    id="website"
                    type="text"
                    name="website"
                    value={formValues.website}
                    onChange={(name, value) => handleChange(name, value)}
                    // onChange={(e) => handleChange("website", e.target.value)}
                  />

                  {/* bookings */}
                  <CommonSelect
                    id="avgperyear"
                    name="avgperyear"
                    label=" # of weddings booked this year?"
                    options={registerBooking}
                    value={registerBooking.find(
                      (option) => option.label === selectedBooking
                    )}
                    onChange={handleSelectChange}

                    // value={selectedCategory}
                  />

                  {/* find us */}
                  <CommonSelect
                    id="findus"
                    name="findus"
                    label=" How did you find us?"
                    options={registerFindUs}
                    value={registerFindUs.find(
                      (option) => option.label === selectedFindUs
                    )}
                    onChange={handleSelectChange}
                    // value={selectedCategory}
                  />

                  {/* password */}
                  <CommonInput
                    label="Password*"
                    type="password"
                    name="password"
                    id="password"
                    value={formValues.password}
                    onChange={(name, value) => handleChange(name, value)}
                    // onChange={(e) => handleChange("password", e.target.value)}
                  />
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                  {/*repeat password */}
                  <CommonInput
                    label=" Repeat Password*"
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    value={formValues.confirm_password}
                    onChange={(name, value) => handleChange(name, value)}
                    // onChange={(e) =>
                    //   handleChange("confirm_password", e.target.value)
                    // }
                  />
                  {errors.confirm_password && (
                    <div className="error-message">
                      {errors.confirm_password}
                    </div>
                  )}

                  <br />

                  <br />

                  <div className="flex items-center gap-3">
                    <AiOutlineArrowLeft
                      size={34}
                      fill="#b8b8b8"
                      className="cursor-pointer"
                      onClick={prevStep}
                    />
                    <button className="register-next-button">Submit</button>
                    <div className="blank-div ">ABCD</div>
                  </div>
                </div>

                <br />
                <br />
                <br />
              </div>

              {/* image */}
              <div class="register-page3-div2"></div>
            </section>
          )}
        </form>
        {/* Modal */}
        {modalState && (
          <Modal
            open={modalState}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              component="form"
              sx={ForgetBox}
              noValidate
              autoComplete="off"
              className="request-box-style"
            >
              <Box>
                <IconButton
                  type="button"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop the event propagation
                    handleClose();
                  }}
                >
                  <AiOutlineClose />
                </IconButton>
              </Box>

              <form>
                <h3 className="flex justify-center">
                  Thanks for your application! ?
                </h3>
                <p className="flex justify-center">
                  An ABIA Representative will be in contact within the next 48
                  business hours to discuss your ABIA Application.
                </p>
              </form>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default BusinessSignup;
