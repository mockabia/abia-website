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
import CoupleSideMenu from "./CoupleSideMenu";

const CoupleMenu = (props) => {
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
        <div className="flex flex-col mt-[2rem]  h-full text-white relative">
          <ul className="ml-[1rem] space-y-2">
            <CoupleSideMenu {...props} />
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default CoupleMenu;

// import React from "react";
// import {
//   Sidebar,
//   Menu,
//   MenuItem,
//   useProSidebar,
//   SubMenu,
// } from "react-pro-sidebar";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import "./css/CoupleMenu.css";
// import { Link } from "react-router-dom";

// const CoupleMenu = () => {
//   const { collapseSidebar } = useProSidebar();

//   const vendorMenus = [
//     {
//       label: "Dashboard",
//       path: "/wedding/dashbaord",
//       icon: <HomeOutlinedIcon />,
//     },
//     {
//       label: "Account Details",
//       path: "/wedding/account",
//       icon: <HomeOutlinedIcon />,
//       submenu: [
//         { label: "Contact Details", path: "/wedding/account/contact" },
//         { label: "Wedding Details", path: "/wedding/account/wedding-details" },
//         { label: "Account Settings", path: "/wedding/account/settings" },
//       ],
//     },
//     {
//       label: "My Profile",
//       path: "/wedding/profile",
//       icon: <HomeOutlinedIcon />,
//     },
//     {
//       label: "Vendors",
//       path: "/wedding/vendors",
//       icon: <HomeOutlinedIcon />,
//     },
//     {
//       label: "Blogs",
//       path: "/wedding/blogs",
//       icon: <HomeOutlinedIcon />,
//     },

//     {
//       label: "Planning Tools",
//       path: "/wedding/account",
//       icon: <HomeOutlinedIcon />,
//       submenu: [
//         { label: "Item one", path: "/wedding/planning-tools/itemone" },
//         {
//           label: "Item Twos",
//           path: "/wedding/planning-tools/itemTwo",
//         },
//       ],
//     },
//   ];
//   return (
//     <div style={({ height: "100vh" }, { display: "flex" })}>
//       <Sidebar
//         backgroundColor="#6cc2bc"
//         color="#fff"
//         style={{ height: "100vh", zIndex: "100" }}
//       >
//         <Menu style={{ height: "100vh", color: "#fff" }}>
//           <MenuItem
//             icon={<MenuOutlinedIcon />}
//             onClick={() => {
//               collapseSidebar();
//             }}
//             style={{ textAlign: "center", height: "6rem" }}
//           >
//             <h2>ABIA</h2>
//           </MenuItem>
//           {/* Dynamically generate vendor menu items */}
//           {vendorMenus.map((vendorMenu, index) => (
//             <React.Fragment key={index}>
//               {vendorMenu.submenu ? (
//                 <SubMenu label={vendorMenu.label} icon={vendorMenu.icon}>
//                   {vendorMenu.submenu.map((submenuItem, subIndex) => (
//                     <MenuItem key={subIndex}>
//                       <Link to={submenuItem.path}>{submenuItem.label}</Link>
//                     </MenuItem>
//                   ))}
//                 </SubMenu>
//               ) : (
//                 <MenuItem icon={vendorMenu.icon} className="menu-item">
//                   <Link to={vendorMenu.path}>{vendorMenu.label}</Link>
//                 </MenuItem>
//               )}
//             </React.Fragment>
//           ))}
//         </Menu>
//       </Sidebar>
//     </div>
//   );
// };

// export default CoupleMenu;

//  <div className="couple-sidemenu">
//    <div className="flex">
//      <ul className="couple-menu-list">
//        <il>Contact Dstails</il>
//        <il>Contact Dstails</il>
//        <il>Contact Dstails</il>
//        <il>Contact Dstails</il>
//        <il>Contact Dstails</il>
//        <il>Contact Dstails</il>
//      </ul>
//    </div>
//  </div>;
