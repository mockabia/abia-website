import React, { useState, useEffect, useContext } from "react";
import "../Style/BusinessLogin.css";
import { Link, useNavigate } from "react-router-dom";
import BusinessForgotPassword from "../General/BusinessForgotPassword";
import * as BusinessJS from "./Business";
import { IconButton, Stack } from "@mui/material";
import {
  CoupleCommonInput,
  VendorLoginButton,
} from "../../components/FormStyle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);

    const newPassword = inputs.password.trim();

    if (newPassword === "" || newPassword.length === 0) {
      // If the password is empty, hide the visibility icon
      setShowVisibilityIcon(false);
    } else {
      // If the password is not empty, toggle the visibility icon
      setShowVisibilityIcon(!showPassword);
    }
  };
  useEffect(() => {
    BusinessJS.hasJWT(navigate);
    BusinessJS.checkRememberMe(setInputs);
  }, []);

  const handleChange = (e) => {
    BusinessJS.handleChange(e, setInputs, setInputsErrors);
    setShowVisibilityIcon(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    BusinessJS.vendorLoginForm(e, inputs, setInputsErrors, navigate);
  };

  let isValidForm =
    Object.values(inputsErrors || "").filter(
      (error) => typeof error !== "undefined"
    ).length === 0;

  const hasInputErrors = Object.values(inputsErrors).some(
    (error) => typeof error !== "undefined"
  );

  return (
    <div className="login-main-container">
      <div className="login-vendorlogin-content relative">
        <div className="login-vendorlogin-box">
          <div className="flex flex-col justify-center items-center p-[20px] relative">
            {/* error message */}
            <h1 className="login-loginbox-header">
              Login <span className="playfair">to ABIA</span>
            </h1>

            <form onSubmit={handleSubmit} className="mt-[20px] ">
              <Stack spacing={2}>
                {/* email */}
                <div className="flex flex-col gap-[5px] ">
                  {/* <label htmlFor="email" className=" text-[14px] font-bold">
                    Email
                  </label> */}
                  <CoupleCommonInput
                    name="email"
                    placeholder="Email"
                    variant="outlined"
                    defaultValue={inputs.email}
                    onChange={handleChange}
                    autoCapitalize="off"
                    InputProps={{
                      inputProps: {
                        style: {
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#000",
                        },
                      },
                    }}
                  />
                  {inputsErrors.email && (
                    <div className="flex font-bold text-red-400 text-[12px]">
                      {inputsErrors.email}
                    </div>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-[5px]">
                  {/* <label htmlFor="password" className=" text-[14px] font-bold">
                    Password
                  </label> */}
                  <CoupleCommonInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="outlined"
                    defaultValue={inputs.password}
                    onChange={handleChange}
                    //onBlur={handleBlur}
                    autoCapitalize="off"
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={togglePasswordVisibility}>
                          {showVisibilityIcon ? (
                            showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )
                          ) : null}
                        </IconButton>
                      ),
                      inputProps: {
                        style: {
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#000",
                        },
                      },
                    }}
                  />
                  {inputsErrors.password && (
                    <div className="flex font-bold text-red-400 text-[12px]">
                      {inputsErrors.password}
                    </div>
                  )}
                </div>
                <div className="login-forgot-password ">
                  <BusinessForgotPassword />
                </div>
                <div className="flex flex-col ">
                  <VendorLoginButton disabled={!isValidForm} type="submit">
                    <span>Sign in</span>
                  </VendorLoginButton>
                </div>
              </Stack>
              <div className="flex justify-center">
                <h6>
                  Don't have an account?{" "}
                  <Link to={window.VSIGNUP} className="font-[900] underline">
                    {" "}
                    <span className="cl-gap"></span>Sign Up Now
                  </Link>
                </h6>
              </div>
              {/*Forgot Password */}
            </form>

            {/* {hasInputErrors && (
              <div className="flex font-bold text-red-600 text-[12px]">
                {Object.values(inputsErrors).map((error, index) => (
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
                Login <span className="playfair">to ABIA</span>
              </h1>

              <form onSubmit={handleSubmit} className="lg:mt-[20px] ">
                <Stack spacing={2}>
                  {/* email */}
                  <div className="flex flex-col gap-[5px] ">
                    {/* <label htmlFor="email" className=" text-[14px] font-bold">
                    Email
                  </label> */}
                    <CoupleCommonInput
                      name="email"
                      placeholder="Email"
                      variant="outlined"
                      defaultValue={inputs.email}
                      onChange={handleChange}
                      autoCapitalize="off"
                      InputProps={{
                        inputProps: {
                          style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#000",
                          },
                        },
                      }}
                    />
                    {inputsErrors.email && (
                      <div className="flex font-bold text-red-400 text-[12px]">
                        {inputsErrors.email}
                      </div>
                    )}
                  </div>
                  {/* Password */}
                  <div className="flex flex-col gap-[5px]">
                    {/* <label htmlFor="password" className=" text-[14px] font-bold">
                    Password
                  </label> */}
                    <CoupleCommonInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      variant="outlined"
                      defaultValue={inputs.password}
                      onChange={handleChange}
                      //onBlur={handleBlur}
                      autoCapitalize="off"
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={togglePasswordVisibility}>
                            {showVisibilityIcon ? (
                              showPassword ? (
                                <VisibilityOffOutlinedIcon />
                              ) : (
                                <VisibilityOutlinedIcon />
                              )
                            ) : null}
                          </IconButton>
                        ),
                        inputProps: {
                          style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#000",
                          },
                        },
                      }}
                    />
                    {inputsErrors.password && (
                      <div className="flex font-bold text-red-400 text-[12px]">
                        {inputsErrors.password}
                      </div>
                    )}
                  </div>
                  <div className="login-forgot-password">
                    <BusinessForgotPassword />
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
                    <Link to={window.VSIGNUP} className="font-[900] underline">
                      {" "}
                      <span className="cl-gap"></span>Sign Up Now
                    </Link>
                  </h6>
                </div>
                {/*Forgot Password */}
              </form>

              {/* {hasInputErrors && (
                <div className="flex font-bold text-red-600 text-[12px]">
                  {Object.values(inputsErrors).map((error, index) => (
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

export default LoginPage;
