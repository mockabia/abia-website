import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import { ReactComponent as MyProfile } from "../../icons/contact topbar.svg";
import { ReactComponent as BudgetIcon } from "../../icons/finance operation.svg";

import { ReactComponent as BlogIcon } from "../../icons/center alignment.svg";
import { ReactComponent as ShopIcon } from "../../icons/shop.svg";
import { ReactComponent as VendorIcon } from "../../icons/online-store.svg";

import { ReactComponent as EnquiryIcon } from "../../icons/enquiries.svg";
import { ReactComponent as SettingsIcons } from "../../icons/settings.svg";
import { ReactComponent as MyProfileIcon } from "../../icons/my-profile.svg";
import { ReactComponent as GetREviewIcon } from "../../icons/getReview-2.svg";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import "./css/sideBar.css";
import { Details, Home } from "@mui/icons-material";

const CoupleSideMenu = () => {
  const [showSubMenu, setShowSubMenu] = useState({});

  const toggleSubMenu = (id) => {
    setShowSubMenu({
      [id]: !showSubMenu[id],
    });
  };

  const closeMenu = () => {
    setShowSubMenu({});
  };

  const menuIcons = {
    Dashboard: HomeIcon,
    Vendor: VendorIcon,
    Profile: HomeIcon,
    "My Profile": MyProfile,
    Blog: BlogIcon,
    "Budget Tools": BudgetIcon,
  };

  const menuItems = [
    { id: 1, title: "Dashboard", url: "/wedding/dashboard", Sub_content: [] },
    {
      id: 2,
      title: "My Profile",
      //   url: "/vendors",
      Sub_content: [
        { title: "Contact Details", url: "/wedding/contact-details" },
        { title: "Wedding Details", url: "/wedding/details" },
        { title: "Account Settings", url: "/wedding/settings" },
      ],
    },
    { id: 3, title: "Vendor", url: "/wedding/enquiry", Sub_content: [] },

    {
      id: 4,
      title: "Budget Tools",
      url: "/wedding/wedding-budget",
      Sub_content: [],
    },
    { id: 5, title: "Blog", url: "/blog", Sub_content: [] },
  ];

  return (
    <>
      {menuItems.map((MainMenu) => (
        <li key={MainMenu.id}>
          {MainMenu.Sub_content.length <= 0 ? (
            <div className="">
              <NavLink to={MainMenu.url} className=" sidebarMenuItem">
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
              <div className="  flex gap-[2rem]  ml-[1rem] ">
                {menuIcons[MainMenu.title] &&
                  React.createElement(menuIcons[MainMenu.title], {
                    className:
                      "mt-[2px] w-[18px] h-[18px] fill-current text-[#fff]",
                  })}
                <h5 className="truncate ">{MainMenu.title}</h5>
              </div>
              <div className="">
                {showSubMenu[MainMenu.id] ? (
                  <RxTriangleUp className="" size={18} />
                ) : (
                  <RxTriangleDown className="" size={18} />
                )}
              </div>
            </div>
          )}
          {showSubMenu[MainMenu.id] && MainMenu.Sub_content.length > 0 && (
            <div className="">
              <ul className="ml-[3.5rem]   ">
                {MainMenu.Sub_content.map((SubMenu) => (
                  <motion.li
                    key={SubMenu.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-0 "
                  >
                    <NavLink
                      className="sublink "
                      to={SubMenu.url}
                    >
                      <h5>{SubMenu.title}</h5>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </>
  );
};

export default CoupleSideMenu;
