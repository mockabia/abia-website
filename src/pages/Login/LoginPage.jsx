import React, { useState, useRef, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ForgetPassword from "./ForgetPassword";
import * as apiurls from "../../api/apiUrls";
import axios from "axios";
import LoginUseForm from "./useForm";
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import {
  ForgetBox,
  VLTextField,
  VendorLoginButton,
} from "../../components/FormStyle";
import { validateEmail, validatePassword, validator } from "./LoginValidator";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { AiOutlineClose } from "react-icons/ai";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import Dropdown from "../../third-party-packs/dropDown";
import { states } from "../../data/CategoryItems";

const LoginPage = () => {
  const initState = {
    email: "",
    password: "",
  };
  const auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiRequestSuccess, setApiRequestSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  let location = [];
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLocationChange = (selectedOptions) => {
    // console.log("Selected Options:", selectedOptions);
    location = selectedOptions;
    console.log("Location select:", location);
  };

  const submit = async () => {
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
        console.log("Response from clientside:", response.data);
        if (response.status === 200) {
          auth.login(email);
          setApiRequestSuccess(true);
          handleOpen();
          // navigate("/settings");
        }
      } catch (error) {
        console.error("API error:", error);
      }
    }
  };

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
      {/* h-[100vh] overflow-y-auto */}
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
                        required
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        defaultValue={state.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password ? true : false}
                        helperText={errors.password}
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
                        {apiRequestSuccess && (
                          <div>
                            <div>
                              <span>Login</span>
                            </div>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box
                                component="form"
                                sx={ForgetBox}
                                noValidate
                                autoComplete="off"
                                className="request-box-style"
                              >
                                <Box>
                                  <IconButton
                                    type="button"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      right: "10px",
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Stop the event propagation
                                      handleClose();
                                    }}
                                  >
                                    <AiOutlineClose />
                                  </IconButton>
                                </Box>
                                <form>
                                  <h3 className="form-header">Welcome</h3>
                                  <p className="flex justify-center">
                                    If you have Business in more than 1 state.
                                    Select the states below. Else proceed
                                  </p>

                                  <div className="mt-[1rem]">
                                    <Dropdown
                                      options={states}
                                      onFormSubmit={handleLocationChange}
                                    />
                                    <Button
                                      // type="submit"
                                      variant="contained"
                                      style={{
                                        backgroundColor: "#6cc2bc",
                                        color: "#ffffff",
                                        height: "40px",
                                        textTransform: "capitalize",
                                        width: "100%",
                                        marginTop: "1rem",
                                      }}
                                      onClick={handleSubmit}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </form>
                              </Box>
                            </Modal>
                          </div>
                        )}
                        {!apiRequestSuccess && <span>Login</span>}
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
