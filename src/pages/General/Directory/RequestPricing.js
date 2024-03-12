import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "../../Style/GeneralDirectory.css";

import {Box,Stack,Button,InputAdornment,IconButton,MenuItem,} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import {BoxStyle,RedditTextField,MultiTLinedTextField,ColorSubmitButton,SelectTextField,} from "../../../components/FormStyle";
import { ReactComponent as PhoneIcon } from "../../../icons/Phone-14.svg";
import { ReactComponent as EmailIcon } from "../../../icons/email copy.svg";
import { ReactComponent as UserIcons } from "../../../icons/contact topbar.svg";
import Typography from "@mui/material/Typography";
import { DatePickerPublic } from "../../../components/DatepickerPublic";
import * as GeneralJS from "../General";

const RequestPricing = (props) => {
  const [open, setOpen]                         = React.useState(false);
  const [isMobile, setIsMobile]                 = useState(window.innerWidth <= 550);
  const stateOptions                            = props.stateOptions;
  const [servicesOptions, setServicesOptions]   = useState([]);

  const businessCaps = props.vname.toUpperCase();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("Modal closed");
    setOpen(!open);
  };

  useEffect(() => {
    GeneralJS.fetchVendorCategory(props.vid,setServicesOptions);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const CoupleEnquiry = () => {
    const [errors, setErrors]                     = React.useState({});
    const [formvalues, setFormvalues]             = useState({});

    useEffect(() => {
      setFormvalues(values => ({...values,['vid']: props.vid }))
      let ctoken = localStorage.getItem("coupleToken");
      if (ctoken !== undefined && ctoken !== "undefined" && ctoken !== null) {
        ctoken = JSON.parse(ctoken);
        let userSession = ctoken && ctoken.user ? ctoken.user : null;
        setFormvalues(values => ({...values,['date_of_wedding']: userSession.date_of_wedding,['phone']: userSession.phone }))
      }
    }, []);

    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
    };
    const handleInputChangeVal = (name, value) => {
      GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
    };
    const handleSubmit = () => {
      GeneralJS.saveEnquiry(formvalues,setErrors,setOpen);
    };
    return (
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

                {/* <pre>{JSON.stringify(formvalues, null, 2)}</pre> */}
                <MultiTLinedTextField
                  id="filled-multiline-static"
                  name="message"
                  label="MESSAGE"
                  multiline
                  rows={3}
                  variant="filled"
                  onChange={(e) =>
                    handleInputChange(e)
                  }
                />
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  <RedditTextField
                      label="Phone"
                      name="phone"
                      id="reddit-input"
                      variant="filled"
                      value={formvalues.phone}
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
                    {errors.phone !='' && (
                      <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                        {errors.phone}
                      </Typography>
                    )}
                  
                  {/* Wedding Budget */}
                  <RedditTextField
                    label="Budget"
                    name="budget"
                    id="reddit-input"
                    variant="filled"
                    value={formvalues.budget}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                </Stack>
                <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                  <DatePickerPublic name="date_of_wedding" 
                    value={formvalues.budget} onChange={handleInputChangeVal} />
                    {errors.date_of_wedding !='' && (
                      <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                        {errors.date_of_wedding}
                      </Typography>
                    )}
                </Stack>
              </Stack>
              <Stack>
                <ColorSubmitButton
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
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
    )
  }
  const PublicEnquiry = () => {
    const [errors, setErrors]                     = React.useState({});
    const [formvalues, setFormvalues]             = useState({});

    useEffect(() => {
      setFormvalues(values => ({...values,['vid']: props.vid }))
    }, []);
    
    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
    };
    const handleInputChangeVal = (name, value) => {
      GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
    };
    const handleSubmit = () => {
      GeneralJS.saveEnquiry(formvalues,setErrors,setOpen);
    };
    return (
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

                {/* <pre>{JSON.stringify(formvalues, null, 2)}</pre> */}
                <MultiTLinedTextField
                  id="filled-multiline-static"
                  name="message"
                  label="MESSAGE"
                  multiline
                  rows={3}
                  variant="filled"
                  onChange={(e) =>
                    handleInputChange(e)
                  }
                />
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  {/*Name and Sruname */}
                  <RedditTextField
                    label="Name & Surname"
                    name="bride"
                    id="reddit-input"
                    variant="filled"
                    onChange={(e) =>
                      handleInputChange(e)
                    }
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
                  {errors.bride !='' && (
                    <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                      {errors.bride}
                    </Typography>
                  )}
                  {/* Email */}
                  <RedditTextField
                    label="Email*"
                    name="email"
                    id="reddit-input"
                    variant="filled"
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
                  {errors.email !='' && (
                    <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                      {errors.email}
                    </Typography>
                  )}
                </Stack>
                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  {/* Phone */}
                  <RedditTextField
                    label="Phone"
                    name="phone"
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
                  {errors.phone !='' && (
                    <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                      {errors.phone}
                    </Typography>
                  )}
                  {/* Wedding Location */}
                  <SelectTextField
                    id="filled-select-location"
                    name="state"
                    select
                    label="Wedding Location*"
                    variant="filled"
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                    SelectProps={{ IconComponent: () => null }}
                  >
                    {stateOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.state}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                {errors.state !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.state}
                  </Typography>
                )}
                </Stack>

                <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                  {/* Wedding Date */}
                  <DatePickerPublic name="date_of_wedding"
                  onChange={handleInputChangeVal}
                  />
                  {errors.date_of_wedding !='' && (
                    <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                      {errors.date_of_wedding}
                    </Typography>
                  )}
                  {/* Select Services */}
                  <SelectTextField
                    id="filled-select-services"
                    name="category"
                    select
                    label="Wedding Service*"
                    variant="filled"
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                    SelectProps={{ IconComponent: () => null }}
                  >
                    {servicesOptions?.map((option) => {
                        return (<MenuItem key={option.id} value={option.id}>
                          {option.title}
                        </MenuItem>)
                    })}
                  </SelectTextField>
                {errors.category !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.category}
                  </Typography>
                )}
                </Stack>
              </Stack>
              <Stack>
                <ColorSubmitButton
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
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
    )
  }
  return (
    <div>
      <div className="request-pricing relative" onClick={handleOpen}>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Manrope",
            fontWeight: "600",
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
        {localStorage.getItem("coupleToken") ? (
          <CoupleEnquiry />
        ) : (
          <PublicEnquiry />
        )}
    </div>
  );
};

export default RequestPricing;
