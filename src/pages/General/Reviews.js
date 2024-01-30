import React, { useEffect, useState } from "react";
import "../Style/Reviews.css";
import AbiaLogo from "../../abiaLogo";
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
import * as BusinessJS from "../Business/Business";
import { Typography } from "@mui/material";

const Reviews = () => {
  const [formValues, setFormValues] = useState({
    rating_email: "",
    wedding_date: null,
    service_category: [],
    best_vendor: 0,
    // wedding_state: "",
    // email: "",
    // password: "",
    // marleting_category: [],
  });
  const [activeStep, setActiveStep] = useState(0);
  const [services, setServices] = useState("");
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    BusinessJS.fetchVServices(setServices);
  }, []);

  console.log("Fetch services:", services);

  // const handleFormNext = () => {
  //   setActiveStep((prev) => prev + 1);
  // };

  const handleInputChange = (fieldName, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "", // Clear the error for the current field
    }));
  };

  const handleFormNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setFormValues((updatedFormValues) => {
        console.log("Current form values:", { formValues: updatedFormValues });
        return updatedFormValues;
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (activeStep === 0) {
      if (!formValues.rating_email) {
        errors.rating_email = "Please provide a valid Email.";
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
    } else if (activeStep === 2) {
      // if (!formValues.email) {
      //   // Validate Email
      //   errors.email = "Email is required";
      // } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      //   errors.email = "Invalid Email";
      // }
      // Validate Password
      // if (!formValues.password) {
      //   errors.password = "Password is required";
      // } else if (formValues.password.length < 6) {
      //   errors.password = "Minimum 6 characters";
      // }
    }

    return errors;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBestVendorClick = () => {
    // Update best_vendor to 1 when "Best Vendor" button is clicked
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      best_vendor: 1,
    }));
  };
  // date handle
  const handleDateChange = (fieldName, date) => {
    setFormValues({ ...formValues, [fieldName]: date });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  return (
    <div className="review-margin">
      {/* logo */}
      {/* <div className="abia-logo-section">
        <AbiaLogo />
      </div> */}
      {/* Review container */}
      {activeStep === 0 && (
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
              Vote for Crowne Plaza Hawkesbury Valley in the ABIA Wedding Awards
            </span>
          </div>
          {/* Page 1 */}
          {/* input field */}
          <div className="flex flex-col gap-[5px] justify-center items-center">
            <RatingInput
              name="rating_email"
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
          <RatingDatePicker
            name="wedding_date"
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
            // value={additionaCatSelect}
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
          <diV>
            {" "}
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

          <div>
            <h4 className="font-semibold">
              Rate your Reception Venue Review Form
            </h4>
          </div>
          {/* RATING CATEGORY FIELDS */}
          <div className="flex flex-col gap-[2rem]">
            <div className="rating-category-stack">
              <div className="rating-stack-1">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-center">Quality of Product</label>
                  <IndiRatingInput placeholder="/100" />
                </div>

                <div className="flex flex-col gap-[5px]">
                  <label className="text-center">Quality of Service</label>
                  <IndiRatingInput placeholder="/100" />
                </div>
              </div>

              <div className="rating-stack-1">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-center">Attitude of Staff</label>
                  <IndiRatingInput placeholder="/100" />
                </div>

                <div className="flex flex-col gap-[5px]">
                  <label className="text-center">Overall Value</label>
                  <IndiRatingInput placeholder="/100" />
                </div>
              </div>
            </div>
            {/* input field */}
            <div className="flex flex-col gap-[5px] justify-center items-center">
              <textarea
                className="rating-textarea"
                placeholder="Write a review about the service"
              />
            </div>
          </div>
          {/* Best Vendor */}
          <div>
            <button
              onClick={handleBestVendorClick}
              className="flex justify-center items-center gap-1"
            >
              <MdCheckCircleOutline size={26} color="#d7d7d7" />
              <p style={{ fontWeight: "500" }}>Best Vendor</p>
            </button>
          </div>

          {/* <br /> */}
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            <RatingButton onClick={handleFormNext}>Next</RatingButton>
            <button className="review-next-button">Skip</button>
          </div>

          <diV>
            <h5>2 of 5</h5>
          </diV>
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
          <div>
            <h4 className="font-semibold">
              Rate your Reception Venue Review Form
            </h4>
          </div>
          <div className="rating-category-stack">
            <div className="rating-stack-1">
              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Quality of Product</label>
                <IndiRatingInput placeholder="/100" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Quality of Service</label>
                <IndiRatingInput placeholder="/100" />
              </div>
            </div>

            <div className="rating-stack-1">
              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Attitude of Staff</label>
                <IndiRatingInput placeholder="/100" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Overall Value</label>
                <IndiRatingInput placeholder="/100" />
              </div>
            </div>
          </div>
          {/* input field */}
          <div className="flex flex-col gap-[5px] justify-center items-center">
            <RatingInput placeholder="E-mail" />
            <span className="text-[8px]">
              Your Email is only used for verification purposes, not marketing
              emails.
            </span>
          </div>
          {/*  */}
          <Select
            name="other_category"
            placeholder="Select services to Rate"
            isMulti={true}
            // options={addCategoryOption}
            // value={additionaCatSelect}
            styles={RatingCustomStyle}
            // onChange={(selectedOptions) => handleCategoryChange(selectedOptions)}
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
          <br />
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            <RatingButton onClick={handleFormNext}>Next</RatingButton>
            <button className="review-next-button">Skip</button>
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
          <div>
            <h4 className="font-semibold">
              Rate your Reception Venue Review Form
            </h4>
          </div>
          <div className="rating-category-stack">
            <div className="rating-stack-1">
              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Quality of Product</label>
                <IndiRatingInput placeholder="/100" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Quality of Service</label>
                <IndiRatingInput placeholder="/100" />
              </div>
            </div>

            <div className="rating-stack-1">
              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Attitude of Staff</label>
                <IndiRatingInput placeholder="/100" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Overall Value</label>
                <IndiRatingInput placeholder="/100" />
              </div>
            </div>
          </div>
          {/* input field */}
          <div className="flex flex-col gap-[5px] justify-center items-center">
            <RatingInput placeholder="E-mail" />
            <span className="text-[8px]">
              Your Email is only used for verification purposes, not marketing
              emails.
            </span>
          </div>
          {/*  */}
          <Select
            name="other_category"
            placeholder="Select services to Rate"
            isMulti={true}
            // options={addCategoryOption}
            // value={additionaCatSelect}
            styles={RatingCustomStyle}
            // onChange={(selectedOptions) => handleCategoryChange(selectedOptions)}
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
          <br />
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            <RatingButton onClick={handleFormNext}>Next</RatingButton>
            <button className="review-next-button">Skip</button>
          </div>

          <diV>
            <h5>4 of 5</h5>
          </diV>
        </div>
      )}
      {activeStep === 4 && (
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
          <div>
            <h4 className="font-semibold">
              Rate your Reception Venue Review Form
            </h4>
          </div>
          <div className="rating-category-stack">
            <div className="rating-stack-1">
              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Quality of Product</label>
                <IndiRatingInput placeholder="/100" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Quality of Service</label>
                <IndiRatingInput placeholder="/100" />
              </div>
            </div>

            <div className="rating-stack-1">
              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Attitude of Staff</label>
                <IndiRatingInput placeholder="/100" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-center">Overall Value</label>
                <IndiRatingInput placeholder="/100" />
              </div>
            </div>
          </div>
          {/* input field */}
          <div className="flex flex-col gap-[5px] justify-center items-center">
            <RatingInput placeholder="E-mail" />
            <span className="text-[8px]">
              Your Email is only used for verification purposes, not marketing
              emails.
            </span>
          </div>
          {/*  */}
          <Select
            name="other_category"
            placeholder="Select services to Rate"
            isMulti={true}
            // options={addCategoryOption}
            // value={additionaCatSelect}
            styles={RatingCustomStyle}
            // onChange={(selectedOptions) => handleCategoryChange(selectedOptions)}
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
          <br />
          <div className="flex justify-center items-center gap-[2rem]">
            <button className="review-next-button" onClick={handleBack}>
              Back
            </button>
            <RatingButton onClick={handleFormNext}>Next</RatingButton>
            <button className="review-next-button">Skip</button>
          </div>

          <diV>
            <h5> of 5</h5>
          </diV>
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
