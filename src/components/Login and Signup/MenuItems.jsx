import React, { useState } from "react";
import "./MenuItems.css";

import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import SignUpDropDown from "./SignUpDropDown";
import AbiaLogo from "../../logo.png";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { AiFillCaretDown } from "react-icons/ai";

const MenuItems = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const handleAccordionChange = (itemIndex) => {
    if (expandedItems.includes(itemIndex)) {
      setExpandedItems(expandedItems.filter((index) => index !== itemIndex));
    } else {
      setExpandedItems([...expandedItems, itemIndex]);
    }
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
                  <Accordion allowZeroExpanded className="border-none">
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton
                          onClick={() => handleAccordionChange(1)}
                          className="relative cursor-pointer w-[100%] flex items-center pb-[0.5rem]"
                        >
                          {menuItem.title}
                          <AiFillCaretDown className="ml-2" />
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        {menuItem.Sub_content.map((subMenuItem, subIndex) => (
                          <Link
                            key={subIndex}
                            onClick={closeMenu}
                            className="mobile-menu-item submenu-item"
                            to={`/${menuItem.main_url}/${subMenuItem.sub_url}`}
                          >
                            {subMenuItem.title}
                          </Link>
                        ))}
                      </AccordionItemPanel>
                    </AccordionItem>
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

          {/* LOGIN ANF SIGNUP */}
          <hr />
          <div className="mt-[25px]">
            <Accordion allowZeroExpanded className="border-none">
              <AccordionItem className="border-none mb-[10px]">
                <AccordionItemHeading>
                  <AccordionItemButton
                    onClick={() => handleAccordionChange(0)}
                    className="mobile-menu-login"
                  >
                    <span>Login</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel className="mobile-menu-accordionPanel">
                  <Link to={window.VLOGIN} className="mobile-menu-option">
                    Vendor
                  </Link>
                  <Link to={window.CLOGIN} className="mobile-menu-option">
                    Couple
                  </Link>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    onClick={() => handleAccordionChange(1)}
                    className="mobile-menu-signup"
                  >
                    <span>Sign Up</span>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="mobile-menu-accordionPanel">
                  <Link to={window.VSIGNUP} className="mobile-menu-option">
                    Vendor
                  </Link>
                  <Link to={window.CSIGNUP} className="mobile-menu-option">
                    Couple
                  </Link>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default MenuItems;
