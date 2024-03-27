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

const PublicMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalOpen, seetModalOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

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
     
        {/* Logo and Menu */}
        <div className="pb-[1rem]">
          <div className="flex flex-col gap-[2rem]">
            <div className="">
              <ul className="flex flex-col gap-[1rem]">
                {props.menuItems &&
                  props.menuItems.map((menuItem, index) => (
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
                            {menuItem.Sub_content.map(
                              (subMenuItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  onClick={closeMenu}
                                  className="mobile-menu-item submenu-item"
                                  to={`/${
                                    menuItem.main_url.endsWith("0")
                                      ? menuItem.main_url.slice(0, -1)
                                      : menuItem.main_url
                                  }/${subMenuItem.sub_url}`}
                                >
                                  {subMenuItem.title}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                    </React.Fragment>
                  ))}
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default PublicMenu;

// export default PublicMenu;
