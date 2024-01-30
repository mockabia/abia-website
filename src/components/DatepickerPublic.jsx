import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { CoupleInput, DateTextField, SelectTextField } from "../components/FormStyle";
import { TextField, Typography, styled } from "@mui/material";

const DatePickerStype = styled(MobileDatePicker)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: "#949494",
  },
}));

const TextFieldCouple = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Raleway",
    height: "45px",
    width: "100%",
    maxWidth: "22rem",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Raleway",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Raleway",
    fontSize: "14px",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "& .MuiFormLabel-root ": {
    fontFamily: "Raleway",
  },
  [`@media (min-width: 1024px)`]: {
    "& .MuiInputBase-root": {
      width: "100%",
      maxWidth: " 12rem",
    },
  },
  [`@media (min-width: 1300px)`]: {
    "& .MuiInputBase-root": {
      width: "14.5rem",
      maxWidth: " 16rem",
    },
  },
}));

// RatingInput;
export const RatingInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Raleway",
    height: "45px",
    width: "16rem",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Raleway",
    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Raleway",
    fontSize: "14px",
    width: "16rem",
    maxWidth: "100%",
    "& > fieldset": { borderColor: "#c3bebe" },
    "&:hover fieldset": {
      borderColor: "#c3bebe",
    },
  },
  "& .MuiFormHelperText-root": {
    border: "none",
    marginLeft: "0rem",
  },
  "& .Mui-focused": {
    boxShadow: "0 0 0 1px #c3bebe",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));


export function DatePickerPublic({ label, TextFieldProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        label="Preferred Wedding Dates"
        slots={{
          textField: (params) => <DateTextField variant="filled" {...params} />,
        }}
      />
    </LocalizationProvider>
  );
}
// COUPLE SIGNUP
export function DatePickerCouple({
  name,
  label,
  dateError,
  handleDateChange,
  checkboxChecked,
  value,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        value={value}
        name={name}
        format="dd/MM/yyyy"
        // label={label}
        onChange={(date) => handleDateChange(name, date)}
        // disabled="true"
        disablePast
        disabled={checkboxChecked}
        slots={{
          textField: (params) => (
            <React.Fragment>
              <TextFieldCouple
                variant="outlined"
                {...params}
                // error={Boolean(dateError)}
              />
              {dateError && (
                <Typography color="error" variant="caption" component="div">
                  {dateError}
                </Typography>
              )}
            </React.Fragment>
          ),
        }}
      />
    </LocalizationProvider>
  );
}

// COUPLE PROFILE
export function DatePickerProfile2({
  name,
  label,
  dateError,
  handleDateChange,
  checkboxChecked,
  value,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        value={value}
        name={name}
        format="dd/MM/yyyy"
        // label={label}
        onChange={(date) => handleDateChange(name, date)}
        // disabled="true"
        disablePast
        disabled={checkboxChecked}
        slots={{
          textField: (params) => (
            <React.Fragment>
              <CoupleInput
                variant="outlined"
                {...params}
                // error={Boolean(dateError)}
              />
              {dateError && (
                <Typography color="error" variant="caption" component="div">
                  {dateError}
                </Typography>
              )}
            </React.Fragment>
          ),
        }}
      />
    </LocalizationProvider>
  );
}

// RATING DATEPICKER
export function RatingDatePicker({
  name,
  label,
  dateError,
  handleDateChange,
  checkboxChecked,
  value,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        value={value}
        name={name}
        format="dd/MM/yyyy"
        // label={label}
        onChange={(date) => handleDateChange(name, date)}
        // disabled="true"
        disablePast
        disabled={checkboxChecked}
        slots={{
          textField: (params) => (
            <RatingInput
              variant="outlined"
              {...params}
              error={Boolean(dateError)}
              helperText={dateError}
            />
            
          ),
        }}
      />
    </LocalizationProvider>
  );
}
