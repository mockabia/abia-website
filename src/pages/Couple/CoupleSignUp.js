import * as React from "react";
import "../Style/CoupleSignUp.css";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "react-select";
// import { ReactComponent as EngagedIcon } from "../../../icons/Couples/engaged.svg";
import { ReactComponent as EngagedIcon } from "../../icons/Couples/engaged.svg";
import { ReactComponent as PlanningIcon } from "../../icons/Couples/planning.svg";
import { ReactComponent as Planning2Icon } from "../../icons/Couples/bookVenue.svg";
import { ReactComponent as FormICon4 } from "../../icons/Couples/formIcon4.svg";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  DatePickerCouple,
  DatePickerPublic,
} from "../../components/DatepickerPublic";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import {
  StepperStyle,
  ButtonStyle,
  NextButtonStyle,
  LeftAlignedTypography,
  CheckBoxStyle,
  CSTextfield,
  CSmenuItemStyle,
} from "../../components/FormStyle";
import * as CoupleJS from "../Couple/Couple";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { TextFieldCustom } from "../../components/input fields/TextInputForm";

const steps = ["Let’s Begin", "The Basics", "Final Touches"];

const options = [
  {
    value: 0,
    label: "Recently engaged and starting from scratch.",
    icon: <PlanningIcon />,
  },
  {
    value: 1,
    label: "Searching for our perfect venue and more.",
    icon: <Planning2Icon />,
  },
  {
    value: 2,
    label: "Booked a venue and need to secure other services.",
    icon: <FormICon4 />,
  },
];

