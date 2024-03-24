import React, { useState, useEffect } from "react";
import "./MenuItems.css";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import { slide as Menu } from "react-burger-menu";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import * as BusinessJS from "../../pages/Business/Business";
import * as CoupleJS from "../../pages/Couple/Couple";

import { ReactComponent as AbiaLogo } from "../../icons/abia-new-logo.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
};

// close button change of Burger menu
const CustomCloseIcon = () => {
  return <AiOutlineClose style={{ color: "#8e8e8e", fontSize: "24px" }} />;
};

const MenuItems = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalOpen, seetModalOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (profileRef.current && !profileRef.current.contains(event.target)) {
  //       setProfileOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  useEffect(() => {
    let vtoken = localStorage.getItem("vendorToken");
    let ctoken = localStorage.getItem("coupleToken");
    if (vtoken !== undefined && vtoken !== "undefined" && vtoken !== null) {
      vtoken = JSON.parse(vtoken);
      let userSession = vtoken && vtoken.user ? vtoken.user : null;
      setUserProfile(userSession);
    } else if (
      ctoken !== undefined &&
      ctoken !== "undefined" &&
      ctoken !== null
    ) {
      ctoken = JSON.parse(ctoken);
      let userSession = ctoken && ctoken.user ? ctoken.user : null;
      setUserProfile(userSession);
    } else {
      setUserProfile({});
    }
  }, [props.loginStatus]);

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };
  const handleVendorLogout = () => {
    BusinessJS.logout(props.setLoginStatus, navigate);
  };
  const handleCoupleLogout = () => {
    CoupleJS.logout(props.setLoginStatus, navigate);
  };

  // Login and signup dropdowns
  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  const toggleSignupDropdown = () => {
    setSignupDropdownOpen(!signupDropdownOpen);
  };

  const handleItemClick = (index) => {
    // Toggle the expanded state for the clicked menu item
    if (expandedItem === index) {
      setExpandedItem(null); // Collapse if already expanded
    } else {
      setExpandedItem(index); // Expand if collapsed
    }
  };

  const handleModalOpen = () => {
    seetModalOpen(true);
    setMenuOpen(false);
  };
  const handleModalClose = () => seetModalOpen(false);

  const handleAccordionChange = (itemIndex) => {
    setExpandedItem(expandedItem === itemIndex ? null : itemIndex);
  };

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="">
      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        customCrossIcon={<CustomCloseIcon />}
      >
        {/* Logo and Menu */}
        <div className="pb-[1rem] border-b-2">
          <div className="flex flex-col gap-[2rem]">
            <div className="mobile-menu-logo pb-[1rem] border-b-2 ">
              <AbiaLogo width="100%" />
              <hr />
            </div>

            <div className="">
              <ul className="flex flex-col gap-[1rem]">
                {props.menuItems.map((menuItem, index) => (
                  <React.Fragment key={index}>
                    {menuItem.Sub_content.length > 0 ? (
                      <div
                        onClick={() => handleItemClick(index)}
                        style={{ textTransform: "capitalize" }}
                      >
                        {menuItem.title.toLowerCase()}
                      </div>
                    ) : (
                      <Link
                        to={`/${menuItem.main_url}`}
                        // onClick={() => handleItemClick(index)}
                        style={{ textTransform: "capitalize" }}
                      >
                        {menuItem.title.toLowerCase()}
                      </Link>
                    )}
                    {menuItem.Sub_content.length > 0 &&
                      expandedItem === index && (
                        <div>
                          {menuItem.Sub_content.map((subMenuItem, subIndex) => (
                            <Link
                              key={subIndex}
                              onClick={closeMenu}
                              className="mobile-menu-item submenu-item border-b-2"
                              to={`/${
                                menuItem.main_url.endsWith("0")
                                  ? menuItem.main_url.slice(0, -1)
                                  : menuItem.main_url
                              }/${subMenuItem.sub_url}`}
                            >
                              {subMenuItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {/* LOGIN AND SIGNUP */}
          {Object.keys(userProfile).length > 0 &&
          userProfile &&
          userProfile.name != "" ? (
            <>
              <div className="flex gap-2 mb-[1rem]">
                {/* Usericon ubtton */}
                <button
                  className="mr-4 focus:outline-none"
                  onClick={toggleProfile}
                >
                  <div className="relative ">
                    <div className="absolute inset-0  bg-[#5a9d98] w-[40px] h-[40px]  mt-[-9px] rounded-full"></div>
                    <UserIcons
                      fill="#fff"
                      className="w-[22px] relative z-10 md:text-[#6cc2bc] ml-[8.5px]  "
                    />
                  </div>
                </button>
                <h4>
                  {" "}
                  {localStorage.getItem("vendorToken")
                    ? userProfile.name
                    : userProfile.bride}{" "}
                </h4>
              </div>
              <div>
                {localStorage.getItem("vendorToken") ? (
                  <>
                    <div className="flex flex-col gap-[1rem]">
                      <Link to={`${window.VDASHBOARD}`}>
                        <h4>Move to Dashboard</h4>
                      </Link>
                      <hr />
                      <h4
                        onClick={handleVendorLogout}
                        style={{ fontWeight: "600" }}
                      >
                        <button>Log Out</button>
                      </h4>
                    </div>
                  </>
                ) : localStorage.getItem("coupleToken") ? (
                  <>
                    <div className="flex flex-col gap-[1rem]">
                      <Link to={`${window.CDASHBOARD}`}>
                        <h4>Move to Dashboard</h4>
                      </Link>
                      <hr />
                      <h4
                        onClick={handleCoupleLogout}
                        style={{ fontWeight: "600" }}
                      >
                        <button>Log Out</button>
                      </h4>
                    </div>
                    {/* <Link to={`${window.CDASHBOARD}`}>
                      <li className="">DASHBOARD</li>
                    </Link>
                    <li className="" onClick={handleCoupleLogout}>
                      <button>Log Out</button>
                    </li> */}
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login and Signup section */}
              <div className="flex flex-col gap-[1rem] mt-[25px]">
                <div
                  className="mobile-menu-login"
                  onClick={toggleLoginDropdown}
                >
                  Login
                </div>
                {loginDropdownOpen && (
                  <ul className="mobile-menu-dropdown">
                    <li>
                      <Link
                        to={window.VLOGIN}
                        onClick={closeMenu}
                        className="mobile-menu-option"
                      >
                        Vendor
                      </Link>
                    </li>
                    <li>
                      <Link to={window.CLOGIN} className="mobile-menu-option">
                        Couple
                      </Link>
                    </li>
                  </ul>
                )}
                <div
                  className="mobile-menu-signup"
                  onClick={toggleSignupDropdown}
                >
                  Sign Up
                </div>
                {signupDropdownOpen && (
                  <ul className="mobile-menu-dropdown">
                    <li>
                      <Link
                        to={window.VSIGNUP}
                        onClick={closeMenu}
                        className="mobile-menu-option"
                      >
                        Vendor
                      </Link>
                    </li>
                    <li>
                      <Link to={window.CSIGNUP} className="mobile-menu-option">
                        Couple
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default MenuItems;

//  <ul className="flex flex-col gap-[1rem]">
//    {props.menuItems.map((menuItem, index) => (
//      <React.Fragment key={index}>
//        <div
//          onClick={() => handleItemClick(index)}
//          style={{ textTransform: "capitalize" }}
//        >
//          {menuItem.title.toLowerCase()}
//        </div>
//        {expandedItem === index && (
//          <div>
//            {menuItem.Sub_content.map((subMenuItem, subIndex) => (
//              <Link
//                key={subIndex}
//                onClick={closeMenu}
//                className="mobile-menu-item submenu-item border-b-2"
//                to={`/${
//                  menuItem.main_url.endsWith("0")
//                    ? menuItem.main_url.slice(0, -1)
//                    : menuItem.main_url
//                }/${subMenuItem.sub_url}`}
//              >
//                {subMenuItem.title}
//              </Link>
//            ))}
//          </div>
//        )}
//      </React.Fragment>
//    ))}
//  </ul>;
