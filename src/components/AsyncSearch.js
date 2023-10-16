import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import "./AsyncSearch.css";

const Input = styled("input")(({ theme }) => ({
  width: 280,
  height: 35,
  borderRadius: 50,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
  paddingLeft: "30px",
  paddingRight: "20px",
  fontSize: "14px",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 280,
  margin: 0,
  padding: 15,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  fontSize: 15,
  marginBottom: 25,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 280,
  border: "1px solid rgba(0,0,0,.25)",
  borderRadius: 10,
  "& li.Mui-focused": {
    backgroundColor: "#e7f5f4",
    padding: 5,
    color: "black",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#6cc2bc",
    color: "white",
  },
  "& li": {
    marginBottom: "15px", // Add 15px margin to each list item
  },
}));

export default function UseAutocomplete() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  const inputProps = getInputProps();
  return (
    <div>
      <div {...getRootProps()}>
        <Input {...inputProps} placeholder="find wedding vendors..." />
        <InputAdornment position="end">
          <IconButton
            type="button"
            sx={{
              color: "#6cc2bc",
            }}
            aria-label="search"
          >
            <span className="search-icon"></span>
          </IconButton>
        </InputAdornment>
      </div>
      {inputProps.value && groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.title}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Wedding Venues" },
  { title: "Wedding Dresses" },
  { title: "Celebrants" },
  { title: "Flower Bouquets & Styling" },
  { title: "Make-up Artist" },
  { title: "Invitations & Stationery" },
  { title: "Wedding Caterers + Mobile Bars" },
  { title: "Photographers" },
  { title: "Beauty Services" },
  { title: "Bomboniere & Guest Favors" },
  { title: "Bridal Accessories & Jewellery" },
  { title: "Cake Designers" },
  { title: "Ceremony Music" },
  { title: "Ceremony Venues" },
  { title: "Decorations & Styling" },
  { title: "Disc Jockey (DJ)" },
  { title: "Entertainment Agents" },
  { title: "Wedding Planners & Coordinators" },
  { title: "Hair Stylist" },
  { title: "1st Night Honeymoon" },
];
