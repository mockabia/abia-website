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
  const [isOptionSelected, setIsOptionSelected] = React.useState(false);
  const [location, setLocation] = React.useState([]);
  // const [selectState, setSelectState] = React.useState();
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [marketingOptions, setMarketingOptions] = React.useState([]);
  const [marketingSelect, setMarketingSelect] = React.useState([]);

  console.log(marketingSelect);

  useEffect(() => {
    CoupleJS.fetchState(setLocation);
    CoupleJS.fetchMarketingCategory(setMarketingOptions);
    // setIsOptionSelected(true);
  }, []);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      setIsOptionSelected(false);
    } else {
      setIsOptionSelected(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFormNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormValues({ ...formValues });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log("Current form values:", {
        formValues,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "decision") {
      setFormValues({ ...formValues, [fieldName]: !formValues.decision });
      setCheckboxChecked(!formValues.decision);
      console.log("Checkbox is ticked:", checkboxChecked);
    } else {
      setFormValues({ ...formValues, [fieldName]: value });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  // const handleDateChange = (fieldName, date) => {
  //   setFormValues({ ...formValues, [fieldName]: date });
  //   setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setIsOptionSelected(true);
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
  const sampleData = [
    "Category 1",
    "Required 1",
    "Required 2",
    "Required 3",
    "Required 4",
    "Required 5",
    "Required 6",
    "Required 7",
    "Required 8",
    "Required 9",
    "Required 10",
    "Required 11",
  ];

  const handleMarketingChange = (e) => {
    const index = marketingSelect.indexOf(e.target.value);
    if (index === -1) {
      setMarketingSelect([...marketingSelect, e.target.value]);
    } else {
      setMarketingSelect(
        marketingSelect.filter((category) => category !== e.target.value)
      );
    }
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

                {isOptionSelected === false && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    Please select an option
                  </Typography>
                )}
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
                    {!checkboxChecked && (
                      <DatePickerCouple
                        name="wedding_date"
                        label="Preferred Wedding Date*"
                        dateError={errors.wedding_date}
                        handleDateChange={handleInputChange}
                        checkboxChecked={checkboxChecked}
                        // disabled={formValues.decision}
                      />
                    )}

                    <FormControlLabel
                      value="end"
                      control={
                        <CheckBoxStyle
                          name="decision"
                          checked={formValues.decision}
                          onChange={(e) =>
                            handleInputChange("decision", e.target.checked)
                          }
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    helperText={errors.email}
                  />
                  <CSTextfield
                    name="password"
                    type="password"
                    className="cs-textfield-2"
                    id="demo-helper-text-aligned"
                    label="Password*"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
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
                      {marketingOptions.map((option, index) => (
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                          key={index}
                          direction="column"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={option.value}
                                label={option.label}
                                checked={marketingSelect.includes("value")}
                                onChange={handleMarketingChange}
                              />
                            }
                            label={
                              <Typography sx={{ whiteSpace: "normal" }}>
                                {index === 0
                                  ? option.label
                                  : `Required ${index}`}
                              </Typography>
                            }
                          />
                        </Grid>
                      ))}
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
