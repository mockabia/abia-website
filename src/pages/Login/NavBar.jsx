import React from "react";
import { useState } from "react";
import "./NavBar.css";

import AbiaLogo from "../../abiaLogo";

import SingleSelect from "../../third-party-packs/singleSelect";
import LoginDropdown from "../../components/Login and Signup/LoginDropdown";
import SignUpDropDown from "../../components/Login and Signup/SignUpDropDown";
import SearchBarLogin from "../../components/SearchBarLogin";
import MenuItems from "../../components/Login and Signup/MenuItems";
import { FiSearch } from "react-icons/fi";
import Asynchronous, { AsyncSearch } from "../../components/AsyncSearch";
import {
  TextField,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { Link } from "react-router-dom";
import UseAutocomplete from "../../components/AsyncSearch";
import styled from "@emotion/styled";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([
    "Wedding Venues",
    "Wedding Dresses",
    "Celebrants",
    "Flower Bouquets & Styling",
    "Make-up Artist",
    "Invitations & Stationery",
    "Wedding Caterers + Mobile Bars ",
    "Photographers",
    "Beauty Services",
    "Bomboniere & Guest Favors",
    "Bridal Accessories & Jewellery",
    "Cake Designers",
    "Ceremony Music",
    "Ceremony Venues",
    "Decorations & Styling",
    "Disc Jockey (DJ)",
    "Entertainment Agents",
    "Wedding Planners & Coordinators",
    "Hair Stylist",
    "1st Night Honeymoon",
  ]);

  const theme = createTheme({
    components: {
      MuiPopper: {
        styleOverrides: {
          root: {
            left: "-10px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
    },
  });

  const handleSearchIconClick = (event) => {
    if (anchorEl) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className="login-navbar-style relative">
        <div className="">
          <MenuItems />
        </div>
        <div className="login-logo cursor-pointer">
          <AbiaLogo />
        </div>
        <div className="search-icon-responsive" onClick={handleSearchIconClick}>
          <FiSearch color="#fff" size={26} />
        </div>
        <ThemeProvider theme={theme}>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="left"
            className="lg:hidden"
          >
            <Paper
              elevation={3}
              style={{ width: "calc(80vw - 32px)", maxWidth: "800px" }}
            >
              <div className="text-field-container">
                <TextField
                  placeholder="find wedding vendors"
                  variant="outlined"
                  size="small"
                  fullWidth
                  autoFocus
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>

              {searchValue.length > 0 && (
                <List>
                  {filteredOptions.map((option, index) => (
                    <ListItem key={index} button onClick={() => alert(option)}>
                      <ListItemText
                        primary={option}
                        className="border-b p-[3px]"
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Popper>
        </ThemeProvider>

        <div className="navbar-mobile-align">
          <div className="flex justify-center items-center">
            {/* <SearchBarLogin /> */}
            <UseAutocomplete />
          </div>
        </div>
      </div>
      {/* Subheaders */}
      <div className="navbar-subhead-large relative">
        <ul className="login-subheaders absolute ">
          <li className="nav-menu-list ">
            <Link to={"/directory"}>DIRECTORY</Link>
          </li>
          <li className="nav-menu-list ">IDEAS & TOP LISTS</li>
          <li className="nav-menu-list ">REGISTRY</li>
          <li className="nav-menu-list ">SPECIALS</li>
          <li className="nav-menu-list ">FEATURED</li>
          <li className="nav-menu-list ">AWARDS</li>
          {/* <div className="subheaders-empty-div"></div> */}
        </ul>
        <div className="login-signup-group">
          <LoginDropdown />
          <SignUpDropDown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
