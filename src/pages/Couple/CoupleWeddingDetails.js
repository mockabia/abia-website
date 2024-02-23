import React, { useEffect, useState } from "react";
import {Box,FormControlLabel,Stack,useMediaQuery,} from "@mui/material";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {CheckBoxStyle,CoupleInput,CoupleSelectStyle,MuiBoxStyles,TextAreaInput,} from "../../components/FormStyle";
import "../Style/CoupleProfile.css";
import { CheckboxOption } from "../../components/CustomerSelect";
import { DatePickerProfile2 } from "../../components/DatepickerPublic";
import { useNavigate } from "react-router-dom";
import * as CoupleJS from "./Couple";

const customStyles = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: "300px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px", // Set the width of the scrollbar
      height: "30px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#6cc2bc", // Set the color of the scrollbar thumb
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f5f5f5", // Set the color of the scrollbar track
    },
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
};

const CoupleWeddingDetails = (props) => {

  let navigate                                = useNavigate();
  const [isMobile, setIsMobile]               = useState(window.innerWidth <= 550);
  const [formValues, setFormValues]           = useState({});
  const [stateOptions, setStateOptions]       = useState([]);
  const [selectedRegion, setSelectedRegion]   = useState([]);
  const [regions, setRegions]                 = useState([]);
  const [errors, setErrors]                   = React.useState({});
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const isMobilesize                          = useMediaQuery("(max-width:550px)");
  const isAbove1100px                         = useMediaQuery("(min-width: 1101px)");

  useEffect(() => {
    CoupleJS.fetchState(setStateOptions);
    CoupleJS.coupleDetails('details',setFormValues)
  }, []);

  useEffect(() => {
    if(formValues.wedding_state!=undefined){
      CoupleJS.fetchRegion(formValues.wedding_state, setRegions);
    }
  }, [formValues.wedding_state]);

  useEffect(() => {
    if(formValues.wedding_location!=undefined){
      var selectedRegion = formValues.wedding_location.split(',');
      const myArrayFiltered = regions.filter((el) => selectedRegion.includes(el.url));
      setSelectedRegion(myArrayFiltered);
    }
  }, [regions,formValues.wedding_location]);
  
  useEffect(() => {
    setCheckboxChecked(formValues.wedding=='0' ? true : false)
  }, [formValues.wedding]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };
  const handleInputChangeVal = (name, value) => {
    CoupleJS.customJS.handleChange(name, value, setFormValues, setErrors)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    CoupleJS.coupleWeddingDetails(formValues, setErrors,navigate)
  };
/* 
  const handleStateChange = (selectedOptions) => {
    //  console.log("Selected State:", selectedOptions);
    setFormValues({ ...formValues, wedding_state: selectedOptions });
    setSelectedState(selectedOptions);
  }; */

  return (
      <section>
        <div className="couple-contact-container">
          <Box
            component="form"
            sx={{
              width: "100%",
              margin: isMobilesize ? "0 1.5rem" : "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              width="100%"
              maxWidth="23rem"
              sx={{
                "@media (min-width: 600px)": {
                  width: "24rem",
                  maxWidth: "30rem",
                },
                "@media (min-width: 1100px)": {
                  width: "40rem",
                  maxWidth: "100%",
                },
              }}
              spacing={2}
            >
              <h2>{props.pageData.title}</h2>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={
                  isMobile ? 2 : isAbove1100px ? "3rem" : "defaultSpacing"
                }
              >
                <DatePickerProfile2
                  name="date_of_wedding"
                  label="Wedding Date"
                  value={formValues.date_of_wedding}
                  dateError={checkboxChecked ? "" : errors.date_of_wedding}
                  handleDateChange={handleInputChangeVal}
                  checkboxChecked={checkboxChecked}
                />

                <FormControlLabel
                  value={formValues.wedding}
                  control={
                    <CheckBoxStyle
                      name="wedding"
                      checked={formValues.wedding=='1' ? false : true}
                      onChange={(e) =>
                        handleInputChangeVal('wedding', e.target.checked ? 0 : 1)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    <span style={{ fontFamily: "raleway", fontSize: "14px" }}>
                      Haven’t decided yet
                    </span>
                  }
                  labelPlacement="end"
                />
              </Stack>
              <Box>
                {errors.wedding_date && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: -"1rem",
                    }}
                  >
                    {errors.wedding_date}
                  </div>
                )}
              </Box>
              <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "" : "center"}
                gap={0}
              >
                <Box sx={MuiBoxStyles}>
                  <label>
                    Wedding State
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <Select
                    className="custom-select-dropdown"
                    name="wedding_state"
                    placeholder=""
                    type="select"
                    sx={{ width: "100%", fontSize: "14px" }}
                    styles={{ ...CoupleSelectStyle, ...customStyles }}
                    options={stateOptions}
                    onChange={(selectedOptions) =>
                      handleInputChangeVal("wedding_state", selectedOptions.url)
                    }
                    value = {
                      stateOptions.filter(option => option.url === formValues.wedding_state)
                    }
                    components={{
                      Menu,
                      MultiValue,
                      IndicatorSeparator: null,
                      DropdownIndicator: () => (
                        <div>
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="dropDown-position"
                            style={{ color: "#6cc2bc", marginRight: "0.5rem" }}
                          />
                        </div>
                      ),
                    }}
                  />
                  {errors.wedding_state && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.wedding_state}
                    </div>
                  )}
                </Box>
                <Box sx={MuiBoxStyles}>
                  <label>
                    Wedding Location
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <Select
                    name="wedding_location"
                    placeholder=""
                    isMulti={true}
                    type="select"
                    sx={{ width: "100%" }}
                    value={selectedRegion} 
                    styles={CoupleSelectStyle}
                    options={regions}
                    onChange={(selectedOptions) => {
                      const commaSep = selectedOptions.map(item => item.url).join(',');
                      handleInputChangeVal("wedding_location", commaSep)
                    }} 
                    isClearable={false}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Menu,
                      MultiValue,
                      IndicatorSeparator: null,
                      DropdownIndicator: () => (
                        <div>
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="dropDown-position"
                            style={{ color: "#6cc2bc", marginRight: "0.5rem" }}
                          />
                        </div>
                      ),
                      Option: ({ innerProps, label, isSelected }) => (
                        <CheckboxOption
                          innerProps={innerProps}
                          label={label}
                          isSelected={isSelected}
                        />
                      ),
                    }}
                  />
                  {errors.wedding_location && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.wedding_location}
                    </div>
                  )}
                </Box>
              </Stack>
              <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                gap={2}
              >
                {/* Budget */}
                <Box sx={MuiBoxStyles}>
                  <label>
                    Estimate Budget
                    <span className="star">*</span>
                  </label>
                  <CoupleInput
                    name="budget"
                    type="number"
                    value={formValues.budget}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                  {errors.budget && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.budget}
                    </div>
                  )}
                </Box>
                {/* wedding guest */}
                <Box sx={MuiBoxStyles}>
                  <label>
                    # of Wedding Guests
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="guests"
                    type="number"
                    value={formValues.guests}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                  {errors.guests && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.guests}
                    </div>
                  )}
                </Box>
              </Stack>
              <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                gap={2}
              >
                <Box sx={MuiBoxStyles}>
                  <label>
                    # of Bridesmaids
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="bridesmaids"
                    type="number"
                    value={formValues.bridesmaids}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                  {errors.bridesmaids && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.bridesmaids}
                    </div>
                  )}
                </Box>
                <Box sx={MuiBoxStyles}>
                  <label>
                    # of Groomsmen
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="groomsmen"
                    type="number"
                    value={formValues.groomsmen}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                  {errors.groomsmen && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.groomsmen}
                    </div>
                  )}
                </Box>
              </Stack>
              <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                gap={2}
              >
                <Box sx={MuiBoxStyles}>
                  <label>
                    # of Travelling Guests
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="travellingguests"
                    type="text"
                    value={formValues.travellingguests}
                    onChange={(e) =>
                      handleInputChange(e)
                    }
                  />
                  {errors.travellingguests && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.travellingguests}
                    </div>
                  )}
                </Box>
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                gap="5px"
              >
                <label>
                  Your Wedding Vision
                  <span style={{ color: "red", fontSize: "16px" }}>*</span>
                </label>
                <TextAreaInput
                  name="profile_desc"
                  multiline
                  rows={4}
                  type="text"
                  value={formValues.profile_desc}
                  onChange={(e) =>
                    handleInputChange(e)
                  }
                  width="100%"
                  maxWidth="23rem"
                  sx={{
                    "@media (min-width: 600px)": {
                      width: "24rem",
                      maxWidth: "30rem",
                    },
                    "@media (min-width: 1100px)": {
                      width: "100%",
                      maxWidth: "100%",
                    },
                  }}
                />
                {errors.profile_desc && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.profile_desc}
                  </div>
                )}
              </Box>
              <br />

              <Box>
                <button
                  className="couple-save-button"
                  onClick={handleFormSubmit}
                >
                  Save Changes
                </button>
              </Box>
              <br />
              <br />
              <br />
              <br />
              <br />
            </Stack>
          </Box>
        </div>
      </section>
  );
};

export default CoupleWeddingDetails;

const Menu = (props) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#d7d7d7",
    borderRadius: "4px",
    fontFamily: "Open Sans",
    fontSize: "11px",
    padding: "3px",
    order: 99,
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""}`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 2;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
