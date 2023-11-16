import React, { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaCrown } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import GetReview from "../../icons/getReview"; //get review
// svg
// import manageReview from "../../icons/manageReview";
import { ReactComponent as HomeIcon } from "../../icons/home.svg"; //home
import { ReactComponent as ManageReview } from "../../icons/manage-reviews.svg"; //Manage Reviews
import { ReactComponent as ShowCase } from "../../icons/showcase.svg"; //Manage Reviews
import { ReactComponent as Promotions } from "../../icons/promotions.svg";
import { ReactComponent as ShopIcon } from "../../icons/shop.svg";
import { ReactComponent as EnquiryIcon } from "../../icons/enquiries.svg";
import { ReactComponent as SettingsIcons } from "../../icons/settings.svg";
import { ReactComponent as MyProfileIcon } from "../../icons/my-profile.svg";
import { ReactComponent as GetREviewIcon } from "../../icons/getReview-2.svg";
// import { ReactComponent as AbiaLogo } from "../../ABIA-White-Logo-gold-crown (1).svg";

import { Link, NavLink, useLocation, useRoutes } from "react-router-dom";

//import upgradeNow from "../../pages/upgradeNow";

import * as reactUrls from "../../api/reactUrls";

//css
import "./css/sideBar.css";
import AbiaLogo from "../../abiaLogo";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  //icon active
  const [isActive, setIsActive] = useState(false);

  const sidebarRef = useRef();
  const { pathname } = useLocation();

  const handleNavLinkClick = () => {
    setIsActive(true);
  };
  const handleNavLinkBlur = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
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

  const subMenusList = reactUrls.BUSINESS_MENU["SHOWCASE"].secondaryMenu;

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-60 bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="fixed-sidebar bg-[#6cc2bc]  shadow-xl z-[9999] max-w-[16rem]  w-[16rem]
        overflow-hidden md:relative h-screen "
      >
        {/* <AbiaLogo /> */}
        <div className="border-b border-white py-[22px] w-full">
          <div className=" flex justify-center items-center">
            <div className="w-[86px]">
              <AbiaLogo alt="Abia-logo" />
            </div>
          </div>
        </div>
        <div className="flex flex-col  h-full text-white relative">
          <ul>
            {Object.values(reactUrls.BUSINESS_MENU).map((MainMenu, i) => (
              <>
                {MainMenu.menu !== false ? (
                  <li>
                    <NavLink
                      to={MainMenu.path}
                      className="link sidebarMenuItem"
                      activeClassName="active"
                    >
                      <div className="flex gap-5 ml-5">
                        {menuIcons[MainMenu.text] &&
                          React.createElement(menuIcons[MainMenu.text], {
                            className:
                              "mt-[2px] w-[18px] h-[18px] fill-current text-[#fff]",
                          })}
                        {MainMenu.text}
                      </div>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </>
            ))}
          </ul>

          <div className="mt-[30px] ml-[30px]">
            <div className="space-y-3">
              <div className="mb-2">
                <span className="text-sm text-white ml-2 ">
                  Your Plan: Free
                </span>
              </div>
              <Link
                to="/upgrade"
                className=" rounded-3xl bg-[#e8cf82] px-5 py-2 mb-2 "
              >
                <span className="text-black text-[14px] font-bold">
                  {" "}
                  Upgrade Now
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
