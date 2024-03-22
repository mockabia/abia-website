import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import {
  CoupleCommonInput,
  ForgetBox,
  VendorLoginButton,
} from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import * as apiurls from "../../api/apiUrls";
import * as CoupleJS from "./Couple";

export const MAIN_API = apiurls.BUSINESS_API;

const CoupleForgotPwd = () => {
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [inputsErrors, setInputsErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseEmail, setResponseEmail] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setInputs({
      email: "",
    });
    setInputsErrors({});
    setErrors({});
    setIsSubmitted(false);
    setResponseMessage("");
    setResponseEmail("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    // Clear the error for email field when a valid email is provided
    if (name === "email" && errors.email && validateForgotEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
    setInputsErrors({});
  };

  const validateForgotEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const { email } = inputs;
    if (!email) {
      setErrors({ email: "Email is required" });
    } else if (!validateForgotEmail(email)) {
      setErrors({ email: "Invalid email address" });
    } else {
      try {
        const response = await axios.post(apiurls.COUPLE_API.FORGOT, {
          email: email,
        });
        if (response.status === 200) {
          console.log("Password reset successful:", response.data);
          setResponseMessage("Password reset successful:", response.data);
          setResponseEmail(email);
        } else {
          setResponseMessage(
            "Failed to reset password. Status code:",
            response.status
          );
          console.log(
            "Failed to reset password. Status code:",
            response.status
          );
        }
      } catch (error) {
        setResponseMessage("Error resetting password:", error);
        console.error("Error resetting password:", error);
      }
    }
  };

  return (
    <div className="-mt-[14px]">
      <div onClick={handleOpen}>
        <span className="text-[14px] font-semibold cursor-pointer">
          forgot ?
        </span>
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
                e.stopPropagation();
                handleClose();
              }}
            >
              <AiOutlineClose />
            </IconButton>
          </Box>
          {isSubmitted && responseMessage ? (
            <div>
              <h3 className="flex justify-center items-center mb-[0.5rem]">
                Success!
              </h3>
              <p className="flex flex-col justify-start md:justify-center items-center gap-[0.5rem]">
                <h4>{responseMessage}</h4>
                <p className="text-center">
                  Please check your email:{" "}
                  <span style={{ color: "#6cc2bc", fontWeight: "600" }}>
                    {responseEmail}
                  </span>
                </p>
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-[1rem] lg:w-[22rem]">
              <h3 className="form-header">Forgot Password ?</h3>
              <div className="flex flex-col gap-[1rem] mt-[1rem]">
                <CoupleCommonInput
                  placeholder="Enter your Email"
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  error={inputsErrors.email ? true : false}
                  helperText={inputsErrors.password}
                  sx={{ width: "100%" }}
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
                {errors.email && (
                  <div className="flex font-bold text-red-600 text-[12px] mb-2">
                    {errors.email}
                  </div>
                )}
                <div>
                  <VendorLoginButton onClick={handleSubmit}>
                    Submit
                  </VendorLoginButton>
                </div>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CoupleForgotPwd;
