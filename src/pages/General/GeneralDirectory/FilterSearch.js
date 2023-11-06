import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { teal } from "@mui/material/colors";
import { MenuItem, Popper, Typography } from "@mui/material";
import { useState } from "react";
import { BorderClear } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { withTheme } from "@mui/material/styles";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

const ColorSearchButton = styled(Button)(({ theme }) => ({
  display: "flex", // Display the button when the screen size is 600px or larger
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[200],
  border: "1px solid #a3a3a3",
  borderRadius: "0px",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: teal[500],
  },
}));
const AutoCompleteStyle = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "0px",
    width: "230px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Raleway, sans-serif",
  },
  "& .MuiFormLabel-root": {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Raleway, sans-serif",
    zIndex: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-root": {
      width: "140px",
    },
  },
}));

const PopperMy = function (props) {
  return <Popper {...props} style={{ width: 300 }} placement="bottom-start" />;
};

const australiaLocations = [
  {
    id: "1",
    state: "NSW",
    mainCity: "Sydney",
    suburbs: ["Bondi Beach", "Manly", "Parramatta", "Surry Hills"],
  },
  {
    id: "2",
    state: "VIC",
    mainCity: "Melbourne",
    suburbs: ["Fitzroy", "St. Kilda", "Richmond", "Carlton"],
  },
  {
    id: "3",
    state: "QLD",
    mainCity: "Brisbane",
    suburbs: ["Gold Coast", "Sunshine Coast", "Logan", "Ipswich"],
  },
  {
    id: "4",
    state: "WA",
    mainCity: "Perth",
    suburbs: ["Fremantle", "Joondalup", "Canning Vale", "Rockingham"],
  },
  {
    id: "5",
    state: "SA",
    mainCity: "Adelaide",
    suburbs: ["Glenelg", "Norwood", "Prospect", "Port Adelaide"],
  },
  {
    id: "6",
    state: "ACT",
    mainCity: "Canberra",
    suburbs: ["Belconnen", "Woden Valley", "Gungahlin", "Tuggeranong"],
  },
  {
    id: "7",
    state: "TAS",
    mainCity: "Hobart",
    suburbs: ["Battery Point", "Sandy Bay", "New Town", "Glenorchy"],
  },
  {
    id: "8",
    state: "NT",
    mainCity: "Darwin",
    suburbs: ["Palmerston", "Alice Springs", "Katherine", "Casuarina"],
  },
];

//
const FilterSearch = ({ onCityCahnge, oncSubUrbanChange }) => {
  const [categoryValue, setCategoryValue] = useState(null);
  const [locationValue, setLocationValue] = useState(null);
  // console
  console.log("selected Category:", categoryValue);
  console.log("selected Location:", locationValue);

  const handleLocationChange = (newValue) => {
    setLocationValue(newValue);
    if (newValue) {
      onCityCahnge(newValue.mainCity);
      oncSubUrbanChange(newValue.suburb);
    } else {
      onCityCahnge(null);
      oncSubUrbanChange(null);
    }
  };

  const formattedAustraliaLocations = australiaLocations.flatMap((location) =>
    location.suburbs.map((suburb) => ({
      id: location.id,
      state: location.state,
      mainCity: location.mainCity,
      suburb: suburb,
    }))
  );

  function renderGroupedOptions(params) {
    return (
      <div>
        {params.group.suburb.map((suburb) => (
          <MenuItem key={suburb} value={suburb}>
            {suburb}
          </MenuItem>
        ))}
      </div>
    );
  }

  const WeddingCategoryOptions = WeddingCategory.map((item) => item.title);

  return (
    <div className="dirmain-search-button ">
      <AutoCompleteStyle
        disablePortal
        id="grouped-demo"
        options={WeddingCategoryOptions}
        PopperComponent={PopperMy}
        renderInput={(params) => <TextField {...params} label="Category" />}
        value={categoryValue}
        onChange={(event: any, newValue: string | null) =>
          setCategoryValue(newValue)
        }
        disableClearable={true}
        renderOption={(props, option) => (
          <div
            {...props}
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "14px",
              color: "#515151",
              fontFamily: "Raleway",
              fontWeight: "500",
              borderBottom: "1px solid #EFEFEF",
            }}
          >
            {option}
          </div>
        )}
      />
      <AutoCompleteStyle
        disablePortal
        id="combo-box-demo"
        options={formattedAustraliaLocations}
        groupBy={(option) => option.state}
        getOptionLabel={(option) => `${option.suburb}, ${option.state}`}
        PopperComponent={PopperMy}
        renderInput={(params) => <TextField {...params} label="Location" />}
        renderGroup={(params) => (
          <Box key={params.key} bac>
            <Accordion>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  borderTop: "1px solid #EFEFEF",
                  height: "25px",
                }}
              >
                <Typography
                  fontSize={14}
                  fontStyle="normal"
                  fontWeight="600"
                  fontFamily="Raleway"
                  p={1}
                >
                  {params.group}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  fontSize: "14px",
                  fontFamily: "Raleway",
                  fontWeight: "500",
                }}
              >
                {/* {params.children} */}
                {params.children.map((child, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <div
                        style={{
                          borderTop: "1px solid #EFEFEF",
                        }}
                      />
                    )}
                    {child}
                  </React.Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
        value={locationValue}
        onChange={(event: any, newValue: string | null) =>
          handleLocationChange(newValue)
        }
        disableClearable={true}
      />

      <ColorSearchButton clas variant="outlined">
        <SearchRoundedIcon sx={{ fontSize: 30, color: "white" }} />
      </ColorSearchButton>
    </div>
  );
};

export default FilterSearch;

const WeddingCategory = [
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
