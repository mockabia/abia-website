import { useEffect, useRef, useState } from "react";
// import { GrMenu } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import "./css/TopBar.css";
import { ReactComponent as UserIcons } from "../../icons/contact topbar.svg";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import GetReview from "../../icons/getReview";
import { ReactComponent as ManageReview } from "../../icons/manage-reviews.svg"; //Manage Reviews
import { ReactComponent as ShowCase } from "../../icons/showcase.svg"; //Manage Reviews
import { ReactComponent as Promotions } from "../../icons/promotions.svg";
import { ReactComponent as ShopIcon } from "../../icons/shop.svg";
import { ReactComponent as EnquiryIcon } from "../../icons/enquiries.svg";
import { ReactComponent as MyProfileICon } from "../../icons/my-profile.svg";
import { ReactComponent as SettingsIcons } from "../../icons/settings.svg";
import { RxTriangleDown } from "react-icons/rx";
import { ReactComponent as MenuIcon } from "../../icons/menuIcon.svg";
import { ReactComponent as AbiaLogo } from "../../ABIA-White-Logo-gold-crown(1).svg";
import AbiaLogo1 from "../../abiaLogo";
import * as GeneralJS from "../../pages/General/General";
//components

const TopBar = ({ title, logo }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 769 });

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

  //mobile
  const [menuOpen, setMenuOpen] = useState(false);
  //sidebar
  const [isActive, setIsActive] = useState(false);
  //submenu-showcase
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSeetingsSubmenu, setShowSettingsSubmenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const toggleSettingsSubMenu = () => {
    setShowSettingsSubmenu(!showSeetingsSubmenu);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    GeneralJS.logout(navigate)
  };
  return (
    <div
      ref={profileRef}
      className="bg-[#6cc2bc]  md:bg-[#fff] h-20  flex items-center justify-between fixed top-0 left-0 right-0 z-40 border-b border-[#6cc2bc] "
    >
      {!isMobile && (
        <div className="">
          <div className="md:ml-[30px] md:mt-[12px] relative">
            <div className="md:text-[25px] font-bold md:ml-[256px]">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      )}
      <div className="relative  ">
        <h1>test</h1>
      </div>

      <div className="relative w-[85px]  ml-[20px] md:hidden">
        <AbiaLogo1 />
      </div>

      <div className=" flex mt-[14px] md:mt-0 ">
        <button className="mr-4 focus:outline-none" onClick={toggleProfile}>
          <div className="relative ">
            <div className="absolute inset-0  bg-[#6cc2bc] w-[10px] h-[10px] md:w-[40px] md:h-[40px] mt-[-9px] rounded-full"></div>
            <UserIcons
              fill="#fff"
              className="w-[22px] relative z-10 md:text-[#6cc2bc] ml-[8.5px]  md:mr-10  "
            />
          </div>
        </button>
        {profileOpen && (
          <div className="dash-dropdown arrow-top">
            <ul className="">
              <li className="px-4 cursor-pointer">
                <span className=" text-[17px] font-bold">
                  ABC Cakes at...
                  {/* {auth.email} */}
                </span>
                <br></br>
                <span className="text-[15px]">
                  info@abccakesmel.co
                  {/* {auth.email} */}
                </span>
              </li>
              <li className="px-4  text-[15px] cursor-pointer">
                Account Details
              </li>

              <li
                className="px-4 text-[15px] cursor-pointer flex items-center font-semibold"
                onClick={handleLogout}
              >
                <button>Log Out</button>
              </li>
            </ul>
          </div>
        )}

        {/* mobile mode */}
        <button className="mr-7 md:hidden" onClick={toggleMenu}>
          <MenuIcon size={28} className=" mt-[2px] stroke-[#fff]" />
        </button>
        {menuOpen && (
          <>
            <div className="fullscreen-overlay md:hidden mt-[15px]">
              <div className="menu-container ">
                <div className="flex items-center justify-center relative">
                  <AbiaLogo
                    width={80}
                    alt="Abia-logo"
                    className="-ml-[60px] fixed top-5 left-50"
                  />
                  <div>
                    <div
                      className="ipad-mini relative inset-0  bg-[#4b817e] w-[30px] h-[30px]  ml-[63vw] mt-[9px] rounded-full"
                      onClick={closeMenu}
                    >
                      <AiOutlineClose
                        size={20}
                        className=" mt-[5px] ml-[5px] fixed top-6 "
                      />
                    </div>
                  </div>
                </div>
                <ul className="mt-[100px] flex flex-col sm:justify-center  sm:mr-[85px] ">
                  {/* sm:items-center */}
                  <li className="mb-5 ">
                    <NavLink to={"/home"} onClick={closeMenu}>
                      <div className="flex gap-5">
                        <HomeIcon className=" w-5 h-5 fill-current text-[#fff]" />
                        Home
                      </div>
                    </NavLink>
                    {/* <hr className="hr-line" /> */}
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/get-reviews"} onClick={closeMenu}>
                      <div className="flex gap-5">
                        <GetReview className=" w-5 h-5 fill-current text-[#fff]" />
                        Get reviews
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/manage-review"} onClick={closeMenu}>
                      <div className="flex gap-5 ">
                        <ManageReview className="w- h-5 fill-current text-[#fff] " />
                        Manage reviews
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-5 relative">
                    <div className="flex  " onClick={toggleSubMenu}>
                      <NavLink className="flex gap-5">
                        <ShowCase className="w-5 h-5 fill-current text-[#fff]" />
                        Showcase
                      </NavLink>

                      <RxTriangleDown className="fixed ml-[79vw]" size={25} />
                    </div>
                    {showSubMenu && (
                      <div>
                        <ul className="ml-[41px] mt-4 ">
                          <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-4"
                          >
                            <NavLink
                              to={"/showcase/review-widget"}
                              onClick={closeMenu}
                            >
                              Review Widgets
                            </NavLink>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            // className="mb-4"
                          >
                            <NavLink
                              to={"/showcase/award-badges"}
                              onClick={closeMenu}
                            >
                              Award Badges
                            </NavLink>
                          </motion.li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/promotions"} onClick={closeMenu}>
                      <div className="flex gap-5">
                        <Promotions className="w-5 h-5 fill-current text-[#fff]" />
                        Promotions
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/shop"} onClick={closeMenu}>
                      <div className="flex gap-5 ">
                        <ShopIcon className="w-5 h-5 fill-current text-[#fff]" />
                        Shop
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/enquiries"} onClick={closeMenu}>
                      <div className="flex gap-5 ">
                        <EnquiryIcon className="w-5 h-5 fill-current text-[#fff]" />
                        Enquiries
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/my-profile"} onClick={closeMenu}>
                      <div className="flex gap-5 ">
                        <MyProfileICon className="w-5 h-5 fill-current text-[#fff]" />
                        My Profile
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-5">
                    <NavLink to={"/settings"} onClick={closeMenu}>
                      <div className="flex gap-5 ">
                        <SettingsIcons className="w-5 h-5 fill-current text-[#fff]" />
                        Settings
                      </div>
                    </NavLink>
                  </li>
                  {/* <li className="mb-5 relative">
                    <div className="flex  " onClick={toggleSettingsSubMenu}>
                      <NavLink className="flex gap-5">
                        <SettingsIcons className="w-5 h-5 fill-current text-[#fff]" />
                        Settings
                      </NavLink>

                      <RxTriangleDown className="fixed ml-[79vw]" size={25} />
                    </div>
                    {showSeetingsSubmenu && (
                      <div>
                        <ul className="ml-[41px] mt-4 ">
                          <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-4"
                          >
                            <NavLink
                              to={"/settings/business-settings"}
                              onClick={closeMenu}
                            >
                              Business Settings
                            </NavLink>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            // className="mb-4"
                          >
                            <NavLink
                              to={"/settings/update-listing"}
                              onClick={closeMenu}
                            >
                              Update Listing
                            </NavLink>
                          </motion.li>
                        </ul>
                      </div>
                    )}
                  </li> */}
                </ul>
                <div className="mt-[65px] space-y-2">
                  <div className="mb-[10px]">
                    <span className="text-sm text-white ml-2">
                      Your Plan: Free
                    </span>
                  </div>
                  <Link
                    to="/upgarade"
                    className=" rounded-3xl bg-[#e8cf82] px-6 py-2 "
                    onClick={closeMenu}
                  >
                    <span className="text-black text-sm font-bold">
                      {" "}
                      Upgrade Now
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
