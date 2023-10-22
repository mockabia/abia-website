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

const ForgetPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState({ userEmail: "" });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    // console.log("Modal closed");
    setOpen(false);
  };

  const validateForgotEmail = (userEmail) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userEmail).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!userEmail) {
      setErrors({ userEmail: "Email is Required" });
    } else if (!validateForgotEmail(userEmail)) {
      setErrors({ userEmail: "Invalid Email address" });
    } else {
      try {
        const response = await axios.post(apiurls.BUSINESS_FORGOT, {
          useremail: userEmail,
        });
        if (response.status === 200) {
          console.log("Password reset successful:", response.data);
        } else {
          console.log(
            "Failed to reset password. Status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <span>forgot password?</span>
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
            <h3 className="form-header">Forgot Password. ?</h3>
            <p className="flex justify-center">
              You can reset your password here.
            </p>
            <div className="mt-[1rem]">
              <TextField
                label="Enter your Email"
                id="email"
                name="email"
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
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setErrors({ userEmail: "" }); // Clear the error when the input changes
                }}
                error={!!errors.userEmail} // Set error state to display the helper text
                helperText={errors.userEmail} // Display the helper text
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
  );
};

export default ForgetPassword;
