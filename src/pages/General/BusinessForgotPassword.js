import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import { ForgetBox } from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import { Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import * as apiurls from "../../api/apiUrls";
import * as GeneralJS from "./General";

const ForgetPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseEmail, setResponseEmail] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setInputs({});
    setInputsErrors({});
  };

  const handleChange = (e) => {
    GeneralJS.handleChange(e, setInputs, setInputsErrors);
  };

  const validateForgotEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const { email } = inputs; // extract'email' from the Inputs
    if (!email) {
      setErrors({ email: "Email is Required" });
    } else if (!validateForgotEmail(email)) {
      setErrors({ email: "Invalid Email address" });
    } else {
      try {
        const response = await axios.post(apiurls.BUSINESS_API.FORGOT, {
          email: email,
        });
        if (response.status === 200) {
          console.log("Password reset successful:", response.data);
          setResponseMessage("Password reset successful:", response.data);

          setResponseEmail(email);
          // setOpen(false);
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
    <div className="-mt-[12px]">
      <div onClick={handleOpen}>
        <span>forgot ?</span>
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
          {isSubmitted && responseMessage ? (
            <div>
              <h3 className="flex justify-center items-center">Success!</h3>
              <p className="flex flex-col justify-start md:justify-center items-center">
                <h4>{responseMessage}</h4>
                <p>
                  Please check your email:{" "}
                  <span style={{ color: "#6cc2bc", fontWeight: "600" }}>
                    {responseEmail}
                  </span>
                </p>
              </p>
            </div>
          ) : (
            <form>
              <h3 className="flex justify-center">Forgot Password. ?</h3>
              <p className="flex justify-center">
                You can reset your password here.
              </p>
              <div className="mt-[1rem]">
                <TextField
                  label="Enter your Email"
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  error={inputsErrors.email ? true : false}
                  helperText={inputsErrors.password}
                  sx={{ width: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserIcons
                          fill="#949494"
                          style={{
                            width: "18px",
                            height: "18px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
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
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
