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
import * as servicesPage from "../../services/vendor/signupPageService";
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
  //   {
  //     label: "Newly engaged and exploring",
  //     icon: <EngagedIcon />,
  //   },
  {
    label: "Recently engaged and starting from scratch.",
    icon: <PlanningIcon />,
  },
  {
    label: "Searching for our perfect venue and more.",
    icon: <Planning2Icon />,
  },
  {
    label: "Booked a venue and need to secure other services.",
    icon: <FormICon4 />,
  },
];

export default function CouplesSignUp() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOption, setSelectedOption] = React.useState(null); //first page option

  const [location, setLocation] = React.useState([]);
  const [selectState, setSelectState] = React.useState();

  const [checked, setChecked] = React.useState(true);
  // const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    CoupleJS.fetchState(setLocation);
  }, []);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    console.log(`Selected option: ${index}`);
  };

  const handleClosePage = () => {
    window.history.back(); // This will navigate back to the previous page in the browser's history
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
            {/* <div
              className="cs-back-button"
              onClick={handleBack}
            >
              <ArrowBackIcon />
              <p className="text-[12px] text-black font-[800]">Back</p>
            </div> */}
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
                      className="cs-textfield"
                      id="demo-helper-text-aligned"
                      label="Full Name*"
                    />
                    <CSTextfield
                      className="cs-textfield"
                      id="demo-helper-text-aligned"
                      label="Partner's Name*"
                    />
                  </Box>
                  <br />
                  <Box className="cs-textfield-flex">
                    <DatePickerCouple />
                    <FormControlLabel
                      value="end"
                      control={
                        <CheckBoxStyle
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
                      select
                      className="cs-textfield-2"
                      label="Wedding State*"
                      id="reddit-input"
                      SelectProps={{ IconComponent: () => null }}
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
                    type="email"
                    className="cs-textfield-2"
                    id="demo-helper-text-aligned"
                    label="Email*"
                  />
                  <CSTextfield
                    type="password"
                    className="cs-textfield-2"
                    id="demo-helper-text-aligned"
                    label="Password*"
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
                    onClick={handleNext}
                    style={{
                      backgroundColor:
                        selectedOption !== null ? "black" : "#b7b7b7",
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
                    <FormGroup>
                      <Grid container spacing={2}>
                        <Grid item xs={6} direction="column" >
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
                        <Grid item xs={6}>
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
                    disabled={selectedOption === null}
                    style={{
                      backgroundColor:
                        selectedOption !== null ? "black" : "#b7b7b7",
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
