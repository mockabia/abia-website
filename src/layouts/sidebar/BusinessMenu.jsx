import React, { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

import { useMediaQuery } from "react-responsive";
import { Link, NavLink, useLocation, useRoutes } from "react-router-dom";

//import upgradeNow from "../../pages/upgradeNow";

import SideMenu from "./SideMenu";

//css
import "./css/sideBar.css";
import AbiaLogo from "../../abiaLogo";

const Sidebar = (props) => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  //icon active
  // const [isActive, setIsActive] = useState(false);

  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const [showSubMenu, setShowSubMenu] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleNavLinkClick = () => {
  //   setIsActive(true);
  // };
  // const handleNavLinkBlur = () => {
  //   setIsActive(false);
  // };

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
        className="fixed-sidebar bg-[#6cc2bc]  shadow-xl z-[999] max-w-[16rem]  w-[16rem]
        overflow-hidden md:relative h-screen "
      >
        {/* <AbiaLogo /> */}
        <div className="border-b border-white py-[26.75px] w-full">
          <div className=" flex justify-center items-center">
            <Link to={"/"} className="vendor_abialogo">
              <AbiaLogo alt="Abia-logo" />
            </Link>
          </div>
        </div>
        {/* <pre style={{fontSize: "xx-small", }}>{JSON.stringify(props.leftmenu, null, 2)}</pre> */}
        <div className="flex flex-col mt-[2rem] h-full text-white relative">
          <ul className="space-y-2 ml-[1rem]">
            <SideMenu {...props} />
          </ul>
          <Link
            to={window.UPGRADE}
            className="flex flex-col mx-[1rem] my-[3rem] gap-[10px] cursor-pointer"
          >
            <span className="text-sm text-white ml-2 ">Your Plan: Free</span>
            <div className=" rounded-3xl bg-[#e8cf82] px-5 py-2 mb-2 w-[9rem] flex justify-center items-center ">
              <span className="text-black text-[14px] font-bold">
                {" "}
                Upgrade Now
              </span>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
