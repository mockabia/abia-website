import React, { useState, useEffect, useContext } from "react";
import "../Style/BusinessLogin.css";
import { Link, useNavigate } from "react-router-dom";
import BusinessForgotPassword from "../General/BusinessForgotPassword";
import * as BusinessJS from "./Business";
import { IconButton, Stack } from "@mui/material";
import {
  CoupleCommonInput,
  VLTextField,
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

  // const togglePasswordVisibility = (e) => {
  //   e.preventDefault();
  //   setShowPassword(!showPassword);
  // };
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
    <div>
      <div className="login-vendorlogin-content relative">
        <div className="login-vendorlogin-box">
          <div className="flex flex-col justify-center items-center p-[20px] relative">
            {/* error message */}
            <h1 className="login-loginbox-header">Vendor Login</h1>
            
            <form onSubmit={handleSubmit} className="lg:mt-[20px] ">
              <Stack spacing={2}>
                {/* email */}
                <div className="flex flex-col gap-[5px] ">
                  <label htmlFor="email" className=" text-[14px] font-bold">
                    Email
                  </label>
                  <CoupleCommonInput
                    name="email"
                    variant="outlined"
                    defaultValue={inputs.email}
                    onChange={handleChange}
                    autoCapitalize="off"
                  />
                  {inputsErrors.email && (
                    <div className="flex font-bold text-red-400 text-[12px]">
                      {inputsErrors.email}
                    </div>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="password" className=" text-[14px] font-bold">
                    Password
                  </label>
                  <CoupleCommonInput
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                    }}
                  />
                  {inputsErrors.password && (
                    <div className="flex font-bold text-red-400 text-[12px]">
                      {inputsErrors.password}
                    </div>
                  )}
                </div>
                <div className="flex flex-col ">
                  <VendorLoginButton disabled={!isValidForm} type="submit">
                    <span>Login</span>
                  </VendorLoginButton>
                </div>
              </Stack>
              {/*Forgot Password */}
            </form>
            <div className="cursor-pointer text-[#6cc2bc] text-[14px] font-semibold flex justify-center items-center ">
              <BusinessForgotPassword />
            </div>
            {hasInputErrors && (
              <div className="flex font-bold text-red-600 text-[12px]">
                {Object.values(inputsErrors).map((error, index) => (
                  <div key={index}>{error}</div>
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
