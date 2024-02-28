import React, { useEffect, useState } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import {CoupleCommonInput, MuiBoxStyles,} from "../../components/FormStyle";
import { useNavigate } from "react-router-dom";
import "../Style/CoupleProfile.css";
import * as CoupleJS from "./Couple";

const CoupleContact = (props) => {

  let navigate                        = useNavigate();
  const [formValues, setFormValues]   = useState({});
  const [errors, setErrors]           = React.useState({});
  const isMobile                      = useMediaQuery("(max-width:550px)");

  useEffect(() => {
    CoupleJS.coupleDetails('contact',setFormValues)
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CoupleJS.coupleContact(formValues, setErrors,navigate)
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
                  onChange={(e) => handleInputChange(e)}
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
                  onChange={(e) => handleInputChange(e)}
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
                  onChange={(e) => handleInputChange(e)}
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
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.email && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </div>
                )}
              </Box>
              {typeof errors != 'object' && errors !== null ? (
                  <div className="error">
                    <p dangerouslySetInnerHTML={{ __html: errors }} ></p>
                    <a href="javascript:;" class="close" onClick={(e) => CoupleJS.customJS.errorClose(errors)} >X</a>
                  </div>
                ) :''}
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
