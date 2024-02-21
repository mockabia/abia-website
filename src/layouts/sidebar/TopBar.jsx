import { useEffect, useRef, useState } from "react";
// import { GrMenu } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import SideMenu from "./SideMenu";
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
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { ReactComponent as MenuIcon } from "../../icons/menuIcon.svg";
import { ReactComponent as AbiaLogo } from "../../ABIA-White-Logo-gold-crown(1).svg";
import AbiaLogo1 from "../../abiaLogo";
import * as BusinessJS from "../../pages/Business/Business";
//components

const TopBar = (props) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [userProfile, setUserProfile] = useState({});

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
  useEffect(() => {
    let token = localStorage.getItem("vendorToken");
    if (token !== undefined && token !== "undefined") {
      token = JSON.parse(token);
      let userSession = token && token.user ? token.user : null;
      setUserProfile(userSession);
    }
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
  const handleVendorLogout = () => {
    BusinessJS.logout(props.setLoginStatus,navigate);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuLinkClick = () => {
    closeMenu();
  };
  return (
    <div
      ref={profileRef}
      className="bg-[#6cc2bc]  md:bg-[#fff] h-[6rem]  flex items-center justify-between fixed top-0 left-0 right-0 z-40 border-b border-[#6cc2bc] "
    >
      {!isMobile && (
        <div className="">
          <div className="md:ml-[30px] md:mt-[12px] relative">
            <div className="md:text-[25px] font-bold md:ml-[256px]">
              <h1>{props.title}</h1>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={handleLogoClick}
        className="relative w-[85px]  ml-[20px] md:hidden cursor-pointer"
      >
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
                  {" "}
                  {userProfile.name}{" "}
                </span>
                <br></br>
                <span className="text-[15px]"> {userProfile.email} </span>
              </li>

              <li className="px-4  text-[15px] cursor-pointer">
                <Link to={`${window.VDASHBOARD}`}> DASHBOARD </Link>
              </li>
              <li
                className="px-4 text-[15px] cursor-pointer flex items-center font-semibold"
                onClick={handleVendorLogout}
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
                {/* Logo + close button */}
                <div className="flex items-center justify-between p-[10px] pr-[2rem] relative">
                  <AbiaLogo width={80} alt="Abia-logo" />
                  <div>
                    <div onClick={closeMenu}>
                      <AiOutlineClose
                        size={20}
                        className=" mt-[5px] ml-[5px] fixed top-6 "
                      />
                    </div>
                  </div>
                </div>
                <ul className="mt-[3rem] ">
                  <SideMenu {...props} onMenuLinkClick={handleMenuLinkClick} />
                </ul>
                <div onClick={handleMenuLinkClick}>
                  <Link
                    to={window.UPGRADE}
                    className="flex flex-col mx-[1rem] my-[3rem] gap-[10px] cursor-pointer"
                  >
                    <span className="text-sm text-white ml-2 ">
                      Your Plan: Free
                    </span>
                    <div className=" rounded-3xl bg-[#e8cf82] px-5 py-2 mb-2 w-[9rem] flex justify-center items-center ">
                      <span className="text-black text-[14px] font-bold">
                        {" "}
                        Upgrade Now
                      </span>
                    </div>
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
