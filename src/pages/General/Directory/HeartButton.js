import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {Box,Stack,Button,IconButton,InputAdornment,MenuItem,} from "@mui/material";
import {StyledHeartIcon,BoxStyle,RedditTextField,HeartIconTextField,SelectTextField,} from "../../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import Typography from "@mui/material/Typography";
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
  const saveFavourite = () => {
    GeneralJS.saveFavourite(formvalues,setErrors,setOpen);
  };

  const PublicHeart = () => {
    
    const [errors, setErrors]                   = React.useState({});
    const [formvalues, setFormvalues]           = useState({});
    const [passwordType, setPasswordType]       = useState("text");

    useEffect(() => {
      setFormvalues(values => ({...values,['vid']: props.vid }))
    }, []);
    
    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if(name=='password'){
        setPasswordType("password")
      }else{
        setPasswordType("text")
      }
      GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
    };
    const handleInputChangeVal = (name, value) => {
      GeneralJS.customJS.handleChange(name, value, setFormvalues, setErrors)
    };
    const handleSubmit = () => {
      GeneralJS.saveFavourite(formvalues,setErrors,setOpen);
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
            <h3 className="form-header">Create a free account.</h3>
            <div>
              <Stack spacing={2}>
                <HeartIconTextField
                  label="Name and Surname"
                  id="reddit-input"
                  variant="filled"
                  name="bride"
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
                {errors.bride !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.bride}
                  </Typography>
                )}
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
                {errors.groom !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.groom}
                  </Typography>
                )}
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
                {errors.email !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.email}
                  </Typography>
                )}
                <HeartIconTextField
                  label="Password*"
                  id="reddit-input"
                  variant="filled"
                  name="password"
                  style={{ marginTop: 11 }}
                  type={passwordType}
                  //onKeyUp={handleKeyPress}
                  //onKeyDown={handleKeyPress}
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
                {errors.password !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.password}
                  </Typography>
                )}
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
                {errors.state !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.state}
                  </Typography>
                )}
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
                  {errors.phone !='' && (
                    <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                      {errors.phone}
                    </Typography>
                  )}
                </Stack>
                <div className="flex justify-start items-center">
                  <CheckBoxMui name="agree" onChange={handleInputChangeVal}/>
                {errors.agree !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.agree}
                  </Typography>
                )}
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
                    <Link to={window.CLOGIN}>
                      <span className="font-bold text-[#6cc2bc]">Log in</span>
                    </Link>
                  </h5>
                </div>
              </Stack>
            </div>
          </form>
        </Box>
      </Modal>
    )
  }

  return (
    <>
    {localStorage.getItem("coupleToken") ? (
      <div className="heartbutton-div" onClick={saveFavourite}>
        <StyledHeartIcon className="heart-icon " />
      </div>
    ) : (
      <div className="heartbutton-div" onClick={handleOpen}>
        <StyledHeartIcon className="heart-icon " />
        <PublicHeart />
      </div>
    )}
    </>
  );
};

export default HeartButton;
