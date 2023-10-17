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
// import { ReactComponent as MenuIcon } from "../../icons/menuIcon.svg";
// import { AiOutlineClose } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

const MenuItems = () => {
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

  const menuItemsArray = [
    { label: "Directory", to: "/directory" },
    { label: "Ideas & Top List", to: "" },
    { label: "Registry", to: "" },
    { label: "Specials", to: "" },
    { label: "Features", to: "" },
    { label: "Awards", to: "" },
  ];

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
            {menuItemsArray.map((item, index) => (
              <Link
                key={index}
                onClick={closeMenu}
                className="mobile-menu-item"
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </div>

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
                  <Link to={"/login"} className="mobile-menu-option">
                    Vendor
                  </Link>
                  <Link to={"/wedding-login"} className="mobile-menu-option">
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
                  <Link to={"/signup"} className="mobile-menu-option">
                    Vendor
                  </Link>
                  <Link to={"/wedding-signup"} className="mobile-menu-option">
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
