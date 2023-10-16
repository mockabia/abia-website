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
  email: yup.string().required("Email is required"),
  mobile_phone: yup.string().required("Phone no: is required"),
  website: yup.string().required("Website is required"),
  contact_person: yup.string().required("Contact name is required"),
  state: yup.string().required("Please select an option"),
  first_category: yup.string().required("Please select an option"),
  avgperyear: yup.string().required("Please select an option"),
  findus: yup.string().required("Please select an option"),
});

const MobileForm = () => {
  const [formStep, setFormStep] = useState(0);
  const [registerLocation, setRegisterLocation] = useState([]);
  const [registerService, setRegisterService] = useState([]);
  const [registerBooking, setRegisterBooking] = useState([]);
  const [registerFindUs, setRegisterFindUs] = useState([]);

  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    setValue,
  } = useForm({
    mode: "onChange", //isValid works on mode=onChange
    defaultValues: {
      name: "",
      email: "",
      contact_person: "",
      mobile_phone: "",
      website: "",
      state: "",
      first_category: "",
      avgperyear: "",
      findus: "",
    },
    resolver: yupResolver(schema),
  });

  const compleTeFormStep = () => {
    // if (!isValid) {
    //   return;
    // }
    setFormStep((current) => current + 1);
  };

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

  useEffect(() => {
    fetchState();
    fetchCategory();
    fetchBookingsPerYear();
    fetchFindUS();
  }, []);

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

  // console.log(watch("findus"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 0 && (
          <section className="register-container-1  relative">
            <div class=" register-page1-div1">
              <div className="register-mobile-input-section">
                <div className="register-counter">1/2</div>
                <br />
                <div className="register-signup-header">
                  Let's get started.
                  <span className="register-position-adjust">fef01</span>{" "}
                </div>
                <br />
                {/* business name */}
                <div>
                  <label htmlFor="bname" className="text-[14px] font-bold">
                    Business Name *
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
                {/* Email */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    Email*
                    <span htmlFor="email" className="register-position-adjust">
                      qwertyuuuu
                    </span>
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
                </div>{" "}
                {/* Phone */}
                <div className="mt-2">
                  <label htmlFor="phone" className="text-[14px] font-bold">
                    Phone*
                    <span className="register-position-adjust">qwertyuuuu</span>
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
                </div>{" "}
                {/* Webisite */}
                <div className="mt-2">
                  <label htmlFor="website" className="text-[14px] font-bold">
                    Wesbite*
                    <span className="register-position-adjust">qwertyuuuu</span>
                  </label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    className="signup-input-style"
                    {...register("website")}
                  />
                </div>{" "}
                {/* Contact Name */}
                <div className="mt-2">
                  <label htmlFor="cname" className="text-[14px] font-bold">
                    Contact Name*
                  </label>
                  <input
                    id="cname"
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
                <br />
                {/* Next button */}
                <div>
                  <button
                    // disabled={!isValid || isDirty}
                    type="button"
                    // className="register-next-button disabled:bg-gray-400"
                    className="register-next-button"
                    onClick={compleTeFormStep}
                  >
                    Next
                  </button>
                </div>
              </div>

              <br />
            </div>
            {/* <pre>{JSON.stringify(watch(), null, 1)}</pre> */}
          </section>
        )}
        {formStep === 1 && (
          <section className="register-container register-container-3 relative">
            <div class="register-page3-div1">
              <div className="register-mobile-input-section">
                <div className="register-counter">2/2</div>
                <br />
                <div className="register-signup-header">
                  Last, but not least
                  <span className="register-position-adjust">fef01</span>{" "}
                </div>
                <br />
                {/* location */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    Where are you based?*
                    <span className="register-position-adjust">
                      fefeefefededede
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="location"
                          options={registerLocation}
                          {...field}
                          value={field.label}
                          onChange={(selectedLocation) => {
                            field.onChange(
                              selectedLocation ? selectedLocation.label : ""
                            );
                          }}
                          className={`signup-dropdown-style ${
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
                {/* Services */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    Primary Services
                    <span className="register-position-adjust">
                      fefeefefedededdeede/
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="first_category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="services"
                          options={registerService}
                          {...field}
                          value={field.label}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.label : ""
                            );
                          }}
                          className={`signup-dropdown-style ${
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
                </div>
                {/* Bookings */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    # of weddings booked this year?
                    <span className="register-position-adjust">
                      fefeefe
                    </span>{" "}
                  </label>
                  <div className="text-[14px]">
                    <Controller
                      name="avgperyear"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="bookingcount"
                          options={registerBooking}
                          {...field}
                          value={field.label}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.label : ""
                            );
                          }}
                          className={`signup-dropdown-style ${
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
                    {/* {errors.bookingcount && (
                      <p className="text-[12px] text-red-500 font-semibold mt-1">
                        {errors.bookingcount.message}
                      </p>
                    )} */}
                  </div>
                </div>
                {/* findus */}
                <div className="mt-2">
                  <label className="text-[14px] font-bold">
                    How did you find us?
                    <span className="register-position-adjust">
                      fefeefefefedededd
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
                          {...field}
                          value={field.label}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.label : ""
                            );
                          }}
                          className={`signup-dropdown-style ${
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
                {/* <br /> */}
                <div className="flex items-center gap-3">
                  <AiOutlineArrowLeft
                    size={34}
                    fill="#b8b8b8"
                    className="cursor-pointer"
                    onClick={prevStep}
                  />
                  <button
                    type="submit"
                    className="register-next-button"
                    onClick={onsubmit}
                  >
                    Submit
                  </button>
                  <div className="blank-div ">ABCD</div>
                </div>
              </div>

              <br />
              <br />
              <br />
              <br />
            </div>

            {/* image */}
          </section>
        )}
      </form>
    </div>
  );
};

export default MobileForm;
