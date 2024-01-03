import React, { useEffect, useState } from "react";
import LayoutCouple from "../../layouts/Layout/LayoutCouple";
import {
  Box,
  FormControlLabel,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import {
  CheckBoxStyle,
  CoupleInput,
  CoupleSelectStyle,
  MuiBoxStyles,
} from "../../components/FormStyle";
import "../Style/CoupleProfile.css";
import { DatePickerProfile } from "../../components/DatePickerProfile";
import * as CoupleJS from "../Couple/Couple";
import { CheckboxOption } from "../../components/CustomerSelect";
import { Title } from "@mui/icons-material";

const CoupleWeddingDetails = () => {
  const title = "Account Settings";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  const [formValues, setFormValues] = useState({
    wedding_date: null,
    decision: false,
    wedding_state: "",
    wedding_location: "",
    budget: "",
    guests: "",
    bridesmaids: "",
    groomsmen: "",
    travellingguests: "",
    profile_desc: "",
  });
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [regions, setRegions] = useState([]);
  const [errors, setErrors] = React.useState({});
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const isMobilesize = useMediaQuery("(max-width:550px)");
  const isAbove1100px = useMediaQuery("(min-width: 1101px)");

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

  useEffect(() => {
    CoupleJS.fetchState(setStateOptions);
  }, []);

  useEffect(() => {
    CoupleJS.fetchRegion(selectedState.url, setRegions);
  }, [selectedState.url]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //
  const validateForm = () => {
    const errors = {};
    if (formValues.decision == false && !formValues.wedding_date) {
      errors.wedding_date = "Date is required";
    }
    if (!formValues.wedding_state) {
      errors.wedding_state = "State is required";
    }
    if (!formValues.wedding_location) {
      errors.wedding_location = "Weddiing Location is required";
    }
    if (!formValues.budget) {
      errors.budget = "Budget is required";
    }
    if (!formValues.guests) {
      errors.guests = "Guests count is required";
    }
    if (!formValues.bridesmaids) {
      errors.bridesmaids = "Bridesmaids no: is required";
    }
    if (!formValues.groomsmen) {
      errors.groomsmen = "Groomsmen no: is required";
    }
    if (!formValues.travellingguests) {
      errors.travellingguests = "Travelling guests no: is required";
    }
    if (!formValues.profile_desc) {
      errors.profile_desc = "Profile description is required";
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
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

  const handleStateChange = (selectedOptions) => {
    //  console.log("Selected State:", selectedOptions);
    setFormValues({ ...formValues, wedding_state: selectedOptions });
    setSelectedState(selectedOptions);
  };

  return (
    <LayoutCouple title={title}>
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
                  width: "31rem",
                  maxWidth: "35rem",
                },
              }}
              spacing={2}
            >
              <h2>Wedding Details</h2>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={
                  isMobile ? 2 : isAbove1100px ? "4.5rem" : "defaultSpacing"
                }
              >
                <DatePickerProfile
                  name="wedding_date"
                  label="Wedding Date"
                  value={formValues.wedding_date}
                  dateError={checkboxChecked ? "" : errors.wedding_date}
                  handleDateChange={handleDateChange}
                  checkboxChecked={checkboxChecked}
                />

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
                gap={2}
              >
                <Box sx={MuiBoxStyles}>
                  <label>
                    Wedding State
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <Select
                    name="wedding_state"
                    placeholder=""
                    type="select"
                    sx={{ width: "100%", fontSize: "14px" }}
                    styles={CoupleSelectStyle}
                    options={stateOptions}
                    onChange={handleStateChange}
                    // onChange={(selectedOptions) =>
                    //   handleInputChange("wedding_state", selectedOptions)
                    // }
                    value={formValues.wedding_state}
                    components={{
                      Menu,
                      MultiValue,
                      IndicatorSeparator: null,
                      DropdownIndicator: () => (
                        <div>
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="dropDown-position"
                            style={{ color: "#7c7c7c", marginRight: "0.5rem" }}
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
                    value={formValues.wedding_location}
                    styles={CoupleSelectStyle}
                    options={regions}
                    onChange={(selectedOptions) =>
                      handleInputChange("wedding_location", selectedOptions)
                    }
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
                            style={{ color: "#7c7c7c", marginRight: "0.5rem" }}
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
                    <span style={{ color: "red", fontSize: "16px" }}>*</span>
                  </label>
                  <CoupleInput
                    name="budget"
                    type="number"
                    value={formValues.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
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
                      handleInputChange("guests", e.target.value)
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
                      handleInputChange("bridesmaids", e.target.value)
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
                      handleInputChange("groomsmen", e.target.value)
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
                      handleInputChange("travellingguests", e.target.value)
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
                <CoupleInput
                  name="profile_desc"
                  multiline
                  rows={3}
                  type="text"
                  value={formValues.profile_desc}
                  onChange={(e) =>
                    handleInputChange("profile_desc", e.target.value)
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
    </LayoutCouple>
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
  const maxToShow = 3;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
