import React, { useEffect, useState } from "react";
import "../Style/Reviews.css";
import { ReactComponent as AbiaLogo } from "../../icons/ABIA Weddings Australia.svg";
import {
  IndiRatingInput,
  MoreSelectedBadge,
  RatingButton,
  RatingCustomStyle,
  RatingInput,
  reactSelectScroll,
} from "../../components/FormStyle";
import {
  DatePickerCouple,
  RatingDatePicker,
} from "../../components/DatepickerPublic";
import Select, { components } from "react-select";
import { CheckboxOption } from "../../components/CustomerSelect";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import * as BusinessJS from "../Business/Business";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Reviews = () => {
  const [formValues, setFormValues] = useState({
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
  });

  const [activeStep, setActiveStep] = useState(0);
  const [services, setServices] = useState(""); // vendor service
  const [vendorList, setVendorList] = useState("");
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [newVendorServices, setNewVendorServices] = useState(false);

  const [selectedServiceOptions, setSelectedServiceOptions] = useState([]);
  const [selectedNewVendorServices, setSelectedNewVendorServices] = useState(
    []
  );
  const [selectedVendor, setSelectedVendor] = useState("");
  const [errors, setErrors] = React.useState({});
  const [researchErrors, setResearchErrors] = useState({});
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    BusinessJS.fetchVServices(setServices);
    BusinessJS.fetchVendors(setVendorList);
    BusinessJS.fetchState(setStateList);
  }, []);

  // console.log("Vendor list :", vendorList);

  const handleInputChange = (fieldName, value, index) => {
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
  };

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
    setResearch((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
    setResearchErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
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

  // date handle
  const handleDateChange = (fieldName, date) => {
    setFormValues({ ...formValues, [fieldName]: date });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  // Function to handle changes in the selected services for the new vendor
  // const handleNewVendorServiceChange = (selectedOptions) => {
  //   setSelectedNewVendorServices(selectedOptions);
  // };

  // ... (previous code)

  const handleRatingsSubmit = () => {
    const validationErrors = validateReviewFields();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      const updatedReview = selectedServiceOptions.map((option, index) => ({
        id: option.value,
        product: formValues.review[index].product || "",
        service: formValues.review[index].service || "",
        attitude: formValues.review[index].attitude || "",
        overall: formValues.review[index].overall || "",
        comment: formValues.review[index].comment || "",
        best_vendor: formValues.review[index].best_vendor || "0",
      }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log("Form Values:", { updatedReview });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleNewVendorSubmit = () => {
    const validationErrors = validateReviewFields();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      const updatedReview = selectedNewVendorServices.map((option, index) => ({
        id: option.value,
        product: formValues.review[index].product || "",
        service: formValues.review[index].service || "",
        attitude: formValues.review[index].attitude || "",
        overall: formValues.review[index].overall || "",
        comment: formValues.review[index].comment || "",
        best_vendor: formValues.review[index].best_vendor || "0",
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
      if (
        !review.product ||
        !review.service ||
        !review.attitude ||
        !review.overall
      ) {
        errors[`review_${index}`] =
          "Please provide the Quality of Product, Quality of Service, Attitude of Staff & Overall Value.";
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
      console.log("Research Data:", research);
    } else {
      // Update state with validation errors
      setResearchErrors(validationErrors);
    }
  };

  const validateResearchFields = () => {
    const errors = {};

    // Validate name
    if (!research.name.trim()) {
      errors.name = "Please provide your full name.";
    }

    // Validate partner's name
    if (!research.pname.trim()) {
      errors.pname = "Please provide your partner's name.";
    }

    // Validate wedding state
    if (!research.wedding_state) {
      errors.wedding_state = "Please provide your wedding state.";
    }

    // Validate phone
    if (!research.phone.trim()) {
      errors.phone = "Please provide your phone number.";
    }

    return errors;
  };

  // ... (rest of the code)

  return (
    <div className="review-margin h-screen">
      {/* logo */}
      <Link to={"/"} className="abia-logo-section">
        <AbiaLogo />
      </Link>
      {/* Review container */}
      {activeStep === 0 && (
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
              Vote for Crowne Plaza Hawkesbury Valley in the ABIA Wedding Awards
            </span>
          </div>
          {/* Page 1 */}
          {/* input field */}
          <div className="flex flex-col gap-[5px] justify-center items-center">
            {/* EMAIL */}
            <RatingInput
              name="rating_email"
              value={formValues.rating_email}
              placeholder="E-mail"
              onChange={(e) =>
                handleInputChange("rating_email", e.target.value)
              }
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
            name="wedding_date"
            value={formValues.wedding_date}
            handleDateChange={handleDateChange}
          />
          {errors.wedding_date && (
            <Typography color="error" variant="caption" component="div">
              {errors.wedding_date}
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
            onChange={(selectedOptions) =>
              handleInputChange("service_category", selectedOptions)
            }
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
          <br />
          <RatingButton onClick={handleFormNext}>Next</RatingButton>
          <diV className="pb-[2rem]">
            <h5>1 of 5</h5>
          </diV>
        </div>
      )}
      {activeStep === 1 && (
        <div className="reviews-container">
          {/* vendor-logo */}
          <div className="review-logo-section">
            <img
              src="https://mockabia.com/uploads/profile/thumb/crowne-plaza-hawkesbury-valley-windsor_2106230921384.jpeg"
              className="rounded-[50%]"
            />
          </div>
          <div className="font-playfair review-heading">
            <span className="review-heading">
              Rate & Review Crowne Plaza Hawkesbury Valley
            </span>
          </div>
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
          <div className="ratings-selected-category-section">
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
                          value={formValues.review[index].product}
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
                          value={formValues.review[index].service}
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
                          value={formValues.review[index].attitude}
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
                          value={formValues.review[index].overall}
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
                      value={formValues.review[index].comment}
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
                    {formValues.review[index].best_vendor === "1" ? (
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

          {/* <br /> */}
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            {/* <RatingButton onClick={handleFormNext}>Next</RatingButton> */}
            <RatingButton onClick={handleNewVendorSubmit}>Submit</RatingButton>

            <button
              className="review-next-button invisible"
              onClick={handleSkip}
            >
              Skip
            </button>
          </div>

          <diV>
            <h5>2 of 5</h5>
          </diV>
          <div></div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="reviews-container">
          {/* vendor-logo */}
          <div className="review-logo-section">
            <img
              src="https://mockabia.com/uploads/profile/thumb/crowne-plaza-hawkesbury-valley-windsor_2106230921384.jpeg"
              className="rounded-[50%]"
            />
          </div>
          <div className="font-playfair review-heading">
            <span className="review-heading">Review more vendors?</span>
          </div>
          {/* Page 3 */}
          {/* input field */}
          {/*  */}
          <div className="flex flex-col gap-[5px]">
            <label>Find Businesses</label>
            <Select
              name="new_vendor"
              placeholder="Search Businesses"
              isSearchable={true}
              options={vendorList}
              value={selectedVendor}
              styles={{ ...RatingCustomStyle, ...reactSelectScroll }}
              onChange={(selectedOptions) =>
                handleVendorChange("new_vendor", selectedOptions)
              }
              // isOptionDisabled={() => additionaCatSelect.length >= 4}
              hideSelectedOptions={false}
              filterOption={(option, inputValue) =>
                option.label.toLowerCase().startsWith(inputValue.toLowerCase())
              }
              components={{
                Menu,
                MultiValue,
                IndicatorSeparator: null,
                DropdownIndicator: null,
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
          <div className="ratings-selected-category-section">
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
                          value={formValues.review[index].product}
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
                          value={formValues.review[index].service}
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
                          value={formValues.review[index].attitude}
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
                          value={formValues.review[index].overall}
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
                      value={formValues.review[index].comment}
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
                    {formValues.review[index].best_vendor === "1" ? (
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
          <br />
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            {/* <RatingButton onClick={handleFormNext}>Next</RatingButton> */}
            <RatingButton onClick={handleFormNext}>Next</RatingButton>

            <button className="review-next-button" onClick={handleSkip}>
              Skip
            </button>
          </div>
          <diV>
            <h5>3 of 5</h5>
          </diV>
        </div>
      )}
      {activeStep === 3 && (
        <div className="reviews-container">
          {/* vendor-logo */}
          <div className="review-logo-section">
            <img
              src="https://mockabia.com/uploads/profile/thumb/crowne-plaza-hawkesbury-valley-windsor_2106230921384.jpeg"
              className="rounded-[50%]"
            />
          </div>
          <div className="font-playfair review-heading">
            <span className="review-heading">Help Us?</span>
          </div>
          <p>
            To help us out with industry research, we would love to learn more
            about your wedding.
          </p>
          {/* Page 3 */}
          {/* input field */}

          {/*  */}
          <div className="flex flex-col gap-4">
            <div className="reviews-help-stack">
              {/* 1 */}
              <div className="flex flex-col gap-[5px]">
                <label>Perfect Wedding Season ?</label>
                <RatingInput
                  name="season"
                  placeholder="Favourite season"
                  value={research.season}
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
                  value={research.guest}
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
                  value={research.budget}
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
                  value={research.actual_cost}
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
                  value={research.int_guests}
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
                  value={research.interstate_guest}
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
                  // value={research.read_reviews}
                  styles={RatingCustomStyle}
                  onChange={(selectedOptions) =>
                    handleInputChange("read_reviews", selectedOptions)
                  }
                />
              </div>
            </div>
          </div>

          <br />
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            {/* <RatingButton onClick={handleFormNext}>Next</RatingButton> */}
            <RatingButton onClick={handleFormNext}>Next</RatingButton>

            <button className="review-next-button" onClick={handleSkip}>
              Skip
            </button>
          </div>

          <diV className="pb-[2rem]">
            <h5>4 of 5</h5>
          </diV>
        </div>
      )}
      {activeStep === 4 && (
        <div className="reviews-container ">
          {/* vendor-logo */}
          <div className="review-logo-section">
            <img
              src="https://mockabia.com/uploads/profile/thumb/crowne-plaza-hawkesbury-valley-windsor_2106230921384.jpeg"
              className="rounded-[50%]"
            />
          </div>
          <div className="font-playfair review-heading">
            <span className="review-heading">Verify Your Wedding!?</span>
          </div>
          <p>
            To help us out with industry research, we would love to learn more
            about your wedding.
          </p>
          {/* Page 3 */}
          {/* input field */}

          {/*  */}
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
                    // Option: ({ innerProps, label, isSelected }) => (
                    //   <CheckboxOption
                    //     innerProps={innerProps}
                    //     label={label}
                    //     isSelected={isSelected}
                    //   />
                    // ),
                  }}
                />

                {/* <RatingInput
                  name="wedding_state"
                  onChange={(e) =>
                    handleResearchChange("season", e.target.value)
                  }
                /> */}
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

          <br />
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            <RatingButton onClick={handleVerifySubmit}>Submit</RatingButton>
            <button
              className="review-next-button invisible"
              onClick={handleBack}
            >
              Back
            </button>
          </div>

          <diV className="pb-[2rem]">
            <h5>5 of 5</h5>
          </diV>
        </div>
      )}
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
