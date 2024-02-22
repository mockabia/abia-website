import React, { useEffect, useState } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { CoupleInput } from "../../components/FormStyle";
import { useNavigate } from "react-router-dom";
import * as CoupleJS from "./Couple";

const CoupleAccountSetting = (props) => {

  let navigate                      = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors]         = useState({});
  const isMobile                    = useMediaQuery("(max-width:550px)");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    CoupleJS.coupleSettings(formValues, setErrors,navigate)
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
                      handleInputChange(e)
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
                    name="confirm_password"
                    type="password"
                    value={formValues.confirm_password}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                  {errors.confirm_password && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.confirm_password}
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
