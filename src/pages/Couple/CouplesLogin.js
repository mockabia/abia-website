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
import { useNavigate, Link } from "react-router-dom";
import * as CoupleJS from "../Couple/Couple";

const CouplesLogin = ({ handleClosePage }) => {
  let navigate = useNavigate();
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

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
    setShowVisibilityIcon(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CoupleJS.coupleLogin(formValues, setErrors, navigate)
  };
  
  const hasErrors = Object.values(errors).some(
    (error) => typeof error !== "undefined"
  );

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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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

          {hasErrors && (
            <div className="flex font-bold text-red-600 text-[12px]">
              {errors}
            </div>
          )}

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
      {" "}
    </div>
  );
};

export default CouplesLogin;
