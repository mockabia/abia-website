import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DateTextField, SelectTextField } from "../components/FormStyle";
import { TextField, styled } from "@mui/material";

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
            <TextFieldCouple
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
