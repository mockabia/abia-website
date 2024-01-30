import * as React from "react";
import "../Style/CoupleSignUp.css";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { ReactComponent as PlanningIcon } from "../../icons/Couples/planning.svg";
import { ReactComponent as Planning2Icon } from "../../icons/Couples/bookVenue.svg";
import { ReactComponent as FormICon4 } from "../../icons/Couples/formIcon4.svg";
import CloseIcon from "@mui/icons-material/Close";

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
  CoupleCommonInput,
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
    marleting_category: [],
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOption, setSelectedOption] = React.useState(null); //first page option
  const [isOptionSelected, setIsOptionSelected] = React.useState(true);
  const [location, setLocation] = React.useState([]);
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
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        bride_message: selectedOption,
      }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log("Current form values:", {
        formValues,
      });
    }
  };

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "decision") {
      setFormValues({ ...formValues, [fieldName]: !formValues.decision });
      setCheckboxChecked(!formValues.decision);
      console.log("Checkbox is ticked:", checkboxChecked);
      if (!formValues.decision) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          wedding_date: "", // Clear the error for the wedding date
        }));
      }
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
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      bride_message: selectedOption,
      marketing_category: marketingSelect,
    }));
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
      if (formValues.decision == false && !formValues.wedding_date) {
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

  const handleMarketingChange = (e, index) => {
    const value = options[index].value;
    setMarketingSelect((prevMarketingSelect) => {
      if (prevMarketingSelect.includes(value)) {
        return prevMarketingSelect.filter((category) => category !== value);
      } else {
        return [...prevMarketingSelect, value];
      }
    });
  };

  const handleFormNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setFormValues((updatedFormValues) => {
        console.log("Current form values:", { formValues: updatedFormValues });
        return updatedFormValues;
      });
    } else {
      setErrors(validationErrors);
    }
  };
  const handleFormSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Selected Marketing Categories:", marketingSelect);

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        marketing_category: Object.values(marketingSelect), // Convert object values to an array
      }));
      setFormValues((updatedFormValues) => {
        console.log("Current form values:", {
          formValues: updatedFormValues,
        });
        return updatedFormValues;
      });
    } else {
      setErrors(validationErrors);
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
                      isActive={index === selectedOption}
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
                  // disabled={selectedOption === null}
                  onClick={handleNext}
                >
                  <span className="cs-next-button">Next</span>
                </NextButtonStyle>
                <br />
                <div className="flex justify-center">
                  <h5 className="text-[12px]">
                    Already have an account?{" "}
                    <Link to={window.CLOGIN}>
                      <span className="font-bold text-[#6cc2bc]">Log in</span>
                    </Link>
                  </h5>
                </div>

                <div className="privacy-section ">
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

                <div className="cs-inputfield-cotainer">
                  <div>
                    <h1 className="cs-signup-header">
                      {" "}
                      It’s nice to meet you.{" "}
                    </h1>
                  </div>
                  <Box className="cs-textfield-flex">
                    <div>
                      <label>
                        Full Name<span className="star">*</span>
                      </label>
                      <CSTextfield
                        name="bride"
                        className="cs-textfield"
                        id="demo-helper-text-aligned"
                        value={formValues.bride}
                        onChange={(e) =>
                          handleInputChange("bride", e.target.value)
                        }
                        // error={errors.bride}
                      />
                      {errors.bride && (
                        <Typography
                          color="error"
                          variant="caption"
                          component="div"
                        >
                          {errors.bride}
                        </Typography>
                      )}
                    </div>

                    <div>
                      <label>
                        Partner's Name<span className="star">*</span>
                      </label>
                      <CSTextfield
                        name="groom"
                        className="cs-textfield"
                        id="demo-helper-text-aligned"
                        value={formValues.groom}
                        onChange={(e) =>
                          handleInputChange("groom", e.target.value)
                        }
                      />
                      {errors.groom && (
                        <Typography
                          color="error"
                          variant="caption"
                          component="div"
                        >
                          {errors.groom}
                        </Typography>
                      )}
                    </div>
                  </Box>
                  <br />
                  <Box className="cs-textfield-flex">
                    <div className="flex flex-col gap-[5px]">
                      <label>
                        Preferred Wedding Date<span className="star">*</span>
                      </label>
                      {/* {!checkboxChecked && ( */}
                      <DatePickerCouple
                        name="wedding_date"
                        label="Preferred Wedding Date"
                        value={formValues.wedding_date}
                        dateError={checkboxChecked ? "" : errors.wedding_date}
                        handleDateChange={handleDateChange}
                        checkboxChecked={checkboxChecked}
                      />
                    </div>

                    {/* )} */}

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
                    <label>
                      Wedding State<span className="star">*</span>
                    </label>
                    <CSTextfield
                      select
                      className="cs-textfield-2"
                      id="reddit-input"
                      SelectProps={{ IconComponent: () => null }}
                      onChange={(e) =>
                        handleInputChange("wedding_state", e.target.value)
                      }
                      value={formValues.wedding_state}
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
                    {errors.wedding_state && (
                      <Typography
                        color="error"
                        variant="caption"
                        component="div"
                      >
                        {errors.wedding_state}
                      </Typography>
                    )}
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
                        selectedOption !== null ? "#6cc2bc" : "#b7b7b7",
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
                  <div className="privacy-section">
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
                </div>
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
                  <div>
                    <label>
                      Email<span className="star">*</span>
                    </label>
                    <CSTextfield
                      name="email"
                      type="email"
                      className="cs-textfield-2"
                      id="demo-helper-text-aligned"
                      value={formValues.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    {errors.email && (
                      <Typography
                        color="error"
                        variant="caption"
                        component="div"
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <label>
                      Password<span className="star">*</span>
                    </label>
                    <CSTextfield
                      name="password"
                      type="password"
                      className="cs-textfield-2"
                      id="demo-helper-text-aligned"
                      value={formValues.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                    />
                    {errors.password && (
                      <Typography
                        color="error"
                        variant="caption"
                        component="div"
                      >
                        {errors.password}
                      </Typography>
                    )}
                  </div>

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

                  <div className="privacy-section">
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
                  <FormControl>
                    {/* <Box> */}
                    <FormGroup
                      sx={{
                        width: {
                          xs: "100%",
                          md: "31rem",
                        },
                        padding: "0",
                      }}
                    >
                      {/* <Grid container spacing={2}> */}
                      {marketingOptions.map((option, index) => (
                        <FormControlLabel
                          style={{
                            margin: "0",
                          }}
                          control={
                            <CheckBoxStyle
                              value={option.value}
                              // checked={marketingSelect.includes(
                              //   option.value
                              // )}
                              checked={marketingSelect[option.value]}
                              // onChange={handleMarketingChange}
                              onChange={(e) => handleMarketingChange(e, index)}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                whiteSpace: "normal",
                                fontFamily: "Raleway",
                                fontSize: "14px",
                              }}
                            >
                              {option.label}
                            </Typography>
                          }
                        />
                      ))}
                    </FormGroup>
                  </FormControl>

                  {/* </Box> */}
                  {/* Next */}
                  <NextButtonStyle
                    variant="outlined"
                    className="cs-button-text-position"
                    onClick={handleFormSubmit}
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

                  <div className="privacy-section">
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
