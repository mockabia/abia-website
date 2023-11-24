import React, { useState, useEffect, useContext } from "react";
import "../Style/BusinessLogin.css";
import { Link, useNavigate } from "react-router-dom";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import BusinessForgotPassword from "../General/BusinessForgotPassword";
import * as GeneralJS from "../General/General";
import { IconButton, Stack } from "@mui/material";
import { VLTextField, VendorLoginButton } from "../../components/FormStyle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const LoginPage = () => {
  const navigate                        = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs]             = useState({});
  const [inputsErrors, setInputsErrors] = useState({});

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    GeneralJS.hasJWT(navigate);
    GeneralJS.checkRememberMe(setInputs);
  }, []);

  const handleChange = (e) => {
    GeneralJS.handleChange(e, setInputs, setInputsErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    GeneralJS.vendorLoginForm(e, inputs, setInputsErrors, navigate);
  };

  let isValidForm =
    Object.values(inputsErrors).filter((error) => typeof error !== "undefined")
      .length === 0;

  const hasInputErrors = Object.values(inputsErrors).some(error => typeof error !== "undefined");
  return (
        <div>
          <div className="login-vendorlogin-content relative">
            <div className="login-vendorlogin-box">
              <div className="flex flex-col justify-center items-center p-[20px] relative">
                {/* error message */}
                <h1 className="login-loginbox-header">Vendor Login</h1>
                <form onSubmit={handleSubmit} className="lg:mt-[20px] ">
                  <Stack spacing={2}>
                    {/* email */}
                    <div className="flex flex-col ">
                      <label htmlFor="email" className=" text-[14px] font-bold">
                        Email
                      </label>
                      <VLTextField
                        name="email"
                        variant="outlined"
                        defaultValue={inputs.email}
                        onChange={handleChange}
                        error={inputsErrors.email ? true : false}
                        helperText={inputsErrors.email}
                        autoCapitalize="off"
                      />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col ">
                      <label
                        htmlFor="password"
                        className=" text-[14px] font-bold"
                      >
                        Password
                      </label>
                      <VLTextField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        defaultValue={inputs.password}
                        onChange={handleChange}
                        //onBlur={handleBlur}
                        error={inputsErrors.password ? true : false}
                        helperText={inputsErrors.password}
                        autoCapitalize="off"
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
                                <VisibilityOffOutlinedIcon />
                              ) : (
                                <VisibilityOutlinedIcon />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <VendorLoginButton disabled={!isValidForm} type="submit">
                        <span>Login</span>
                      </VendorLoginButton>
                       
                    </div>
                  </Stack>
                  {/* Password */}
                </form>
                <div className="cursor-pointer text-[#6cc2bc] text-[14px] font-semibold flex justify-center items-center mb-[10px]">
                  <BusinessForgotPassword />
                </div>
                 {hasInputErrors && (
                  <div className="flex font-bold text-red-600 text-[14px]">
                    {Object.values(inputsErrors).map((error, index) => (
                      <div  key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="login-community-content">
            <h1 className="login-community-header">Join the ABIA Community </h1>
            <span className="login-community-subcontent">
              Elevate & promote your wedding brand by joining Australia's{" "}
              <br className="login-content-adjust" />
              Largest Wedding Review Platform & Industry Awards.{" "}
            </span>
            <div className="lg:block mt-[15px]"></div>
            <div className="space-y-[35px]">
              <p className="font-[700] text-[#222222] text-[14px]">
                Don't have an ABIA's Vendor Account?
              </p>
              <div className="flex justify-center items-center">
                <span></span>
                <Link className="login-apply-button ">apply here</Link>
                <span></span>
              </div>
            </div>
            <br />
          </div>
        </div>
  );
};

export default LoginPage;



