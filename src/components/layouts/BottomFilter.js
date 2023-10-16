import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import AddHomeTwoToneIcon from "@mui/icons-material/AddHomeTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

export const FilterPaperStyle = styled(Paper)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "1rem",
    paddingRight: "0rem",
  },
}));

const FormRadioInputStyle = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontFamily: "Raleway",
    fontSize: "14px",
    fontWeight: "400",
  },
  "& .MuiButtonBase-root ": {
    color: "black",
  },
}));

const BottomFilter = () => {
  const [value, setValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  function handleFilterClick() {
    setShowFilter(true);
  }

  function handleCloseFilter() {
    setShowFilter(false);
  }
  function handleSearchClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <FilterPaperStyle
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      className="mobfilter-nav"
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* Filter */}
        <BottomNavigationAction
          label="Filter"
          icon={<FilterListTwoToneIcon />}
          onClick={handleFilterClick}
        />
        {/* Search */}
        <BottomNavigationAction
          label="Search"
          icon={<SearchTwoToneIcon />}
          onClick={handleSearchClick}
        />
      </BottomNavigation>
      {/* When the Filter icon is clicked */}
      {showFilter && (
        <Paper
          sx={{
            position: "absolute",
            bottom: 56,
            left: 0,
            right: 0,
            padding: 16,
          }}
          elevation={3}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              align="center"
              variant="h6"
              sx={{
                flex: "1",
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Sort By
            </Typography>
            <Button onClick={handleCloseFilter}>
              <CloseIcon
                sx={{
                  color: "#515151",
                }}
              />
            </Button>
          </Box>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormRadioInputStyle
                value="recent"
                control={<Radio />}
                label="Recently Reviewed"
              />
              <FormRadioInputStyle
                value="most"
                control={<Radio />}
                label="Most Reviewed"
              />
              <FormRadioInputStyle
                value="awarded"
                control={<Radio />}
                label="Most Awarded"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      )}
    </FilterPaperStyle>
  );
};

export default BottomFilter;
