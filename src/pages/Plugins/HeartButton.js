import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Stack,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import {
  StyledHeartIcon,
  BoxStyle,
  RedditTextField,
  HeartIconTextField,
  SelectTextField,
} from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import CheckBoxMui from "../../components/CheckBoxMui";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import { GoPeople } from "react-icons/go";
import { ReactComponent as EmailIcon } from "../../icons/email copy.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { ReactComponent as PhoneIcon } from "../../icons/Phone-14.svg";
import * as servicesPage from "../../services/vendor/signupPageService";

const HeartButton = ({ locationOptions }) => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCheckBoxChange = (event) => {
    const isChecked = event.target.checked;
    alert(isChecked ? "checked!" : "unchecked");
  };

  return (
    <div className="heartbutton-div" onClick={handleOpen}>
      <StyledHeartIcon className="heart-icon " />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={BoxStyle}
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
          <form noValidate>
            <h3 className="form-header">Create a free account.</h3>
            <div>
              <Stack spacing={2}>
                {/* Name */}
                <HeartIconTextField
                  label="Name and Surname"
                  id="reddit-input"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
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
                {/* Partner's Name */}
                <HeartIconTextField
                  label="Partner's Name*"
                  id="reddit-input"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <GoPeople
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#949494",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Email */}
                <HeartIconTextField
                  label="Email*"
                  id="reddit-input"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon
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
                {/* Password */}
                <HeartIconTextField
                  label="Password*"
                  id="reddit-input"
                  type="password"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <VisibilityIcon
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
                {/* <div style={{ display: "flex" }}> */}
                {/* <Box display="flex" gap="10px"> */}
                {/* Your State* */}
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  <SelectTextField
                    select
                    label="Your State*"
                    id="reddit-input"
                    variant="filled"
                    SelectProps={{ IconComponent: () => null }}
                  >
                    {locationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                  {/* Phone */}
                  <RedditTextField
                    type="tel"
                    label="Phone"
                    id="reddit-input"
                    variant="filled"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhoneIcon
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
                </Stack>

                {/* </Box> */}

                {/* </div> */}
                {/* Checkbox */}
                <div className="flex justify-start items-center">
                  <CheckBoxMui onChange={handleCheckBoxChange} />
                  <p className="text-[10px]">
                    I accept ABIA Weddings Australia's Terms of Use and PRivacy
                    Policy
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#6cc2bc",
                    color: "#ffffff",
                    height: "40px",
                    textTransform: "capitalize",
                  }}
                >
                  Submit
                </Button>
                <div className="flex justify-center">
                  <h5 className="font-bold">
                    Already have an account?{" "}
                    <Link>
                      <span className="font-bold text-[#6cc2bc]">Log in</span>
                    </Link>
                  </h5>
                </div>
              </Stack>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default HeartButton;
