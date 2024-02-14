import React, { useState } from "react";
import LayoutCouple from "../../layouts/Layout/LayoutCouple";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { CSTextfield, CoupleInput } from "../../components/FormStyle";

const CoupleAccountSetting = (props) => {

  const [formValues, setFormValues] = useState({
    password: "",
    new_password: "",
  });
  const [errors, setErrors] = useState({});
  const isMobile = useMediaQuery("(max-width:550px)");

  const handleInputChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Minimum 6 characters";
    }
    if (!formValues.new_password) {
      errors.new_password = "Password is required";
    } else if (formValues.new_password.length < 6) {
      errors.new_password = "Minimum 6 characters";
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormValues((updatedFormValues) => {
        console.log("Current form values:", {
          formValues: updatedFormValues,
        });
        return updatedFormValues;
      });
    } else {
      setErrors(validationErrors);
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
              <Stack spacing={3}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    Current Password
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  {errors.password && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.password}
                    </div>
                  )}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    New Password
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="new_password"
                    type="password"
                    value={formValues.new_password}
                    onChange={(e) =>
                      handleInputChange("new_password", e.target.value)
                    }
                  />
                  {errors.new_password && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.new_password}
                    </div>
                  )}
                </Box>
                {/* <CSTextfield
                  name="password"
                  type="password"
                  className="cs-textfield-2"
                  id="demo-helper-text-aligned"
                  label="Current Password"
                />
                <CSTextfield
                  name="password"
                  type="password"
                  className="cs-textfield-2"
                  id="demo-helper-text-aligned"
                  label="New Password"
                /> */}
              </Stack>
              <Box>
                <button
                  className="couple-save-button"
                  onClick={handleFormSubmit}
                >
                  Save Changes
                </button>
              </Box>
            </Stack>
          </Box>
        </div>
      </section>
  );
};

export default CoupleAccountSetting;
