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
import {FormControl,FormControlLabel,FormGroup,MenuItem,Stack,} from "@mui/material";
import {DatePickerCouple} from "../../components/DatepickerPublic";
import { useNavigate,Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import {StepperStyle,ButtonStyle,NextButtonStyle,LeftAlignedTypography,CheckBoxStyle,CSTextfield,CSmenuItemStyle,} from "../../components/FormStyle";
import CouplesLogin from "./CouplesLogin";
import * as CoupleJS from "./Couple";

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
  let navigate                                  = useNavigate();
  const [formValues, setFormValues]             = React.useState({});
  const [activeStep, setActiveStep]             = React.useState(0);
  const [skipped, setSkipped]                   = React.useState(new Set());
  const [selectedOption, setSelectedOption]     = React.useState(null); //first page option
  const [isOptionSelected, setIsOptionSelected] = React.useState(true);
  const [location, setLocation]                 = React.useState([]);
  const [checkboxChecked, setCheckboxChecked]   = React.useState(false);
  const [errors, setErrors]                     = React.useState({});
  const [marketingOptions, setMarketingOptions] = React.useState([]);
  const [marketingSelect, setMarketingSelect]   = React.useState([]);
  const [imageClass, setImageClass]             = React.useState(false);

  const [loginOpen, setLoginOpen]               = React.useState(false);

  useEffect(() => {
    CoupleJS.fetchState(setLocation);
    CoupleJS.fetchMarketingCategory(setMarketingOptions);
    // setIsOptionSelected(true);
  }, []);
  
  useEffect(() => {
    let imageClass = 'cs-image-container-3';
    if(activeStep==0){
      imageClass = 'cs-image-container-1';
    }else if(activeStep==1){
      imageClass = 'cs-image-container-2';
    }else if(activeStep==2){
      imageClass = 'cs-image-container-3';
    }
    setImageClass(imageClass)
  }, [activeStep]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };
  const handleInputChangeVal = (name, value) => {
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
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

  useEffect(() => {
    setFormValues((values) => ({
      ...values,
      marketing_category: Object.values(marketingSelect),
    }));
  }, [marketingSelect]);
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
    CoupleJS.coupleSignup(activeStep,setActiveStep,formValues, setErrors,navigate)
  };
  
  return (
    <div>
      <form>
        {/* Page One */}
        
          <section className="couples-singup-container">
            <div className="couples-signup-image">
              <div className={`cs-image-container ${imageClass} `}></div>
            </div>
            {activeStep !== 0 && (
               <div className="cs-back-button" onClick={handleBack}>
                  <ArrowBackIcon />
                  <p className="text-[12px] text-black font-[800]">Back</p>
                </div> 
            )}
            
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
              {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
              <React.Fragment>
              {activeStep === 0 && (
                <>
                <div>
                  <h1 className="cs-signup-header">
                    Congratulations! How can we help plan your big day?
                  </h1>
                </div>
                {/* Option buttons */}
                {/* 1 */}
                {/* <pre>{JSON.stringify(selectedOption, null, 2)}</pre> */}
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

                {errors.bride_message !='' && (
                  <Typography color="red" fontFamily={"Raleway"} fontSize={12}>
                    {errors.bride_message}
                  </Typography>
                )}
                </>
              )}
              {activeStep === 1 && (
                <>
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
                          handleInputChange(e)
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
                          handleInputChange(e)
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
                        handleDateChange={handleInputChangeVal}
                        checkboxChecked={checkboxChecked}
                      />
                    </div>

                    {/* )} */}

                    <FormControlLabel
                      value="0"
                      control={
                        <CheckBoxStyle
                          name="decision"
                          checked={formValues.decision}
                          onChange={(e) => {
                            handleInputChangeVal('decision', e.target.checked ? 1 : 0)
                          }}
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
                      name="wedding_state"
                      className="cs-textfield-2"
                      id="reddit-input"
                      SelectProps={{ IconComponent: () => null }}
                      onChange={(e) =>
                        handleInputChange(e)
                      }
                      value={formValues.wedding_state}
                    >
                      
                      {location.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.url}
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
                </div>
                </>
              )}
              {activeStep === 2 && (
                <>
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
                        handleInputChange(e)
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
                        handleInputChange(e)
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
                </Stack>
                </>
              )}
              {activeStep === 3 && (
                <>
                <div>
                  <h1 className="cs-signup-header">
                    Help us build our dream wedding team.
                  </h1>
                </div>
                <Stack spacing={3}>
                  <FormControl>
                    <FormGroup
                      sx={{
                        width: {
                          xs: "100%",
                          md: "31rem",
                        },
                        padding: "0",
                      }}
                    >
                      {marketingOptions.map((option, index) => (
                        <FormControlLabel
                          style={{
                            margin: "0",
                          }}
                          control={
                            <CheckBoxStyle
                              value={option.value}
                              checked={marketingSelect[option.value]}
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
                </Stack>
                </>
              )}
                
                
                




                <br />
                {/* Next */}
                <NextButtonStyle
                  variant="outlined"
                  className="cs-button-text-position"
                  onClick={handleFormNext}
                >
                  <span className="cs-next-button">Next</span>
                </NextButtonStyle>
                <br />
                <div className="flex justify-center">
                  <h5 className="text-[12px]">
                    Already have an account?{" "}
                    <span onClick={() => setLoginOpen(true)}>
                      <span className="font-bold text-[#6cc2bc]">Log in</span>
                    </span>
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
          <CouplesLogin modalOpen={loginOpen} setModalOpen={setLoginOpen} />
      </form>
    </div>
  );
}
