import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  CoupleInput,
  DateTextField,
  SelectTextField,
} from "../components/FormStyle";
import { TextField, styled, Box, Typography } from "@mui/material";

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

export function DatePickerProfile({
  name,
  label,
  dateError,
  handleDateChange,
  checkboxChecked,
  value,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <label>
          {label}
          <span className="star">*</span>
        </label>
        <DatePickerStype
          format="DD-MM-YYYY"
          value={value}
          name={name}
          onChange={(date) => handleDateChange(name, date)}
          disablePast
          disabled={checkboxChecked}
          slots={{
            textField: (params) => (
              <CoupleInput
                variant="outlined"
                {...params}
                // error={Boolean(dateError)}
                // helperText={dateError}
              />
            ),
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
