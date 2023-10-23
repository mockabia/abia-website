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

const LoginStateDetail = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    // preventDefault(e);
  };

  return (
    <div>
      <div onClick={handleOpen}>
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
              <h3 className="form-header">Welcome ?</h3>
              <p className="flex justify-center">
                If you have Business in more than 1 state. Select the states
                below. Else proceed
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
    </div>
  );
};

export default LoginStateDetail;