export default function CouplesSignUp() {
  const [formValues, setFormValues] = React.useState({
    bride_message: "",
    bride: "",
    groom: "",
    wedding_date: null,
    decision: false,
    wedding_state: "",
    email: "",
    password: "",
    marleting_category: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOption, setSelectedOption] = React.useState(null); //first page option
  const [location, setLocation] = React.useState([]);
  const [selectState, setSelectState] = React.useState();
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    CoupleJS.fetchState(setLocation);
  }, []);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (data) => {
    setFormValues({ ...formValues, ...data });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // console.log("Current form values:", { ...formValues, ...data });
  };

  const handleFormNext = () => {
    console.log("Inside handleFormNext");
    const validationErrors = validateForm();
    console.log("Validation Errors:", validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("No validation errors, proceeding...");
      setFormValues({ ...formValues });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log("Current form values:", {
        formValues,
      });
    } else {
      console.log("Validation errors found, not proceeding.");
      setErrors(validationErrors);
    }
  };
  const handleInputChange = (fieldName, value) => {
    if (fieldName === "decision") {
      setFormValues({ ...formValues, [fieldName]: !formValues.decision });
      setCheckboxChecked(!formValues.decision);
      console.log("Checkbox is ticked:", !formValues.decision);
    } else {
      setFormValues({ ...formValues, [fieldName]: value });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleDateChange = (fieldName, date) => {
    setFormValues({ ...formValues, [fieldName]: date });
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    const selectedOptionValue = options[index].value;
    setFormValues((prevValues) => ({
      ...prevValues,
      bride_message: selectedOptionValue,
    }));
    console.log(`Selected option: ${selectedOptionValue}`);
  };
  const handleClosePage = () => {
    window.history.back();
  };

  const validateForm = () => {
    const errors = {};
    if (activeStep === 1) {
      if (!formValues.bride) {
        errors.bride = "Full Name is required";
      }
      if (!formValues.groom) {
        errors.groom = "Partner's Name is required";
      }
      if (!formValues.wedding_date) {
        errors.wedding_date = "Date is required";
      }
      if (!formValues.wedding_state) {
        errors.wedding_state = "State is required";
      }
      // Add more validation rules as needed
    } else if (activeStep === 2) {
      if (!formValues.email) {
        // Validate Email
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        errors.email = "Invalid Email";
      }
      // Validate Password
      if (!formValues.password) {
        errors.password = "Password is required";
      } else if (formValues.password.length < 6) {
        errors.password = "Minimum 6 characters";
      }
    }

    return errors;
  };

  return (
    <div>
      <form>
        {/* Page One */}
        {activeStep === 0 && (
          <section className="couples-singup-container">
            <div className="couples-signup-image">
              <div className="cs-image-container-1 cs-image-container"></div>
            </div>

            <div className="cs-close-icon" onClick={handleClosePage}>
              <CloseIcon />
            </div>
            <Box
              component="form"
              sx={{ width: "100%" }}
              className="cs-signup-form"
            >
              <StepperStyle activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step sx={{ color: "red" }} key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </StepperStyle>

              <React.Fragment>
                <div>
                  <h1 className="cs-signup-header">
                    Congratulations! How can we help plan your big day?
                  </h1>
                </div>
                {/* Option buttons */}
                {/* 1 */}
                {options.map((option, index) => (
                  <div key={index}>
                    <ButtonStyle
                      variant="outlined"
                      startIcon={option.icon}
                      onClick={() => handleOptionClick(index)}
                    >
                      <LeftAlignedTypography>
                        {option.label}
                      </LeftAlignedTypography>
                    </ButtonStyle>
                  </div>
                ))}

                <br />
                {/* Next */}
                <NextButtonStyle
                  variant="outlined"
                  className="cs-button-text-position"
                  disabled={selectedOption === null}
                  onClick={handleNext}
                  style={{
                    backgroundColor:
                      selectedOption !== null ? "black" : "#b7b7b7",
                  }}
                >
                  <span className="cs-next-button">Next</span>
                </NextButtonStyle>
                <br />
                <div className="flex justify-center">
                  <h5 className="text-[12px]">
                    Already have an account?{" "}
                    <Link>
                      <span className="font-bold text-[#6cc2bc]">Log in</span>
                    </Link>
                  </h5>
                </div>

                <div className="flex justify-center mt-2">
                  <h5 className="text-[12px]">
                    By creating your ABIA's account you agree to our{" "}
                    <Link>
                      <span className="cs-text-highlight">Terms of use</span>
                    </Link>{" "}
                    and{" "}
                    <Link>
                      <span className="cs-text-highlight">Privacy policy</span>
                    </Link>
                    .
                  </h5>
                </div>
              </React.Fragment>
            </Box>
          </section>
        )}
        {/* Page Two */}
        {activeStep === 1 && (
          <section className="couples-singup-container">
            <div className="couples-signup-image">
              <div className="cs-image-container cs-image-container-2"></div>
            </div>
            <div className="cs-back-button" onClick={handleBack}>
              <ArrowBackIcon />
              <p className="text-[12px] text-black font-[800]">Back</p>
            </div>
            <div className="cs-close-icon" onClick={handleClosePage}>
              <CloseIcon />
            </div>
            <Box
              component="form"
              sx={{ width: "100%" }}
              className="cs-signup-form"
            >
              <StepperStyle activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </StepperStyle>

              <React.Fragment>
                {/* Option buttons */}
                {/* 1 */}
                <div>
                  <h1 className="cs-signup-header"> It’s nice to meet you. </h1>
                </div>
                <Box>
                  <Box className="cs-textfield-flex">
                    <CSTextfield
                      name="bride"
                      className="cs-textfield"
                      id="demo-helper-text-aligned"
                      label="Full Name*"
                      onChange={(e) =>
                        handleInputChange("bride", e.target.value)
                      }
                      error={errors.bride}
                    />
                    <CSTextfield
                      name="groom"
                      className="cs-textfield"
                      id="demo-helper-text-aligned"
                      label="Partner's Name*"
                      onChange={(e) =>
                        handleInputChange("groom", e.target.value)
                      }
                      error={errors.groom}
                    />
                  </Box>
                  <br />
                  <Box className="cs-textfield-flex">
                    <DatePickerCouple
                      name="wedding_date"
                      label="Preferred Wedding Date*"
                      dateError={errors.wedding_date}
                      handleDateChange={handleInputChange}
                      checkboxChecked={checkboxChecked}
                      // disabled={formValues.decision}
                    />
                    <FormControlLabel
                      value="end"
                      control={
                        <CheckBoxStyle
                          name="decision"
                          inputProps={{ "aria-label": "controlled" }}
                          sx={{
                            "&.Mui-checked": {
                              color: "#0e0e0e",
                            },
                          }}
                        />
                      }
                      label={
                        <span style={{ fontFamily: "raleway" }}>
                          We're still deciding
                        </span>
                      }
                      labelPlacement="end"
                    />
                  </Box>
                  <br />
                  <Box>
                    <CSTextfield
                      name="wedding_state"
                      select
                      className="cs-textfield-2"
                      label="Wedding State*"
                      id="reddit-input"
                      SelectProps={{ IconComponent: () => null }}
                      onChange={(e) =>
                        handleInputChange("wedding_state", e.target.value)
                      }
                      value={formValues.wedding_state}
                      error={errors.wedding_state}
                    >
                      {location.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          style={CSmenuItemStyle}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </CSTextfield>
                  </Box>
                  <br />

                  <br />
                  {/* Next */}
                  <NextButtonStyle
                    variant="outlined"
                    className="cs-button-text-position"
                    disabled={selectedOption === null}
                    onClick={handleFormNext}
                    style={{
                      backgroundColor:
                        selectedOption !== null ? "black" : "#b7b7b7",
                    }}
                  >
                    <span className="cs-next-button">Next</span>
                  </NextButtonStyle>
                  <br />
                  <div className="flex justify-center">
                    <h5 className="text-[12px]">
                      Already have an account?{" "}
                      <Link>
                        <span className="font-bold text-[#6cc2bc]">Log in</span>
                      </Link>
                    </h5>
                  </div>
                  <div className="flex justify-center mt-1">
                    <h5 className="text-[12px]">
                      By creating your ABIA's account you agree to our{" "}
                      <Link>
                        <span className="cs-text-highlight">Terms of use</span>
                      </Link>{" "}
                      and{" "}
                      <Link>
                        <span className="cs-text-highlight">
                          Privacy policy
                        </span>
                      </Link>
                      .
                      {/* <Link>
                        <span className="font-bold text-[#6cc2bc]">Log in</span>
                      </Link> */}
                    </h5>
                  </div>
                </Box>
              </React.Fragment>
            </Box>
          </section>
        )}
        {/* Page Three */}
        {activeStep === 2 && (
          <section className="couples-singup-container">
            <div className="couples-signup-image">
              <div className="cs-image-container cs-image-container-3"></div>
            </div>
            <div className="cs-back-button" onClick={handleBack}>
              <ArrowBackIcon />
              <p className="text-[12px] text-black font-[800]">Back</p>
            </div>
            <div className="cs-close-icon" onClick={handleClosePage}>
              <CloseIcon />
            </div>

            <Box
              component="form"
              sx={{ width: "100%" }}
              className="cs-signup-form"
            >
              <StepperStyle activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </StepperStyle>

              <React.Fragment>
                {/* Option buttons */}
                {/* 1 */}
                <div>
                  <h1 className="cs-signup-header">
                    Let’s save your details for next time!
                  </h1>
                </div>
                <Stack spacing={3}>
                  <CSTextfield
                    name="email"
                    type="email"
                    className="cs-textfield-2"
                    id="demo-helper-text-aligned"
                    label="Email*"
                    onChange={(e) => handleInputChange("bride", e.target.value)}
                    error={errors.email}
                    helperText={errors.email}
                  />
                  <CSTextfield
                    name="password"
                    type="password"
                    className="cs-textfield-2"
                    id="demo-helper-text-aligned"
                    label="Password*"
                    onChange={(e) => handleInputChange("bride", e.target.value)}
                    error={errors.password}
                    helperText={errors.password}
                  />

                  {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      fontSize={12}
                      sx={{
                        marginRight: "1rem",
                        fontFamily: "Raleway",
                      }}
                    >
                      All fields required
                    </Typography>
                  </Box> */}
                  {/* Next */}
                  <NextButtonStyle
                    variant="outlined"
                    className="cs-button-text-position"
                    disabled={selectedOption === null}
                    onClick={handleFormNext}
                    style={{
                      backgroundColor: "black",
                    }}
                  >
                    <span className="cs-next-button">Submit</span>
                  </NextButtonStyle>
                </Stack>
                <br />
                {/* Terms and Policies */}
                <div className="mt-2">
                  <div className="flex justify-center ">
                    <h5 className="text-[12px]">
                      Already have an account?{" "}
                      <Link>
                        <span className="font-bold text-[#6cc2bc]">Log in</span>
                      </Link>
                    </h5>
                  </div>

                  <div className="flex justify-center mt-2">
                    <h5 className="text-[12px]">
                      By creating your ABIA's account you agree to our{" "}
                      <Link>
                        <span className="cs-text-highlight">Terms of use</span>
                      </Link>{" "}
                      and{" "}
                      <Link>
                        <span className="cs-text-highlight">
                          Privacy policy
                        </span>
                      </Link>
                    </h5>
                  </div>
                </div>
              </React.Fragment>
            </Box>
          </section>
        )}
        {/* Marketing Category */}
        {activeStep === 3 && (
          <section className="couples-singup-container">
            <div className="couples-signup-image">
              <div className="cs-image-container cs-image-container-3"></div>
            </div>
            <div className="cs-back-button" onClick={handleBack}>
              <ArrowBackIcon />
              <p className="text-[12px] text-black font-[800]">Back</p>
            </div>
            <div className="cs-close-icon" onClick={handleClosePage}>
              <CloseIcon />
            </div>

            <Box
              component="form"
              sx={{ width: "100%" }}
              className="cs-signup-form"
            >
              <StepperStyle activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </StepperStyle>

              <React.Fragment>
                {/* Option buttons */}
                {/* 1 */}
                <div>
                  <h1 className="cs-signup-header">
                    Help us build our dream wedding team.
                  </h1>
                </div>
                <Stack spacing={3}>
                  {/* <Box> */}
                  <FormGroup
                    sx={{
                      width: {
                        xs: "100%",
                        md: "31rem",
                      },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                        direction="column"
                      >
                        <FormControlLabel
                          // required
                          control={<Checkbox />}
                          label={
                            <Typography sx={{ whiteSpace: "normal" }}>
                              This is the list of the Categories
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                      </Grid>

                      {/* Second Column */}
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="Required"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                  {/* </Box> */}
                  {/* Next */}
                  <NextButtonStyle
                    variant="outlined"
                    className="cs-button-text-position"
                    style={{
                      backgroundColor: "black",
                    }}
                  >
                    <span className="cs-next-button">Submit</span>
                  </NextButtonStyle>
                </Stack>
                <br />
                {/* Terms and Policies */}
                <div className="mt-2">
                  <div className="flex justify-center ">
                    <h5 className="text-[12px]">
                      Already have an account?{" "}
                      <Link>
                        <span className="font-bold text-[#6cc2bc]">Log in</span>
                      </Link>
                    </h5>
                  </div>

                  <div className="flex justify-center mt-2">
                    <h5 className="text-[12px]">
                      By creating your ABIA's account you agree to our{" "}
                      <Link>
                        <span className="cs-text-highlight">Terms of use</span>
                      </Link>{" "}
                      and{" "}
                      <Link>
                        <span className="cs-text-highlight">
                          Privacy policy
                        </span>
                      </Link>
                    </h5>
                  </div>
                </div>
              </React.Fragment>
            </Box>
          </section>
        )}
      </form>
    </div>
  );
}
