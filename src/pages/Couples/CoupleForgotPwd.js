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
export const MAIN_API       = apiurls.BUSINESS_API;

const CoupleForgotPwd = () => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    // console.log("Modal closed");
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(MAIN_API['FORGOT'], {
        username: username,
      });
      if (response.status === 200) {
        console.log("Password reset successful:", response.data);
      } else {
        console.log("Failed to reset password. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <span className="text-[14px] font-semibold cursor-pointer">Forgot Password ?</span>
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
                label="Enter your Username"
                id="username"
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

export default CoupleForgotPwd;

// export default CoupleForgotPwd
