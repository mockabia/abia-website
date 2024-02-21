import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  CoupleInput,
  DateTextField,
  SelectTextField,
} from "../components/FormStyle";
import { TextField, Typography, styled } from "@mui/material";
import { parseISO } from "date-fns";

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

export const VendorInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Raleway",
    height: "45px",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",
    fontFamily: "Raleway",

    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope",
    fontSize: "14px",
    fontWeight: "400",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#fafafa",
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
  "@media (min-width: 1024px)": {
    width: "97%",
  },
}));

export const PublicMessageInput = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Manrope",
    height: "40px",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "10px",

    // border: "1px solid #c3bebe",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "Manrope",
    height: "45px",
    fontSize: "14px",
    fontWeight: "600",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#fff",
    "& > fieldset": { borderColor: "#fff" },
    "&:hover fieldset": {
      borderColor: "#fff",
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
  "@media (min-width: 1024px)": {
    width: "100%",
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
        // value={value}
        value={value ? new Date(value) : null}
        name={name}
        format="dd/MM/yyyy"
        // label={label}
        onChange={(date) => handleDateChange(date)}
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
        disableFuture
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

// VENDOR DATEPICKER
export function VendorDatePicker({
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
        value={value ? new Date(value) : null}
        name={name}
        format="dd/MM/yyyy"
        // label={label}
        onChange={(date) => handleDateChange(date)}
        // disabled="true"
        disableFuture
        disabled={checkboxChecked}
        slots={{
          textField: (params) => (
            <VendorInput
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

export function VendorFutureDatePicker({
  name,
  label,
  dateError,
  handleDateChange,
  checkboxChecked,
  value,
}) {
  // const parsedDate = parseISO(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        value={value ? new Date(value) : null}
        name={name}
        format="dd/MM/yyyy"
        onChange={(date) => handleDateChange(date)}
        // disabled="true"
        disablePast
        disabled={checkboxChecked}
        slots={{
          textField: (params) => (
            <VendorInput
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

// PP - Message
export function PublicProfileDate({
  name,
  label,
  dateError,
  handleDateChange,
  checkboxChecked,
  value,
}) {
  const dateValue = typeof value === "string" ? parseISO(value) : value;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        value={dateValue}
        name={name}
        format="dd/MM/yyyy"
        onChange={(date) => handleDateChange(name, date)}
        // disabled="true"
        disablePast
        disabled={checkboxChecked}
        slots={{
          textField: (params) => (
            <PublicMessageInput
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
