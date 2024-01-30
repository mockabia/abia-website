import React, { useEffect } from "react";
import "../Style/CouplesLogin.css";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {
  CLLoginStyle,
  CoupleCommonInput,
  CouplesLoginBox,
  ForgetBox,
  NextButtonStyle,
  StyledIconButton,
} from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import CoupleForgotPwd from "./CoupleForgotPwd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CouplesLogin = ({ handleClosePage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    if (formValues.password.trim() !== "" && showPassword) {
      setShowVisibilityIcon(!showPassword);
    } else {
      setShowVisibilityIcon(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.email) {
      // Validate Email
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid Email";
    }
    // Validate Password
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Minimum 6 characters";
    }

    return errors;
  };

  const handleInputChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    setShowVisibilityIcon(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormValues({ ...formValues });
      console.log("Current form values:", {
        formValues,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="cl-container">
      <Box sx={CouplesLoginBox}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <StyledIconButton type="button" onClick={handleClosePage}>
            <AiOutlineClose size={20} />
          </StyledIconButton>
        </Box>
        <form>
          <h1 className="cs-login-header">Bride/Groom Login</h1>
          <div className="cl-field">
            <label className="cl-label">Email</label>
            <CoupleCommonInput
              variant="outlined"
              name="email"
              type="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              // error={errors.email}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          <br />
          {/* PASSWORD */}
          <div className="cl-field">
            <label className="cl-label">Password</label>
            <CoupleCommonInput
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              // label="Password*"
              onChange={(e) => handleInputChange("password", e.target.value)}
              InputProps={{
                endAdornment: showVisibilityIcon && (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon sx={{ fill: "#c3bebe" }} />
                    ) : (
                      <VisibilityOutlinedIcon sx={{ fill: "#c3bebe" }} />
                    )}
                  </IconButton>
                ),
              }}
            />
            {errors.password && (
              <div className="error-text">{errors.password}</div>
            )}
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "2rem",
            }}
          ></Box>

          <button
            onClick={handleSubmit}
            // type="submit"
            className="clLoginButton"
          >
            Login
          </button>

          {/* FORGOT PASSWORD */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "1rem",
            }}
          >
            <CoupleForgotPwd />
          </Box>

          {/* SIGN UP NOW AND SIGN IN VENDOR */}
          <div className="clogin-margin-auto">
            <h6>
              Don't have an account?{" "}
              <Link to={window.CSIGNUP} className="font-[900] underline">
                {" "}
                <span className="cl-gap">q</span>Sign Up Now
              </Link>
            </h6>
            <h6 style={{ marginTop: "10px" }}>
              Are you a vendor?{" "}
              <Link to={window.VLOGIN} className="font-[900] underline">
                {" "}
                <span className="cl-gap">q</span> Sign In Here
              </Link>
            </h6>
          </div>
        </form>
      </Box>
      //{" "}
    </div>
  );
};

export default CouplesLogin;
