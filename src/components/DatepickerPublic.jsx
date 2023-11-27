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
  "& .MuiInputBase-root": {
    width: "100%",
    // maxWidth: " 12rem",
  },
  "& .MuiInputLabel-root": {
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
      width: "15rem",
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
  TextFieldProps,
  dateError,
  handleDateChange,
  formValues,
  checkboxChecked,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStype
        name={name}
        label={label}
        onChange={(date) => handleDateChange(name, date)}
        // value={formValues[name]}
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
