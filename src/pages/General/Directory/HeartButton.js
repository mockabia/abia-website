import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {Box,Stack,Button,IconButton,InputAdornment,MenuItem,} from "@mui/material";
import {StyledHeartIcon,BoxStyle,RedditTextField,HeartIconTextField,SelectTextField,} from "../../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import CheckBoxMui from "../../../components/CheckBoxMui";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcons } from "../../../icons/contact topbar.svg";
import { GoPeople } from "react-icons/go";
import { ReactComponent as EmailIcon } from "../../../icons/email copy.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ReactComponent as PhoneIcon } from "../../../icons/Phone-14.svg";
import * as GeneralJS from "../General";

const HeartButton = (props) => {

  const stateOptions                          = props.stateOptions;
  const [open, setOpen]                       = React.useState(false);
  const [isMobile, setIsMobile]               = useState(window.innerWidth <= 550);
  const [errors, setErrors]                   = React.useState({});
  const [formvalues, setFormvalues]           = useState({});

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
  };
  const handleInputChangeVal = (name, value) => {
    GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
  };
  useEffect(() => {
    setFormvalues(values => ({...values,['vid']: props.vid }))
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSubmit = () => {
    GeneralJS.saveFavourite(formvalues,setErrors,setOpen);
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
                <HeartIconTextField
                  label="Name and Surname"
                  id="reddit-input"
                  variant="filled"
                  name="full_name"
                  style={{ marginTop: 11 }}
                  onChange={(e) =>
                    handleInputChange(e)
                  }
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
                <HeartIconTextField
                  label="Partner's Name*"
                  id="reddit-input"
                  variant="filled"
                  name="groom"
                  style={{ marginTop: 11 }}
                  onChange={(e) =>
                    handleInputChange(e)
                  }
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
                <HeartIconTextField
                  label="Email*"
                  id="reddit-input"
                  variant="filled"
                  name="email"
                  style={{ marginTop: 11 }}
                  onChange={(e) =>
                    handleInputChange(e)
                  }
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
                <HeartIconTextField
                  label="Password*"
                  id="reddit-input"
                  type="text"
                  variant="filled"
                  name="password"
                  style={{ marginTop: 11 }}
                  onChange={(e) =>
                    handleInputChange(e)
                  }
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
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  <SelectTextField
                    select
                    name="state"
                    label="Your State*"
                    id="reddit-input"
                    variant="filled"
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                    SelectProps={{ IconComponent: () => null }}
                  >
                    {stateOptions.length>0 && stateOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.state}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                  {/* Phone */}
                  <RedditTextField
                    type="tel"
                    name="phone"
                    label="Phone"
                    id="reddit-input"
                    variant="filled"
                    onChange={(e) =>
                      handleInputChange(e)
                    }
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
                <div className="flex justify-start items-center">
                  <CheckBoxMui />
                  <p className="text-[10px]">
                    I accept ABIA Weddings Australia's Terms of Use and PRivacy
                    Policy
                  </p>
                </div>

                <Button
                  type="button"
                  variant="contained"
                  onClick={handleSubmit}
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
