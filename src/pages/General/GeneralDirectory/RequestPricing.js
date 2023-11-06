import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "../../Style/GeneralDirectory.css";

import {
  Box,
  Stack,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import {
  BoxStyle,
  RedditTextField,
  MultiTLinedTextField,
  ColorSubmitButton,
  SelectTextField,
  ServiceTextField,
} from "../../../components/FormStyle";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { ReactComponent as PhoneIcon } from "../../../icons/Phone-14.svg";
import { ReactComponent as EmailIcon } from "../../../icons/email copy.svg";
import { ReactComponent as UserIcons } from "../../../icons/contact topbar.svg";
import { DatePickerPublic } from "../../../components/DatepickerPublic";

const RequestPricing = ({ business, locationOptions, servicesOptions }) => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  const businessCaps = business.toUpperCase();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("Modal closed");
    setOpen(!open);
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

  return (
    <div>
      <div className="request-pricing relative" onClick={handleOpen}>
        <Button
          variant="contained"
          sx={{
            boxShadow: "none",
            backgroundColor: "black",
            textTransform: "initial",
            borderRadius: "5px",
            width: "82vw",
            height: "45px",
            "&:hover": {
              backgroundColor: "#6cc2bc",
              boxShadow: "none",
            },
          }}
        >
          Request Pricing
        </Button>
      </div>
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
            <Stack>
              <Stack spacing={1}>
                <h5>{businessCaps}</h5>
                <h3 className="r">Send Enquriy on Request Pricing</h3>

                <MultiTLinedTextField
                  id="filled-multiline-static"
                  label="MESSAGE"
                  multiline
                  rows={3}
                  variant="filled"
                />
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  {/*Name and Sruname */}
                  <RedditTextField
                    label="Name & Surname"
                    id="reddit-input"
                    variant="filled"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <UserIcons
                            fill="#949494"
                            style={{
                              // visibility: "hidden",
                              width: "18px",
                              height: "18px",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Email */}
                  <RedditTextField
                    label="Email*"
                    id="reddit-input"
                    variant="filled"
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
                </Stack>
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  {/* Phone */}
                  <RedditTextField
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
                  {/* Wedding Location */}
                  <SelectTextField
                    id="filled-select-location"
                    select
                    label="Wedding Location*"
                    variant="filled"
                    SelectProps={{ IconComponent: () => null }}
                  >
                    {locationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Stack>

                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  {/* Wedding Date */}
                  <DatePickerPublic />
                  {/* Select Services */}
                  <SelectTextField
                    id="filled-select-services"
                    select
                    label="Select Service"
                    variant="filled"
                    SelectProps={{ IconComponent: () => null }}
                  >
                    {servicesOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Stack>
              </Stack>
              <Stack>
                <ColorSubmitButton
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ marginTop: "30px" }}
                >
                  Send
                </ColorSubmitButton>
              </Stack>
            </Stack>
            <Box height="50px"></Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestPricing;
