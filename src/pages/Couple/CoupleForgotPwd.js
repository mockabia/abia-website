import {Box,Button,IconButton,InputAdornment,Modal,TextField,} from "@mui/material";
import React from "react";
import { CoupleCommonInput, ForgetBox } from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import { Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import * as apiurls from "../../api/apiUrls";
import * as CoupleJS from "./Couple";
export const MAIN_API = apiurls.BUSINESS_API;

const CoupleForgotPwd = () => {
  const [open, setOpen]             = React.useState(false);
  const [username, setUsername]     = useState("");
  const [emailError, setEmailError] = useState("");
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors]         = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };
  const handleSubmit = async () => {
    CoupleJS.coupleForgot(formValues, setErrors,setOpen)
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <span className="text-[14px] font-semibold cursor-pointer">
          Forgot Password ?
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
                e.stopPropagation(); // Stop the event propagation
                handleClose();
              }}
            >
              <AiOutlineClose />
            </IconButton>
          </Box>
          <form>
            <h3 className="form-header">Forgot Password ?</h3>
            {/* <p className="flex justify-center">
              You can reset your password here.
            </p> */}
            <div className="mt-[1rem]">
              <label>Enter your Valid Email</label>
              <CoupleCommonInput
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
                onChange={(e) =>
                  handleInputChange(e)
                }
                error={!!errors.email}
                helperText={errors.email}
              />
              {typeof errors != 'object' && errors !== null ? (
                  <div className="flex font-bold text-red-600 text-[12px] mb-2">
                    <span dangerouslySetInnerHTML={{ __html: errors }} ></span>
                  </div>
                ) :''}
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

export default CoupleForgotPwd;
