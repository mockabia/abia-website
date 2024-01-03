import React, { useState } from "react";
import "./MenuItems.css";

import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import SignUpDropDown from "./SignUpDropDown";
import AbiaLogo from "../../logo.png";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiFillCaretDown } from "react-icons/ai";
import styled from "@emotion/styled";

// const CoupleInput = styled(TextField)(({ theme }) => ({

// const AccordionMenuStyle = styled(Accordion)(({ theme }) => ({
//   "& .MuiAccordion-root": {
//     border: "none",
//     boxShadow: "none",
//   },
//   "& .css-16jnori-MuiPaper-root-MuiAccordion-root": {
//     boxShadow: "none",
//   },
// }));

const MenuItems = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

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
      <Menu isOpen={menuOpen} onStateChange={handleStateChange}>
        <div className="block w-[085px]">
          <div className="mobile-menu-logo">
            <img src={AbiaLogo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mt-[25px] mb-[140px]">
            {props.menuItems.map((menuItem, index) => (
              <React.Fragment key={index}>
                {menuItem.Sub_content.length > 0 ? (
                  <Accordion
                    expanded={expandedItem === index}
                    onChange={() => handleAccordionChange(index)}
                    className="customAccordionPaper"
                  >
                    <AccordionSummary
                      expandIcon={<AiFillCaretDown className="ml-2" />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      {menuItem.title}
                    </AccordionSummary>
                    <AccordionDetails className="pl-[1rem]">
                      {menuItem.Sub_content.map((subMenuItem, subIndex) => (
                        <Link
                          key={subIndex}
                          onClick={closeMenu}
                          className="mobile-menu-item submenu-item border-b-2"
                          to={`/${menuItem.main_url}/${subMenuItem.sub_url}`}
                        >
                          {subMenuItem.title}
                        </Link>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Link
                    onClick={closeMenu}
                    className="mobile-menu-item"
                    to={`/${menuItem.main_url}`}
                  >
                    {menuItem.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* LOGIN AND SIGNUP */}
          <hr />
          <div className="mt-[25px]">
            <Accordion
              className="customAccordionPaper"
              expanded={expandedItem === "login"}
              onChange={() => handleAccordionChange("login")}
              // className="border-none mb-[10px]"
            >
              <AccordionSummary>
                <span className="mobile-menu-login">Login</span>
              </AccordionSummary>
              <AccordionDetails className="mobile-menu-accordionPanel">
                <Link to={window.VLOGIN} className="mobile-menu-option">
                  Vendor
                </Link>
                <Link to={window.CLOGIN} className="mobile-menu-option">
                  Couple
                </Link>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="customAccordionPaper"
              expanded={expandedItem === "signup"}
              onChange={() => handleAccordionChange("signup")}
            >
              <AccordionSummary>
                <span className="mobile-menu-signup">Sign Up</span>
              </AccordionSummary>
              <AccordionDetails className="mobile-menu-accordionPanel">
                <Link to={window.VSIGNUP} className="mobile-menu-option">
                  Vendor
                </Link>
                <Link to={window.CSIGNUP} className="mobile-menu-option">
                  Couple
                </Link>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default MenuItems;
