import React, { useState, useEffect, useContext } from "react";
import "../Style/CouplesLogin.css";
import { Link, useNavigate } from "react-router-dom";
import BusinessForgotPassword from "../General/BusinessForgotPassword";
import * as CoupleJS from "./Couple";
import { IconButton, Stack } from "@mui/material";
import {
  CoupleCommonInput,
  VendorLoginButton,
} from "../../components/FormStyle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CoupleForgotPwd from "./CoupleForgotPwd";

const CouplesLogin = (props) => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [passwordType, setPasswordType] = useState("text");
  const [formValues, setFormValues] = useState({});
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

  useEffect(() => {
    if (showPassword) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [showPassword]);

  const handleKeyPress = (e) => {
    setShowPassword(false);
    setPasswordType("password");
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors);
    setShowVisibilityIcon(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CoupleJS.coupleLogin(formValues, setErrors, navigate);
  };

  let isValidForm =
    Object.values(errors || "").filter((error) => typeof error !== "undefined")
      .length === 0;

  const hasInputErrors = Object.values(errors).some(
    (error) => typeof error !== "undefined"
  );

  return (
    <div className="login-main-container">
      <div className="login-couple-content relative">
        <div className="login-vendorlogin-box">
          <div className="flex flex-col justify-center items-center p-[20px] relative">
            {/* error message */}
            <h1 className="login-loginbox-header">
              Plan <span className="playfair">Your Wedding!</span>
            </h1>

            <form onSubmit={handleSubmit} className="mt-[20px] ">
              <Stack spacing={2}>
                {/* email */}
                <div className="flex flex-col gap-[5px] ">
                  {/* <label htmlFor="email" className=" text-[14px] font-bold">
                    Email
                  </label> */}
                  <CoupleCommonInput
                    placeholder="Email"
                    variant="outlined"
                    name="email"
                    type="text"
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="flex font-bold text-red-400 text-[12px]">
                      {errors.email}
                    </div>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-[5px]">
                  {/* <label htmlFor="password" className=" text-[14px] font-bold">
                    Password
                  </label> */}
                  <CoupleCommonInput
                    placeholder="Password"
                    variant="outlined"
                    name="password"
                    type={passwordType}
                    onKeyUp={handleKeyPress}
                    onKeyDown={handleKeyPress}
                    // label="Password*"
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: showVisibilityIcon && (
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon
                              sx={{ fill: "#c3bebe" }}
                            />
                          ) : (
                            <VisibilityOutlinedIcon sx={{ fill: "#c3bebe" }} />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                  {errors.password && (
                    <div className="flex font-bold text-red-400 text-[12px]">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="login-forgot-password">
                  <CoupleForgotPwd />
                </div>
                <div className="flex flex-col ">
                  <VendorLoginButton disabled={!isValidForm} type="submit">
                    <span>Login</span>
                  </VendorLoginButton>
                </div>
              </Stack>
              <div className="flex justify-center">
                <h6>
                  Don't have an account?{" "}
                  <Link to={window.CSIGNUP} className="font-[900] underline">
                    {" "}
                    <span className="cl-gap"></span>Sign Up Now
                  </Link>
                </h6>
              </div>
              {/*Forgot Password */}
            </form>

            {/* {hasInputErrors && (
              <div className="flex font-bold text-red-600 text-[12px]">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* above 1024px */}
      <div className="login-section-desktop">
        <div className="flex justify-center items-center">
          <div className="login-vendorlogin-box2">
            <div className="flex flex-col justify-center items-center p-[20px] relative">
              {/* error message */}
              <h1 className="login-loginbox-header">
                {" "}
                Plan <span className="playfair">Your Wedding!</span>
              </h1>

              <form onSubmit={handleSubmit} className="lg:mt-[20px] ">
                <Stack spacing={2}>
                  {/* email */}
                  <div className="flex flex-col gap-[5px] ">
                    {/* <label htmlFor="email" className=" text-[14px] font-bold">
                    Email
                  </label> */}
                    <CoupleCommonInput
                      placeholder="Email"
                      variant="outlined"
                      name="email"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="flex font-bold text-red-400 text-[12px]">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  {/* Password */}
                  <div className="flex flex-col gap-[5px]">
                    {/* <label htmlFor="password" className=" text-[14px] font-bold">
                    Password
                  </label> */}
                    <CoupleCommonInput
                      placeholder="Password"
                      variant="outlined"
                      name="password"
                      type={passwordType}
                      onKeyUp={handleKeyPress}
                      onKeyDown={handleKeyPress}
                      // label="Password*"
                      onChange={handleInputChange}
                      InputProps={{
                        endAdornment: showVisibilityIcon && (
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon
                                sx={{ fill: "#c3bebe" }}
                              />
                            ) : (
                              <VisibilityOutlinedIcon
                                sx={{ fill: "#c3bebe" }}
                              />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                    {errors.password && (
                      <div className="flex font-bold text-red-400 text-[12px]">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="login-forgot-password">
                    <CoupleForgotPwd />
                  </div>
                  <div className="flex flex-col ">
                    <VendorLoginButton disabled={!isValidForm} type="submit">
                      <span>Login</span>
                    </VendorLoginButton>
                  </div>
                </Stack>
                <div className="flex justify-center">
                  <h6>
                    Don't have an account?{" "}
                    <Link to={window.CSIGNUP} className="font-[900] underline">
                      {" "}
                      <span className="cl-gap">q</span>Sign Up Now
                    </Link>
                  </h6>
                </div>
                {/*Forgot Password */}
              </form>

              {/* {hasInputErrors && (
                <div className="flex font-bold text-red-600 text-[12px]">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouplesLogin;

// export default CouplesLogin;
