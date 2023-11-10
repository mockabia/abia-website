import React from "react";
import { useState } from "react";
import "../../Style/NavBar.css";
import { useNavigate } from "react-router-dom";

import AbiaLogo from "../../../abiaLogo";

import SingleSelect from "../../../third-party-packs/singleSelect";
import LoginDropdown from "../../../components/Login and Signup/LoginDropdown";
import SignUpDropDown from "../../../components/Login and Signup/SignUpDropDown";
import SearchBarLogin from "../../../components/SearchBarLogin";
import MenuItems from "../../../components/Login and Signup/MenuItems";
import { FiSearch } from "react-icons/fi";
import { NavMenuStyle } from "../../../components/FormStyle";
import Asynchronous, { AsyncSearch } from "../../../components/AsyncSearch";
import {
  TextField,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import { Link } from "react-router-dom";
import UseAutocomplete from "../../../components/AsyncSearch";
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
  const [subMenu, setSubMenu] = useState(null); // Added state for sub-menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const navigate = useNavigate();

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

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearchIconClick = (event) => {
    if (anchorEl) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClick = (event, subMenu) => {
    setMenuAnchorEl(event.currentTarget);
    setSubMenu(subMenu);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
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

  const menuItems = [
    { label: "DIRECTORY", to: "/directory", subMenu: null },
    { label: "IDEAS & TOP LISTS", to: "/ideas-topLists", subMenu: null },

    { label: "REGISTRY", to: "/registry", subMenu: null },
    { label: "SPECIALS", to: "/specials", subMenu: null },
    {
      label: "FEATURED",
      to: null,
      subMenu: [
        { label: "Naufal-test", onClick: () => alert("Option A") },
        { label: "ABIA-DEMO", onClick: () => alert("Option B") },
        { label: "Austrialia", onClick: () => alert("Option C") },
        { label: "Northern Teritory", onClick: () => alert("Option D") },
        { label: "Queensland", onClick: () => alert("Option E") },
      ],
    },
    { label: "AWARDS", to: "/awards", subMenu: null },
  ];

  return (
    <div>
      <div className="login-navbar-style relative">
        <div className="">
          <MenuItems />
        </div>
        <div className="login-logo cursor-pointer" onClick={handleLogoClick}>
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
                    <ListItem key={index}>
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
            <UseAutocomplete />
          </div>
        </div>
      </div>
      {/* Subheaders */}
      <div className="navbar-subhead-large relative">
        <ul className="login-subheaders absolute ">
          {menuItems.map((menuItem, index) => (
            <li className="nav-menu-list" key={index}>
              {menuItem.subMenu ? (
                <div>
                  <NavMenuStyle
                    id={`${menuItem.label.toLowerCase()}-menu`}
                    aria-controls={menuAnchorEl ? "sub-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuAnchorEl ? "true" : undefined}
                    onClick={(event) =>
                      handleMenuClick(event, menuItem.subMenu)
                    }
                  >
                    {menuItem.label}
                  </NavMenuStyle>
                  <Menu
                    id="sub-menu"
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": `${menuItem.label.toLowerCase()}-menu`,
                    }}
                  >
                    {menuItem.subMenu.map((subMenuItem, subIndex) => (
                      <MenuItem key={subIndex} onClick={subMenuItem.onClick}>
                        {subMenuItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <Link to={menuItem.to}>{menuItem.label}</Link>
              )}
            </li>
          ))}
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
