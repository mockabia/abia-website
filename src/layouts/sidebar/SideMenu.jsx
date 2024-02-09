import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as HomeIcon } from "../../icons/home.svg"; //home
import { ReactComponent as ManageReview } from "../../icons/manage-reviews.svg"; //Manage Reviews
import { ReactComponent as ShowCase } from "../../icons/showcase.svg"; //Manage Reviews
import { ReactComponent as Promotions } from "../../icons/promotions.svg";
import { ReactComponent as ShopIcon } from "../../icons/shop.svg";
import { ReactComponent as EnquiryIcon } from "../../icons/enquiries.svg";
import { ReactComponent as SettingsIcons } from "../../icons/settings.svg";
import { ReactComponent as MyProfileIcon } from "../../icons/my-profile.svg";
import { ReactComponent as GetREviewIcon } from "../../icons/getReview-2.svg";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import "./css/sideBar.css";

const SideMenu = (props) => {
  const [showSubMenu, setShowSubMenu] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleSubMenu = (id) => {
    setShowSubMenu({
      [id]: !showSubMenu[id],
    });
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const menuIcons = {
    Home: HomeIcon,
    "Get Reviews": GetREviewIcon,
    "Manage Reviews": ManageReview,
    Showcase: ShowCase,
    Promotions: Promotions,
    Shop: ShopIcon,
    Enquiries: EnquiryIcon,
    "My Profile": MyProfileIcon,
    Settings: SettingsIcons,
  };
  let excludeArrays = [1, 2, 3];
  return (
    <>
      {props.menu.map((MainMenu, i) => (
        <>
          {!excludeArrays.includes(MainMenu.id) && (
            <li>
              {MainMenu.Sub_content.length <= 0 ? (
                <div className="">
                  <NavLink
                    to={MainMenu.url}
                    className="sidebarMenuItem"
                    onClick={props.onMenuLinkClick}
                  >
                    <div className="flex gap-[2rem] ml-[1rem]">
                      {menuIcons[MainMenu.title] &&
                        React.createElement(menuIcons[MainMenu.title], {
                          className:
                            "mt-[2px] w-[18px] h-[18px] fill-current text-[#fff]",
                        })}
                      <h5 className="truncate">{MainMenu.title}</h5>
                    </div>
                  </NavLink>
                </div>
              ) : (
                <div
                  className="flex justify-between  sidemenuwithSub"
                  onClick={() => {
                    toggleSubMenu(MainMenu.id);
                  }}
                >
                  <div className="flex gap-[2rem] ml-[1rem]">
                    {menuIcons[MainMenu.title] &&
                      React.createElement(menuIcons[MainMenu.title], {
                        className:
                          "mt-[2px] w-[18px] h-[18px] fill-current text-[#fff]",
                      })}
                    <h5 className="truncate pt-[8px] pb-[8px]">
                      {MainMenu.title}
                    </h5>
                  </div>
                  <div className="">
                    {showSubMenu[MainMenu.id] ? (
                      <RxTriangleUp className="" size={25} />
                    ) : (
                      <RxTriangleDown className="" size={25} />
                    )}
                  </div>
                </div>
              )}
              {showSubMenu[MainMenu.id] && MainMenu.Sub_content.length > 0 && (
                <div>
                  <ul className="ml-[3.5rem]  ">
                    {MainMenu.Sub_content.map((SubMenu, i) => (
                      <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-0"
                      >
                        <NavLink
                          className="sublink"
                          to={SubMenu.url}
                          onClick={closeMenu}
                        >
                          <h5>{SubMenu.title}</h5>
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )}
        </>
      ))}
    </>
  );
};
export default SideMenu;
