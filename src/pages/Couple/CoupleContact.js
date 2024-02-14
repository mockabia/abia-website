import React, { useState } from "react";
import LayoutCouple from "../../layouts/Layout/LayoutCouple";
import { Box, Stack, TextField, useMediaQuery } from "@mui/material";
import {
  CoupleCommonInput,
  CoupleInput,
  CoupleSaveButton,
  MuiBoxStyles,
} from "../../components/FormStyle";
import "../Style/CoupleProfile.css";
import { Link } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";

const CoupleContact = (props) => {

  const [formValues, setFormValues] = useState({
    bride: "",
    groom: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = React.useState({});
  const isMobile = useMediaQuery("(max-width:550px)");

  const handleInputChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formValues.bride) {
      errors.bride = "Full Name is required";
    }
    if (!formValues.groom) {
      errors.groom = "Partner's Name is required";
    }
    if (!formValues.phone) {
      errors.phone = "Phone no: is required";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Invalid Email";
    }

    return errors;
  };
  // console.log("Errors:", errors)
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    console.log(validationErrors); // Log errors to console for inspection
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formValues);
      postData(formValues);
    } else {
      setErrors(validationErrors);
      console.log("Form validation failed");
    }
  };

  const postData = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/contactDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Data posted successfully!");
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
  };

  return (
      <section>
        <div className="couple-contact-container">
          <Box
            component="form"
            sx={{
              width: "100%",
              margin: isMobile ? "0 1.5rem" : "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
            noValidate
          >
            <Stack
              width="100%"
              maxWidth="23rem"
              sx={{
                "@media (min-width: 600px)": {
                  width: "28rem",
                  maxWidth: "30rem",
                },
              }}
              spacing={2}
            >
              <h2>{props.pageData.title}</h2>
              {/* FULL NAME */}
              <Box sx={MuiBoxStyles}>
                <label className="mb-[5px]">
                  Your Full Name
                  <span className="star">*</span>
                </label>
                <CoupleCommonInput
                  name="bride"
                  type="text"
                  value={formValues.bride}
                  onChange={(e) => handleInputChange("bride", e.target.value)}
                />
                {errors.bride && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.bride}
                  </div>
                )}
              </Box>
              {/* PARTNER NAME */}
              <Box sx={MuiBoxStyles}>
                <label className="mb-[5px]">
                  Partner's Name
                  <span className="star">*</span>
                </label>
                <CoupleCommonInput
                  name="groom"
                  type="text"
                  value={formValues.groom}
                  onChange={(e) => handleInputChange("groom", e.target.value)}
                />
                {errors.groom && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.groom}
                  </div>
                )}
              </Box>
              {/* Mobile */}
              <Box sx={MuiBoxStyles}>
                <label className="mb-[5px]">
                  Mobile
                  <span className="star">*</span>
                </label>
                <CoupleCommonInput
                  name="phone"
                  inputMode="tel"
                  type="number"
                  value={formValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {errors.phone && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.phone}
                  </div>
                )}
              </Box>
              {/* EMAIL */}
              <Box sx={MuiBoxStyles}>
                <label className="mb-[5px]">
                  Email Address
                  <span className="star">*</span>
                </label>
                <CoupleCommonInput
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </div>
                )}
              </Box>
              <Box>
                <button className="couple-save-button">Save Changes</button>
              </Box>
            </Stack>
          </Box>
        </div>
      </section>
  );
};

export default CoupleContact;
