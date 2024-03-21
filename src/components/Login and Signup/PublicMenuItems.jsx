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
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import CouplesLogin from "../../pages/Couple/CouplesLogin";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
};

const MenuItems = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalOpen, seetModalOpen] = useState(false);

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
                          to={`/${
                            menuItem.main_url.endsWith("0")
                              ? menuItem.main_url.slice(0, -1)
                              : menuItem.main_url
                          }/${subMenuItem.sub_url}`}
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
            >
              <AccordionSummary>
                <span className="mobile-menu-login">Login</span>
              </AccordionSummary>
              <AccordionDetails className="mobile-menu-accordionPanel">
                <Link
                  to={window.VLOGIN}
                  onClick={closeMenu}
                  className="mobile-menu-option"
                >
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
                <Link
                  to={window.VSIGNUP}
                  className="mobile-menu-option"
                  onClick={closeMenu}
                >
                  Vendor
                </Link>
                <Link to={window.CSIGNUP} className="mobile-menu-option">
                  Couple
                </Link>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* <Box sx={style}>
            <CouplesLogin
              modalOpen={modalOpen}
              setModalOpen={seetModalOpen}
              handleClosePage={handleModalClose}
            />
            <CouplesLogin modalOpen={loginOpen} setModalOpen={setLoginOpen} />
          </Box> */}
        </div>
      </Menu>
    </div>
  );
};

export default MenuItems;
