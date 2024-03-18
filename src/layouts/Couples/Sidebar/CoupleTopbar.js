import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as AbiaLogo } from "../../../icons/ABIA-Weddings-Australia.svg";
import { ReactComponent as UserIcons } from "../../../icons/contact topbar.svg";
import { ReactComponent as MenuIcon } from "../../../icons/menuIcon.svg";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/CoupleTopbar.css";
import { SearchInputStyle } from "../../../components/FormStyle";
import CoupleSideMenu from "../../sidebar/CoupleSideMenu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as CoupleJS from "../../../pages/Couple/Couple";

const CoupleTopbar = (props) => {
  let navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:550px)");
  const isTablet = useMediaQuery("(min-width:551px) and (max-width:800px)");
  const isDesktop = useMediaQuery("(min-width:801px)");
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    let token = localStorage.getItem("coupleToken");
    if (token !== undefined && token !== "undefined") {
      token = JSON.parse(token);
      let userSession = token && token.user ? token.user : null;
      setUserProfile(userSession);
    }
  }, []);
  const getSpacing = () => {
    if (isMobile) return 2;
    if (isTablet) return 2;
    if (isDesktop) return 3;
    return 1; // Default spacing
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogoClick = () => {
    toggleProfile();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchIconClick = (event) => {
    if (anchorEl) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
      setSearchOpen(true);
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleCoupleLogout = () => {
    CoupleJS.logout(props.setLoginStatus, navigate);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  document.title = props.title;
  return (
    <div className="gap-[4px] md:gap-0 bg-[#5a9d98] md:bg-[#fff]  h-[6rem] fixed top-0 left-0 right-0 z-40 border-b border-[#6cc2bc] flex items-center justify-between p-4">
      <div className="flex justify-center items-center gap-1">
        <button className="md:hidden" onClick={toggleMenu}>
          <MenuIcon size={20} />
        </button>
        <div className="relative lg:ml-[19rem] cursor-pointer ">
          {props.title ? (
            <h3 className="title-topbar">{props.title}</h3>
          ) : (
            <AbiaLogo alt="Abia-logo" />
          )}
        </div>
      </div>

      {/* <h1 className="title-topbar">{title}</h1> */}

      <div className="relative">
        <Stack direction="row" spacing={getSpacing()} alignItems="center">
          <div>
            <SearchInputStyle
              variant="outlined"
              type="text"
              name="search_category"
              placeholder="find wedding vendors...."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchOutlinedIcon
                        sx={{
                          fill: "var(--search-icon-fill)",
                          fontSize: "1.75rem",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="cursor-pointer">
            {" "}
            <Link to={window.CHAT}>
              <ChatBubbleOutlineOutlinedIcon
                sx={{ fill: "var(--navbar-icon-fill)", size: "20px" }}
              />
            </Link>
          </div>
          <div className="cursor-pointer">
            <NotificationsOutlinedIcon
              sx={{ fill: "var(--navbar-icon-fill)", size: "20px" }}
            />
          </div>

          {/* usericon */}
          <button className=" focus:outline-none" onClick={handleLogoClick}>
            <div className="relative ">
              <div className="absolute inset-0  bg-[#5a9d98] w-[10px] h-[10px] md:w-[40px] md:h-[40px] mt-[-9px] rounded-full"></div>
              <UserIcons
                fill="#fff"
                className="w-[20px] relative z-10 md:text-[#5a9d98] md:ml-[9.5px]  md:mr-10  "
              />
            </div>
          </button>

          {profileOpen && (
            <div className="couple-dropdown arrow-top" ref={profileRef}>
              <ul className="">
                <li className="px-4 cursor-pointer">
                  <span className=" text-[14px] font-bold">
                    {userProfile.bride}{" "}
                  </span>
                  <br></br>
                  <span className="text-[12px]"> {userProfile.email} </span>
                </li>
                <Divider />
                {props.topMenu && props.topMenu.length > 0 && (
                  <>
                    {props.topMenu.map((topMenu, i) => (
                      <li className="px-4  text-[14px] cursor-pointer">
                        <NavLink to={topMenu.url}> {topMenu.title} </NavLink>
                      </li>
                    ))}
                  </>
                )}
                <Divider />
                <li
                  className="px-4 text-[14px] cursor-pointer flex items-center font-semibold"
                  onClick={handleCoupleLogout}
                >
                  <button>Log Out</button>
                </li>
              </ul>
            </div>
          )}
        </Stack>
      </div>

      {menuOpen && (
        <>
          <div className="couple-fullscreen-overlay md:hidden ">
            <div>
              <div className="flex justify-between items-center m-[1rem]">
                <div className="w-[6rem]">
                  <AbiaLogo alt="Abia-logo" />
                </div>
                <div
                  className="ipad-mini relative inset-0  w-[30px] h-[30px] mt-[1rem] rounded-full"
                  onClick={closeMenu}
                >
                  <AiOutlineClose size={22} className=" ml-[5px] fixed " />
                </div>
              </div>
              <ul className="mt-[50px] flex flex-col sm:justify-center  sm:mr-[85px] ">
                <CoupleSideMenu />
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoupleTopbar;

{
  /* searchicon */
}
{
  /* <div className="mobile-search-icon" onClick={handleSearchIconClick}>
  <FiSearch color="#fff" size={20} />
</div>;
{
  searchOpen && (
    <ThemeProvider theme={theme}>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="left"
        className="mobile-search-bar"
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
                  <ListItemText primary={option} className="border-b p-[3px]" />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Popper>
    </ThemeProvider>
  );
} */
}
