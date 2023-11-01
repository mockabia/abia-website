import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import * as servicesPage from "../../../services/vendor/signupPageService";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { default as Select } from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomDropdownSelectStyles } from "../../../components/FormStyle";
import axios from "axios";
import * as apiurls from "../../../api/apiUrls";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Business name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  mobile_phone: yup.string().required("Phone no: is required"),
  website: yup.string().required("Website is required"),
  contact_person: yup.string().required("Contact name is required"),
  state: yup.string().required("Please select an option"),
  first_category: yup.string().required("Please select an option"),
  avgperyear: yup.string().required("Please select an option"),
  findus: yup.string().required("Please select an option"),
});

const DesktopForm = () => {
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
  });
  const [registerLocation, setRegisterLocation] = useState([]);
  const [registerService, setRegisterService] = useState([]);
  const [registerBooking, setRegisterBooking] = useState([]);
  const [registerFindUs, setRegisterFindUs] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedFindUs, setSelectedFindUs] = useState(null);

  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, submitCount },
    control,
    setValue,
    reset,
  } = useForm({
    mode: "onChange", //isValid works on mode=onChange

    resolver: yupResolver(schema),
  });

  // next page
  const compleTeFormStep = (data) => {
    setFormValues({ ...formValues, ...data });
    setFormStep((current) => current + 1);
  };
  // previous page
  const prevStep = () => {
    setFormStep((current) => current - 1);
  };

  //api
  const fetchState = async () => {
    await servicesPage.stateDropdown().then(function (response) {
      if (response.statuscode == 200) {
        setRegisterLocation(response.result);
      }
    });
  };
  const fetchCategory = async () => {
    await servicesPage.categoryDropdwon().then(function (response) {
      if (response.statuscode == 200) {
        setRegisterService(response.result);
      }
    });
  };
  const fetchBookingsPerYear = async () => {
    await servicesPage.bookingsPerYearDropdown().then(function (response) {
      if (response.statuscode == 200) {
        setRegisterBooking(response.result);
      }
    });
  };

  const fetchFindUS = async () => {
    await servicesPage.findUsDropdown().then(function (response) {
      if (response.statuscode == 200) {
        setRegisterFindUs(response.result);
      }
    });
  };

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(apiurls.BUSINESS_STORE, formData);
      if (response.status === 200) {
        navigate("/my-profile");
        console.log("Data Successfully Submitted:", response.data);
      } else {
        console.log("Failed to submit data. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    fetchState();
    fetchCategory();
    fetchBookingsPerYear();
    fetchFindUS();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 0 && (
          <section className="register-container register-container-1  relative">
            <div class=" register-page1-div1 ">
              <div className="register-mobile-input-section">
                <div className="register-counter">1/3</div>
                <br />

                <div className="register-signup-header">
                  Let's get started.
                  <span className="register-position-adjust">fef01</span>{" "}
                </div>
                <br />

                <div>
                  <label className="text-[14px] font-bold">
                    Business Name*
                  </label>
                  <input
                    type="text"
                    id="bname"
                    name="name"
                    className={`signup-input-style ${
                      errors.name ? "signup-error-border" : ""
                    }`}
                    {...register("name")}
                  />
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    Email*
                    <span className="register-position-adjust">
                      fefeefefef
                    </span>{" "}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className={`signup-input-style ${
                      errors.email ? "signup-error-border" : ""
                    }`}
                    {...register("email")}
                  />
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.email?.message}
                  </p>
                </div>

                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    Phone*
                    <span className="register-position-adjust">
                      fefeefefe
                    </span>{" "}
                  </label>
                  <input
                    id="phone"
                    inputMode="tel"
                    type="number"
                    name="mobile_phone"
                    className={`signup-input-style ${
                      errors.mobile_phone ? "signup-error-border" : ""
                    }`}
                    {...register("mobile_phone")}
                  />
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.mobile_phone?.message}
                  </p>
                </div>
                <br />
                <div>
                  <button
                    type="button"
                    className={`register-next-button ${
                      !isValid ? "disabled" : ""
                    }`}
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
                <div>
                  <label className="text-[14px] font-bold">Contact Name*</label>
                  <input
                    id="contact_person"
                    type="text"
                    name="contact_person"
                    className={`signup-input-style ${
                      errors.contact_person ? "signup-error-border" : ""
                    }`}
                    {...register("contact_person")}
                  />
                  <p className="text-[12px] text-red-500 font-semibold mt-1">
                    {errors.contact_person?.message}
                  </p>
                </div>
                {/* lcoation */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold whitespace-nowrap">
                    Where are you based?*
                    <span className="register-position-adjust">
                      fefeefefedededdd
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="state"
                          name="state"
                          options={registerLocation}
                          {...field}
                          value={selectedState}
                          onChange={(selectedLocation) => {
                            setSelectedState(selectedLocation);
                            field.onChange(
                              selectedLocation ? selectedLocation.url : ""
                            );
                          }}
                          className={`signup-input-style ${
                            errors.state ? "signup-error-border" : ""
                          }`}
                          styles={CustomDropdownSelectStyles}
                          components={{
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
                </div>
                {/* services */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold whitespace-nowrap">
                    Primary Services*
                    <span className="register-position-adjust">
                      fefeefefedededdeeded
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="first_category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="first_category"
                          name="first_category"
                          options={registerService}
                          {...field}
                          value={selectedCategory}
                          onChange={(selectedOption) => {
                            setSelectedCategory(selectedOption);
                            field.onChange(
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                          className={`signup-input-style ${
                            errors.first_category ? "signup-error-border" : ""
                          }`}
                          styles={CustomDropdownSelectStyles}
                          components={{
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
                    {errors.first_category && (
                      <p className="text-[12px] text-red-500 font-semibold mt-1">
                        {errors.first_category.message}
                      </p>
                    )}
                  </div>
                  {/* <input id="number" type="tel" className="signup-input-style" /> */}
                </div>

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
                <br />
                <div className="register-signup-header">
                  Last, but not least
                  <span className="register-position-adjust">fef01</span>{" "}
                </div>
                <br />
                {/* webiste */}
                <div>
                  <label className="text-[14px] font-bold">
                    Website*
                    <span className="register-position-adjust">
                      fefeef
                    </span>{" "}
                  </label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    className="signup-input-style"
                    {...register("website")}
                  />
                </div>
                {/* bookings */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    # of weddings booked this year?
                    <span className="register-position-adjust">
                      fefeedl
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="avgperyear"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="avgperyear"
                          name="avgperyear"
                          options={registerBooking}
                          {...field}
                          value={selectedBooking}
                          onChange={(selectedLocation) => {
                            setSelectedBooking(selectedLocation);
                            field.onChange(
                              selectedLocation ? selectedLocation.value : ""
                            );
                          }}
                          className={`signup-input-style ${
                            errors.avgperyear ? "signup-error-border" : ""
                          }`}
                          styles={CustomDropdownSelectStyles}
                          components={{
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
                  </div>
                </div>

                {/* find us */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    How did you find us?
                    <span className="register-position-adjust">
                      fefeefefefefelelee
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="findus"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="findus"
                          name="findus"
                          options={registerFindUs}
                          {...field} // This spreads the field object to control the input
                          value={selectedFindUs}
                          onChange={(selectedLocation) => {
                            setSelectedFindUs(selectedLocation);
                            field.onChange(
                              selectedLocation ? selectedLocation.value : ""
                            );
                          }}
                          className={`signup-input-style ${
                            errors.findus ? "signup-error-border" : ""
                          }`}
                          styles={CustomDropdownSelectStyles}
                          components={{
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
                  </div>
                </div>
                <br />
                {submitCount > 0 && !isValid && (
                  <p className="text-red-500 font-semibold">
                    ! Please enter the valid details.
                  </p>
                )}
                <br />

                <div className="flex items-center gap-3">
                  <AiOutlineArrowLeft
                    size={34}
                    fill="#b8b8b8"
                    className="cursor-pointer"
                    onClick={prevStep}
                  />

                  <button type="submit" className="register-next-button">
                    Submit
                  </button>
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
    </div>
  );
};

export default DesktopForm;
