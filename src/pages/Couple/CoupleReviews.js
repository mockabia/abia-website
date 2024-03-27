import React, { useEffect, useState } from "react";
import "../Style/Reviews.css";
import { ReactComponent as AbiaLogo } from "../../icons/abia-new-logo.svg";
import { IndiRatingInput, MoreSelectedBadge, RatingButton, RatingCustomStyle, RatingInput, reactSelectScroll,CheckBoxStyle2 } from "../../components/FormStyle";
import { DatePickerCouple, RatingDatePicker, } from "../../components/DatepickerPublic";
import Select, { components } from "react-select";
import { CheckboxOption } from "../../components/CustomerSelect";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import * as BusinessJS from "../Business/Business";
import { Typography } from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import * as CoupleJS from "./Couple";
import { CheckBox } from "@mui/icons-material";

const Reviews = () => {
  /* const [formValues, setFormValues] = useState({
    rating_email: "",
    wedding_date: null,
    service_category: [],
    new_vendor: "",
    new_vendor_service: [],
    review: [], // Initialize as an empty array
  });
  const [research, setResearch] = useState({
    season: "",
    guest: "",
    budget: "",
    actual_cost: "",
    int_guests: "",
    interstate_guest: "",
    read_reviews: "",
    name: "",
    pname: "",
    wedding_state: "",
    phone: "",
  }); */

  let navigate                                                    = useNavigate();
  const location                                                  = useLocation();
  const [formValues, setFormValues]                               = React.useState({});
  //const [activeStep, setActiveStep]                               = useState(0);
  const [activeStep, setActiveStep]                               = useState(2);
  const [services, setServices]                                   = useState(""); // vendor service
  const [vendorList, setVendorList]                               = useState("");
  const [newVendorServices, setNewVendorServices]                 = useState(false);
  const [selectedServiceOptions, setSelectedServiceOptions]       = useState([]);
  const [selectedNewVendorServices, setSelectedNewVendorServices] = useState([]);
  const [selectedVendor, setSelectedVendor]                       = useState("");
  const [errors, setErrors]                                       = React.useState({});
  const [researchErrors, setResearchErrors]                       = useState({});
  const [stateList, setStateList]                                 = useState([]);
  let urls      = location.pathname.split('/').slice(-2);
  let decodeId  = urls[0] !="" ? urls[1] : "";
  let url       = urls[0];
  console.log(decodeId)

  useEffect(() => {
    if (formValues.service_category != undefined) {
      var selectedService = formValues.service_category.split(',').map(function(item) {
          return parseInt(item);
      });
      const myArrayFiltered = services.filter((el) =>
        selectedService.includes(el.value)
      );
      setSelectedServiceOptions(myArrayFiltered);
    }
  }, [services,formValues.service_category]);

  useEffect(() => {
    CoupleJS.fetchBride(decodeId,setFormValues,setServices);
    CoupleJS.fetchVServices(formValues.vid,setServices);
    CoupleJS.autoCompleteVendor(setVendorList);
    CoupleJS.fetchState(setStateList);
  }, []);

  /* const handleInputChange = (fieldName, value, index) => {
    if (fieldName === "service_category") {
      setSelectedServiceOptions(value);

      // Update the review array with the selected services
      const updatedReview = value.map((service) => ({
        id: service.value,
        product: "",
        service: "",
        attitude: "",
        overall: "",
        comment: "",
        best_vendor: "0",
      }));

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        review: updatedReview,
      }));
    } else {
      // Update the specific field within the selected service's review
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        review: prevFormValues.review.map((review, i) =>
          i === index ? { ...review, [fieldName]: value } : review
        ),
      }));
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "", // Clear the error for the current field
    }));
  }; */

  const handleNewVendorServiceChange = (fieldName, value, index) => {
    if (fieldName === "new_vendor_service") {
      setSelectedNewVendorServices(value);

      // Update the review array with the selected services
      const updatedReview_new = value.map((service) => ({
        id: service.value,
        product: "",
        service: "",
        attitude: "",
        overall: "",
        comment: "",
        best_vendor: "0",
      }));

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        review: updatedReview_new,
      }));
    } else {
      // Update the specific field within the selected service's review
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        review: prevFormValues.review.map((review, i) =>
          i === index ? { ...review, [fieldName]: value } : review
        ),
      }));
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "", // Clear the error for the current field
    }));
  };

  const handleVendorChange = (fieldName, value) => {
    if (fieldName === "new_vendor") {
      setSelectedVendor(value);
      setNewVendorServices(!newVendorServices);
    }
  };

  const handleResearchChange = (fieldName, value) => {
    /* setResearch((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
    setResearchErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    })); */
  };

  const handleFormNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setFormValues((updatedFormValues) => {
        // console.log("Current form values:", { formValues: updatedFormValues });
        return updatedFormValues;
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const validateForm = () => {
    const errors = {};
    if (activeStep === 0) {
      if (!formValues.rating_email) {
        // Validate Email
        errors.rating_email = "Please provide a valid Email";
      } else if (!/\S+@\S+\.\S+/.test(formValues.rating_email)) {
        errors.rating_email = "Please provide a valid Email";
      }
      if (!formValues.wedding_date) {
        errors.wedding_date = "Please provide a valid Wedding Date.";
      }

      if (
        !formValues.service_category ||
        formValues.service_category.length === 0
      ) {
        errors.service_category = "Please select Wedding Services.";
      }
      // Add more validation rules as needed
    } else if (activeStep === 1) {
    }

    return errors;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // date handle
  const handleDateChange = (fieldName, date) => {
    setFormValues({ ...formValues, [fieldName]: date });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleNewVendorSubmit = () => {
    const validationErrors = validateReviewFields();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      const updatedReview = selectedNewVendorServices.map((option, index) => ({
        id: option.value,
        product: formValues.review && formValues.review[index].product || "",
        service: formValues.review && formValues.review[index].service || "",
        attitude: formValues.review && formValues.review[index].attitude || "",
        overall: formValues.review && formValues.review[index].overall || "",
        comment: formValues.review && formValues.review[index].comment || "",
        best_vendor: formValues.review && formValues.review[index].best_vendor || "0",
      }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log("Form Values for new Vendor:", { updatedReview });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateReviewFields = () => {
    const errors = {};
    // Add validation for each review category field
    formValues.review.forEach((review, index) => {
      if (!review.product || !review.service || !review.attitude || !review.overall) {
        errors[`review_${index}`] = "Please provide the Quality of Product, Quality of Service, Attitude of Staff & Overall Value.";
      }
    });
    return errors;
  };

  const handleVerifySubmit = () => {
    // Validate form fields
    const validationErrors = validateResearchFields();

    if (Object.keys(validationErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // No validation errors, proceed with submission
      //console.log("Research Data:", research);
    } else {
      // Update state with validation errors
      //setResearchErrors(validationErrors);
    }
  };

  const validateResearchFields = () => {
    const errors = {};

    // Validate name
    if (!formValues.name.trim()) {
      errors.name = "Please provide your full name.";
    }

    // Validate partner's name
    if (!formValues.pname.trim()) {
      errors.pname = "Please provide your partner's name.";
    }

    // Validate wedding state
    if (!formValues.wedding_state) {
      errors.wedding_state = "Please provide your wedding state.";
    }

    // Validate phone
    if (!formValues.phone.trim()) {
      errors.phone = "Please provide your phone number.";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const name  = e.target.name;
    let value   = e.target.value;
    console.log(e.target.type)
    const index = e.target.getAttribute('index')
    if(index!=undefined){
      let vid       = e.target.getAttribute('vid')
      let preid     = e.target.getAttribute('preid')
      let type      = e.target.getAttribute('type')
      value         = (type=='checkbox' ? (e.target.checked ? 1 : 0) : value);
 
      if (formValues.review && formValues.review.length !== undefined && formValues.review.length > 0) {
        let reviewArray = [...formValues.review];
        if (typeof reviewArray[index] === 'undefined') {
          reviewArray[index] = {};
        }
        reviewArray[index][name]    = value;
        reviewArray[index]['vid']   = vid;
        reviewArray[index]['preid'] = preid;
        setFormValues((prevFormValues) => ({...prevFormValues,['review']: reviewArray,}));
      } else {
        let reviewArray = [];
        reviewArray[0] = {};
        reviewArray[0]['vid']   = vid;
        reviewArray[0]['preid'] = preid;
        reviewArray[0][name]    = value;
        setFormValues((prevFormValues) => ({...prevFormValues,['review']: reviewArray,}));
      }
    }else{
      CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
    }
  };
  

  const handleBestVendorClick = (index) => {
    console.log("Before Update:", formValues);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      review: prevFormValues.review.map((review, i) =>
        i === index
          ? { ...review, best_vendor: review.best_vendor === "0" ? "1" : "0" }
          : review
      ),
    }));
    // console.log("After Update:", formValues);
  };

  const handleInputChangeVal = (name, value) => {
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };

  useEffect(() => {
    console.log(activeStep)
  }, [activeStep]);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    CoupleJS.coupleReview(activeStep,setActiveStep,formValues, setErrors,navigate)
  };
  let contentArray = [
    {
      "heading": "Vote for Crowne Plaza Hawkesbury Valley in the ABIA Wedding Awards",
      "btnText": "Next",
      "step": "1",
    },
    {
      "heading": "Rate & Review Crowne Plaza Hawkesbury Valley",
      "btnText": "Submit",
      "step": "2",
    },
    {
      "heading": "Review more vendors?",
      "btnText": "Submit",
      "step": "3",
    },
    {
      "heading": "Help Us?",
      "btnText": "Submit",
      "step": "4",
    },
    {
      "heading": "To help us out with industry research, we would love to learn more about your wedding.",
      "btnText": "Submit",
      "step": "5",
    }
  ]

  return (
    <div className="review-margin h-screen">
      {/* logo */}
      <Link to={"/"} className="abia-logo-section">
        <AbiaLogo />
      </Link>
      {/* Review container */}
      <div className="reviews-container-1">
        {/* vendor-logo */}
        <div className="review-logo-section">
          <img
            src="https://mockabia.com/uploads/profile/thumb/crowne-plaza-hawkesbury-valley-windsor_2106230921384.jpeg"
            className="rounded-[50%]"
          />
        </div>
        <div className="font-playfair review-heading">
          <span className="review-heading">
            {contentArray[activeStep].heading}
          </span>
        </div>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
        {activeStep === 0 && (
          <>
            <div className="flex flex-col gap-[5px] justify-center items-center">
              {/* EMAIL */}
              <RatingInput
                name="rating_email"
                value={formValues.rating_email}
                placeholder="E-mail"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.rating_email && (
                <Typography color="error" variant="caption" component="div">
                  {errors.rating_email}
                </Typography>
              )}
              <span className="text-[8px]">
                Your Email is only used for verification purposes, not marketing
                emails.
              </span>
            </div>
            {/* DATE */}
          <RatingDatePicker
            name="date_of_wedding"
            value={formValues.date_of_wedding}
            handleDateChange={handleInputChangeVal}
          />
          {errors.date_of_wedding && (
            <Typography color="error" variant="caption" component="div">
              {errors.date_of_wedding}
            </Typography>
          )}
          {/*  */}
          <Select
            name="service_category"
            placeholder="Select services to Rate"
            isMulti={true}
            options={services}
            value={selectedServiceOptions}
            styles={{ ...RatingCustomStyle, ...reactSelectScroll }}
            onChange={(selectedOptions) => {
              const commaSep = selectedOptions.map((item) => item.value).join(",");
              handleInputChangeVal("service_category", commaSep);
            }}
            isClearable={false}
            // isOptionDisabled={() => additionaCatSelect.length >= 4}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Menu,
              MultiValue,
              IndicatorSeparator: null,

              Option: ({ innerProps, label, isSelected }) => (
                <CheckboxOption
                  innerProps={innerProps}
                  label={label}
                  isSelected={isSelected}
                />
              ),
            }}
          />
          {errors.service_category && (
            <Typography color="error" variant="caption" component="div">
              {errors.service_category}
            </Typography>
          )}
          </>
        )}
        {activeStep === 1 && (
          <>
            <div className="rating-category">
              <span>
                <span style={{ marginRight: "20px" }}>
                  Highly Recommend: 99-100
                </span>
                <span style={{ marginRight: "20px" }}>Very Good: 96</span>
                <span>Good: 90</span>
              </span>
              <span>
                <span style={{ marginRight: "20px" }}>Average: 80</span>
                <span style={{ marginRight: "20px" }}>Poor: 50</span>
                <span>Would not recommend: &lt;50</span>
              </span>
            </div>
            {/* SELECTED CATEGORY RATING SECTION */}
            {/* <div className="ratings-selected-category-section"> */}
            <div className="">
              {selectedServiceOptions.map((option, index) => (
                <div
                  className="p-[1rem] flex flex-col gap-[1rem]"
                  key={option.value}
                >
                  {/* Selected service */}
                  <div className="mx-auto">
                    <h4 className="font-semibold">
                      Rate your {option.label} Review Form
                    </h4>
                  </div>
                  {/* Rating category fields */}
                  <div className="flex flex-col gap-[2rem]">
                    <div className="rating-category-stack">
                      <div className="rating-stack-1">
                      {/* <pre>{JSON.stringify(formValues.review[index], null, 2)}</pre> */}
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">
                            Quality of Product
                          </label>
                          {/* onChange={(e) =>
                  handleInputChange("rating_email", e.target.value)
                } */}
                          <IndiRatingInput
                            name="quality_of_product"
                            placeholder="/100"
                            value={
                              formValues.review && formValues.review[index] && formValues.review[index].quality_of_product 
                              || ''}
                            inputProps={{
                              index: index,
                              preid: option.preid,
                              vid: option.vid
                            }}
                            onChange={(e) =>
                              handleInputChange(e)
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">
                            Quality of Service
                          </label>
                          <IndiRatingInput
                            name="quality_of_service"
                            placeholder="/100"
                            value={
                              formValues.review && formValues.review[index] && formValues.review[index].quality_of_service 
                              || ''}
                            inputProps={{
                              index: index,
                              preid: option.preid,
                              vid: option.vid
                            }}
                            onChange={(e) =>
                              handleInputChange(e)
                            }
                          />
                        </div>
                      </div>

                      <div className="rating-stack-1">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">Attitude of Staff</label>
                          <IndiRatingInput
                            name="value_for_money"
                            placeholder="/100"
                            value={
                              formValues.review && formValues.review[index] && formValues.review[index].value_for_money 
                              || ''}
                            inputProps={{
                              index: index,
                              preid: option.preid,
                              vid: option.vid
                            }}
                            onChange={(e) =>
                              handleInputChange(e)
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">Overall Value</label>
                          <IndiRatingInput
                            name="attitude_of_staff"
                            placeholder="/100"
                            value={
                              formValues.review && formValues.review[index] && formValues.review[index].attitude_of_staff 
                              || ''}
                            inputProps={{
                              index: index,
                              preid: option.preid,
                              vid: option.vid
                            }}
                            onChange={(e) =>
                              handleInputChange(e)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {errors[`review_${index}`] && (
                      <Typography color="error" variant="caption" component="div">
                        {errors[`review_${index}`]}
                      </Typography>
                    )}
                    {/* Text area */}
                    <div className="flex flex-col gap-[5px] justify-center items-center">
                      <textarea
                        name="comment"
                        className="rating-textarea"
                        placeholder={`Write a review about the ${option.label} service`}
                        value={
                          formValues.review && formValues.review[index] && formValues.review[index].comment 
                          || ''}
                        inputProps={{
                          index: index,
                          preid: option.preid,
                          vid: option.vid
                        }}
                        onChange={(e) =>
                          handleInputChange(e)
                        }
                      />
                    </div>
                  </div>
                  {/* Best Vendor */}
                  <div className="mx-auto">
                    {/* <button
                      name="best_vendor"
                      value={
                        formValues.review && formValues.review[index] && formValues.review[index].best_vendor 
                        || ''}
                      index={index}
                      preid={option.preid}
                      vid={option.vid}
                      fieldType='checkbox'
                      onClick={(e) =>
                        handleInputChange(e)
                      }
                      className="flex justify-center items-center gap-1"
                    >
                      {formValues.review && formValues.review[index] && formValues.review[index].best_vendor === "1" ? (
                        <IoMdCheckmarkCircle size={28} color="#6cc2bc" />
                      ) : (
                        <MdCheckCircleOutline size={28} color="#d7d7d7" />
                      )}
                      <p style={{ fontWeight: "500" }}>Best Vendor</p>
                    </button> */}
                    <CheckBoxStyle2
                      name="best_vendor"
                      checked={formValues.review && formValues.review[index] && formValues.review[index].best_vendor==1 ? true : false}
                      onChange={(e) =>
                        //handleInputChange("condition", e.target.checked)
                        handleInputChange(e)
                      }
                      inputProps={{
                        index: index,
                        preid: option.preid,
                        vid: option.vid
                      }}
                    />
                      <p style={{ fontWeight: "500" }}>Best Vendor</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeStep === 2 && (
            <>
            <div className="flex flex-col gap-[5px]">
              <label>Find Businesses</label>
              <Select
                name="new_vendor"
                placeholder="Search Businesses"
                isSearchable={true}
                options={vendorList}
                value={selectedVendor}
                openMenuOnClick={false}
                styles={{ ...RatingCustomStyle, ...reactSelectScroll }}
                hideSelectedOptions={false}
                filterOption={({ label, value }, inputValue) =>
                  label.toLowerCase().includes(inputValue.toLowerCase())
                }/* 
                onChange={(selectedOptions) =>
                  handleVendorChange("new_vendor", selectedOptions)
                } */
                onChange={(selectedOption) => {
                  handleInputChangeVal("new_vendor",selectedOption.value);
                  CoupleJS.fetchVServices(selectedOption.value,setNewVendorServices);
                }}
                components={{
                  Menu,
                  MultiValue,
                  IndicatorSeparator: null,
                  DropdownIndicator: () => (
                    <div>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="dropDown-position"
                        style={{
                          display: "none",
                          color: "#6cc2bc",
                          marginRight: "0.5rem",
                        }}
                      />
                    </div>
                  ),
                }}
              />
            </div>
            {newVendorServices && (
              <Select
                name="new_vendor_service"
                placeholder="Select services to Rate"
                isMulti={true}
                options={services}
                value={selectedNewVendorServices}
                styles={{ ...RatingCustomStyle, ...reactSelectScroll }}
                isClearable={false}
                onChange={(selectedOptions) =>
                  handleNewVendorServiceChange(
                    "new_vendor_service",
                    selectedOptions
                  )
                }
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Menu,
                  MultiValue,
                  IndicatorSeparator: null,
                  Option: ({ innerProps, label, isSelected }) => (
                    <CheckboxOption
                      innerProps={innerProps}
                      label={label}
                      isSelected={isSelected}
                    />
                  ),
                }}
              />
            )}
            {/* SELECTED CATEGORY RATING SECTION */}
            {/* <div className="ratings-selected-category-section"> */}
            <div className="">
              {selectedNewVendorServices.map((option, index) => (
                <div
                  className="p-[1rem] flex flex-col gap-[1rem]"
                  key={option.value}
                >
                  {/* Selected service */}
                  <div className="mx-auto">
                    <h4 className="font-semibold">
                      Rate your {option.label} Review Form
                    </h4>
                  </div>
                  {/* Rating category fields */}
                  <div className="flex flex-col gap-[2rem]">
                    <div className="rating-category-stack">
                      <div className="rating-stack-1">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">
                            Quality of Product
                          </label>
                          {/* onChange={(e) =>
                  handleInputChange("rating_email", e.target.value)
                } */}
                          <IndiRatingInput
                            name="product"
                            placeholder="/100"
                            value={formValues.review && formValues.review[index].product}
                            onChange={(e) =>
                              handleInputChange("product", e.target.value, index)
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">
                            Quality of Service
                          </label>
                          <IndiRatingInput
                            name="service"
                            placeholder="/100"
                            value={formValues.review && formValues.review[index].service}
                            onChange={(e) =>
                              handleInputChange("service", e.target.value, index)
                            }
                          />
                        </div>
                      </div>

                      <div className="rating-stack-1">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">Attitude of Staff</label>
                          <IndiRatingInput
                            name="attitude"
                            placeholder="/100"
                            value={formValues.review && formValues.review[index].attitude}
                            onChange={(e) =>
                              handleInputChange("attitude", e.target.value, index)
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="text-center">Overall Value</label>
                          <IndiRatingInput
                            name="overall"
                            placeholder="/100"
                            value={formValues.review && formValues.review[index].overall}
                            onChange={(e) =>
                              handleInputChange("overall", e.target.value, index)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {errors[`review_${index}`] && (
                      <Typography color="error" variant="caption" component="div">
                        {errors[`review_${index}`]}
                      </Typography>
                    )}
                    {/* Text area */}
                    <div className="flex flex-col gap-[5px] justify-center items-center">
                      <textarea
                        name="comment"
                        className="rating-textarea"
                        placeholder={`Write a review about the ${option.label} service`}
                        value={formValues.review && formValues.review[index].comment}
                        onChange={(e) =>
                          handleInputChange("comment", e.target.value, index)
                        }
                      />
                    </div>
                  </div>
                  {/* Best Vendor */}
                  <div className="mx-auto">
                    <button
                      name="best_vendor"
                      onClick={() => handleBestVendorClick(index)}
                      className="flex justify-center items-center gap-1"
                    >
                      {formValues.review && formValues.review[index].best_vendor === "1" ? (
                        <IoMdCheckmarkCircle size={28} color="#6cc2bc" />
                      ) : (
                        <MdCheckCircleOutline size={28} color="#d7d7d7" />
                      )}
                      <p style={{ fontWeight: "500" }}>Best Vendor</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </>
        )}
        {activeStep === 3 && (
            <div className="flex flex-col gap-4">
            <div className="reviews-help-stack">
              {/* 1 */}
              <div className="flex flex-col gap-[5px]">
                <label>Perfect Wedding Season ?</label>
                <RatingInput
                  name="season"
                  placeholder="Favourite season"
                  value={formValues.season}
                  onChange={(e) =>
                    handleResearchChange("season", e.target.value)
                  }
                />
              </div>
              {/* 2 */}
              <div className="flex flex-col gap-[5px]">
                <label># of Wedding Guests ?</label>
                <RatingInput
                  type="number"
                  name="guest"
                  placeholder="Numbers Only"
                  value={formValues.guest}
                  onChange={(e) =>
                    handleResearchChange("guest", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="reviews-help-stack">
              {/* 3 */}
              <div className="flex flex-col gap-[5px]">
                <label>Original Wedding Budget</label>
                <RatingInput
                  name="budget"
                  type="number"
                  placeholder="Numbers Only"
                  value={formValues.budget}
                  onChange={(e) =>
                    handleResearchChange("budget", e.target.value)
                  }
                />
              </div>
              {/* 4 */}
              <div className="flex flex-col gap-[5px]">
                <label>Actual Cost of Wedding</label>
                <RatingInput
                  name="actual_cost"
                  type="number"
                  placeholder="Numbers Only"
                  value={formValues.actual_cost}
                  onChange={(e) =>
                    handleResearchChange("actual_cost", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="reviews-help-stack">
              {/* 5 */}
              <div className="flex flex-col gap-[5px]">
                <label># of International Guests</label>
                <RatingInput
                  name="int_guests"
                  placeholder="Leave blank if n/a"
                  value={formValues.int_guests}
                  onChange={(e) =>
                    handleResearchChange("int_guests", e.target.value)
                  }
                />
              </div>
              {/* 6 */}
              <div className="flex flex-col gap-[5px]">
                <label># of Interstate Guests</label>
                <RatingInput
                  name="interstate_guest"
                  placeholder="Leave blank if n/a"
                  value={formValues.interstate_guest}
                  onChange={(e) =>
                    handleResearchChange("interstate_guest", e.target.value)
                  }
                />
              </div>
            </div>
            {/* 7 */}
            <div className="reviews-help-stack]">
              <div className="flex flex-col gap-[5px]">
                <label>Did you Read Wedding Reviews ?</label>
                <Select
                  name="read_reviews"
                  options={[
                    { value: "1", label: "Yes" },
                    { value: "0", label: "No" },
                  ]}
                  styles={RatingCustomStyle}
                  onChange={(selectedOptions) =>
                    handleInputChange("read_reviews", selectedOptions)
                  }
                />
              </div>
            </div>
          </div>
        )}
        {activeStep === 4 && (
            <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-col gap-[5px]">
                <label>Your Full Name</label>
                <RatingInput
                  name="name"
                  onChange={(e) => handleResearchChange("name", e.target.value)}
                />
                {researchErrors.name && (
                  <Typography color="error" variant="caption" component="div">
                    {researchErrors.name}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label>Partner's Name </label>
                <RatingInput
                  name="pname"
                  onChange={(e) =>
                    handleResearchChange("pname", e.target.value)
                  }
                />
                {researchErrors.pname && (
                  <Typography color="error" variant="caption" component="div">
                    {researchErrors.pname}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label>Wedding State</label>
                <Select
                  name="wedding_state"
                  placeholder=""
                  isMulti={false}
                  options={stateList}
                  // value={selectedNewVendorServices}
                  styles={{ ...RatingCustomStyle, ...reactSelectScroll }}
                  onChange={(selectedOptions) =>
                    handleResearchChange("wedding_state", selectedOptions)
                  }
                  components={{
                    Menu,
                    MultiValue,
                    IndicatorSeparator: null,
                    DropdownIndicator: () => null,
                  }}
                />
                {researchErrors.wedding_state && (
                  <Typography color="error" variant="caption" component="div">
                    {researchErrors.wedding_state}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label>Your phone</label>
                <RatingInput
                  name="phone"
                  type="tel"
                  onChange={(e) =>
                    handleResearchChange("phone", e.target.value)
                  }
                />
                {researchErrors.phone && (
                  <Typography color="error" variant="caption" component="div">
                    {researchErrors.phone}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        )}
        <br />
        <div className="flex justify-center items-center gap-[2rem]">
          {(activeStep>0) && (
            <button className="review-next-button" onClick={handleBack}> Back </button>
          )}
          <RatingButton onClick={handleFormSubmit}>{contentArray[activeStep].btnText}</RatingButton>
          {(activeStep>1) && (
            <button className="review-next-button" onClick={handleSkip} > Skip </button>
          )}
          
        </div>
        <diV className="pb-[2rem]">
          <h5>{contentArray[activeStep].step} of {contentArray.length}</h5>
        </diV>
      </div>


      {activeStep === 5 && (
        <div className="thankyou-container">
          <h1
            style={{
              fontFamily: "Playfair",
              fontWeight: "400",
              fontSize: "32px",
            }}
          >
            Confirm Your Email
          </h1>
          <div className="flex flex-col items-center gap-[1rem] px-[1rem] md:px-[3rem] text-center">
            <h4 style={{ lineHeight: "22px" }}>
              Before we can post your review, we need your help verifying it!
              We've just emailed <br /> {formValues.rating_email}{" "}
            </h4>
            <h4>
              Simply click the linksent in the email to set your review live!
            </h4>

            <h4>
              Didn't get an email?{" "}
              <span className="abia-color font-[600]">Send again</span>{" "}
            </h4>
          </div>

          <button onClick={handleFormNext} className="okay-button">
            Okay !
          </button>
        </div>
      )}
      {activeStep === 6 && (
        <div className="thankyou-container">
          <h1
            style={{
              fontFamily: "Playfair",
              fontWeight: "400",
              fontSize: "32px",
            }}
          >
            Thank you
          </h1>
          <div className="flex flex-col items-center gap-[1rem]">
            <h4>Thank you for your feedback.</h4>
            <p style={{ textAlign: "center" }}>
              Wishing you a lifetime of love and happiness
            </p>
          </div>

          <button className="okay-button">Okay !</button>
        </div>
      )}
    </div>
  );
};

export default Reviews;

// MENU
const Menu = (props) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
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
