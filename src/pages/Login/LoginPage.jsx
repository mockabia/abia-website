import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import Footer from "../General/Footer/Footer";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import * as servicesPage from "../../services/vendor/businessServices";
import * as apiurls from "../../api/apiUrls";
import * as apiService from "../../api/apiServices";
import axios from "axios";
import LoginUseForm from "./useForm";
import { IconButton, Stack } from "@mui/material";
import {
  ForgetBox,
  VLTextField,
  VendorLoginButton,
} from "../../components/FormStyle";
import { validateEmail, validatePassword, validator } from "./LoginValidator";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const LoginPage = () => {
  const initState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [apiRequestSuccess, setApiRequestSuccess] = useState(false);
  const [userStates, setUserStates] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [token, setToken] = useState(null);
  let location = [];

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setErrMsg("");
  }, [initState]);

  /* const submit = async () => {
    const { email, password } = state;
    if (validateEmail && validatePassword) {
      try {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content");

        const response = await axios.post(apiurls.BUSINESS_LOGIN, {
          email: email,
          password: password,
        });
        setUser(response.data);

        console.log("AccessToekn is", response.data.token);

        if (response.status === 200) {
          const jwttoken = response?.data?.token;
          const states = response?.data.result;
          const userStatesData = response.data.result;
          const statesLegnth = response.data.result.length;
          console.log("State length:", statesLegnth);
          console.log("State Listed:", userStatesData);
          setToken(jwttoken);
          console.log(jwttoken);
          setUserStates(userStatesData);
          setApiRequestSuccess(true);
          navigate(statesLegnth <= 1 ? "/home" : "/user-state", {
            state: { userStatesData },
          });
        }
      } catch (error) {
        if (!error.response) {
          setErrMsg("No server reposne");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing Username or Psssword");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login in Failed");
        }
      }
    }
  }; */
  const submit = async () => {
    const { email, password } = state;
    let requestData = {
      email: email,
      password: password,
    };
    if (validateEmail && validatePassword) {
      await servicesPage.login(requestData).then(function (response) {
        if (response.statuscode == 200) {
          const token = response.token;
          localStorage.setItem("vendorToken", JSON.stringify(token));
          let expiresInMS = token.expires_in;
          let currentTime = new Date();
          let expireTime = new Date(currentTime.getTime() + expiresInMS);

          const userStatesData = response.result;
          const statesLegnth = response.result.length;
          console.log("State length:", statesLegnth);
          console.log("State Listed:", userStatesData);
          setToken(token);
          console.log(token);
          setUserStates(userStatesData);
          setApiRequestSuccess(true);

          localStorage.setItem("vexpireTime", expireTime);
          localStorage.removeItem("vusername");
          localStorage.removeItem("vpassword");
          localStorage.removeItem("vremember_me");
          /* if (inputs.remember_me && inputs.remember_me !== "") {
              localStorage.username     = inputs.username;
              localStorage.password     = inputs.password;
              localStorage.remember_me  = inputs.remember_me;
            } */
          apiService.setAuthToken(token);
          navigate(statesLegnth <= 1 ? "/home" : "/user-state", {
            state: { userStatesData },
          });
        } else {
          console.log("error");
        }
      });
    }
  };
  console.log("Toekn generated:", token);
  const { handleChange, handleSubmit, handleBlur, state, errors } =
    LoginUseForm({
      initState,
      callback: submit,
      validator,
    });

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  return (
    <>
      {/* <TopBar /> */}
      <main className="h-[100%] flex flex-col overflow-y-auto">
        <NavBar className="" />
        <section className="login-main-container">
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
                        defaultValue={state.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email ? true : false}
                        helperText={errors.email}
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
                        defaultValue={state.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password ? true : false}
                        helperText={errors.password}
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
                  <ForgetPassword />
                </div>
              </div>
            </div>
          </div>
          <br />
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
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
