import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";

import * as servicesPage from "../../services/contentServices";

import LoginDropdown from "../../components/Login and Signup/LoginDropdown";
import SignUpDropDown from "../../components/Login and Signup/SignUpDropDown";
import MenuItems from "../../components/Login and Signup/PublicMenuItems";
import * as BusinessJS from "../../pages/Business/Business";
import * as CoupleJS from "../../pages/Couple/Couple";
import AbiaLogo from "../../abiaLogo";
import "../css/NavBar.css";

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

import UseAutocomplete from "../../components/AsyncSearch";
import styled from "@emotion/styled";

const NavBar = (props) => {
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
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const profileRef = useRef(null);
  const menuList = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("vendorToken");
    if (token !== undefined && token !== "undefined") {
      token = JSON.parse(token);
      let userSession = token && token.user ? token.user : null;
      setUserProfile(userSession);
    }
  }, []);

  const fetchHeaderMenus = () => {
    servicesPage.fetchHeaderMenus().then(function (response) {
      if (response.statuscode == 200) {
        setMenuItems(response.result);
      }
    });
  };

  useEffect(() => {
    fetchHeaderMenus();
    document.body.addEventListener("mousedown", function (e) {
      if (
        !e.target.classList.contains("MainwithSub") &&
        !e.target.classList.contains("subMenu-link")
      ) {
        handleMenuClose();
      }
    });
    return () => {
      //document.removeEventListener("mousedown", handleOutsideClick);
      document.body.addEventListener("mousedown", function (e) {
        if (
          !e.target.classList.contains("MainwithSub") &&
          !e.target.classList.contains("subMenu-link")
        ) {
          handleMenuClose();
        }
      });
    };
  }, []);

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

  const handleMenuClick = (mainId) => {
    setMenuAnchorEl({
      [mainId]: !menuAnchorEl[mainId],
      //[mainId]: true
    });
  };
  const handleMenuClose = (event) => {
    //if (profileRef.current && !profileRef.current.contains(event.target)) {
    setMenuAnchorEl({});
    //}
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
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };
  const handleVendorLogout = () => {
    BusinessJS.logout(navigate);
  };
  const handleCoupleLogout = () => {
    CoupleJS.logout(navigate);
  };

  return (
    <div className={`${props.showLoader ? "hidden" : ""} `}>
      <div className="login-navbar-style relative">
        <div className="">
          <MenuItems menuItems={menuItems} />
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
      <div className="navbar-subhead-large relative" ref={profileRef}>
        <ul className="login-subheaders absolute ">
          {menuItems.map((menuItem, index) => (
            <li
              className={`nav-menu-list ${
                menuItem.Sub_content.length > 0 ? "MainwithSub" : "MainOnly"
              } `}
              key={index}
              ref={menuList}
            >
              {menuItem.Sub_content.length > 0 ? (
                <div>
                  <span
                    className="flex MainwithSub"
                    onClick={() => handleMenuClick(menuItem.id)}
                  >
                    {menuItem.title}
                    {menuAnchorEl[menuItem.id] ? (
                      <RxTriangleUp className="" size={25} />
                    ) : (
                      <RxTriangleDown className="" size={25} />
                    )}
                  </span>

                  {menuAnchorEl[menuItem.id] && (
                    <ul
                      className={`subMenu ${
                        menuAnchorEl[menuItem.id] ? "block" : "hidden"
                      } `}
                    >
                      {menuItem.Sub_content.map((subMenuItem, subIndex) => (
                        <MenuItem
                          key={subIndex}
                          sx={{ borderBottom: "1px solid #D0D0D0" }}
                        >
                          <Link
                            className="subMenu-link"
                            to={`/${subMenuItem.url}`}
                            onClick={handleMenuClose}
                          >
                            {subMenuItem.title}
                          </Link>
                        </MenuItem>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={`/${menuItem.main_url}`}>{menuItem.title}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="login-signup-group">
          {userProfile && userProfile.name != "" ? (
            <>
              <button
                className="mr-4 focus:outline-none"
                onClick={toggleProfile}
              >
                <div className="relative ">
                  <div className="absolute inset-0  bg-[#6cc2bc] w-[10px] h-[10px] md:w-[40px] md:h-[40px] mt-[-9px] rounded-full"></div>
                  <UserIcons
                    fill="#fff"
                    className="w-[22px] relative z-10 md:text-[#6cc2bc] ml-[8.5px]  md:mr-10  "
                  />
                </div>
              </button>
              {profileOpen && (
                <div className="dash-dropdown arrow-top highZIndex">
                  <ul className="">
                    <li className="px-4 cursor-pointer">
                      <span className=" text-[17px] font-bold">
                        {" "}
                        {userProfile.name}{" "}
                      </span>
                      <br></br>
                      <span className="text-[15px]"> {userProfile.email} </span>
                    </li>{" "}
                    {localStorage.getItem("vendorToken") ? (
                      <>
                        <Link to={`${window.VDASHBOARD}`}>
                          <li className="px-4  text-[15px] cursor-pointer">
                            DASHBOARD
                          </li>
                        </Link>
                        <li
                          className="px-4 text-[15px] cursor-pointer flex items-center font-semibold"
                          onClick={handleVendorLogout}
                        >
                          <button>Log Out</button>
                        </li>
                      </>
                    ) : (
                      <>
                        <Link to={`${window.CDASHBOARD}`}>
                          <li className="px-4  text-[15px] cursor-pointer">
                            DASHBOARD
                          </li>
                        </Link>
                        <li
                          className="px-4 text-[15px] cursor-pointer flex items-center font-semibold"
                          onClick={handleCoupleLogout}
                        >
                          <button>Log Out</button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <LoginDropdown />
              <SignUpDropDown />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
