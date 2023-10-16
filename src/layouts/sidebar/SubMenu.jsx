import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RxTriangleDown } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";
import "./sideBar.css";

const SubMenu = ({ data }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // const subMenuRef = useRef(null);
  const location = useLocation();
  const isSubmenuActive = location.pathname.includes(data.name.toLowerCase());

  //Click outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
  //       setSubMenuOpen(false);
  //     }
  //   };
  //   window.addEventListener("click", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);
  useEffect(() => {
    if (!isSubmenuActive) {
      setSubMenuOpen(false);
    }
  }, [isSubmenuActive, location.pathname]);

  const renderSubMenu = (menuList) => {
    return menuList.map((menu, index) => (
      <li key={menu}>
        <NavLink
          to={`/${data.name}/${menu.replace(" ", "-").toLowerCase()}`}
          className={`sublink ${
            data.name === "" ? " active submenu-style" : ""
          }`}
        >
          <div className="ml-[21px]">{menu}</div>
        </NavLink>
        {index !== menuList.length - 1 && <div className="submenu-line" />}
      </li>
    ));
  };

  return (
    <>
      <li
        className="link sidebarMenuItem"
        activeClassName="active"
        onClick={() => setSubMenuOpen(!subMenuOpen)}
        // ref={subMenuRef}
      >
        <data.icon
          className={`ml-[21px] w-[20px] h-[20px] fill-current text-${
            isActive ? "#6cc2bc" : "#fff"
          }`}
        />
        <div className="flex-1 ml-[2px] capitalize text-[15px] ">{data.name}</div>
        <RxTriangleDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
          size={20}
        />
      </li>

      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-[56px]  sidebarSubMenuItem font-nunito overflow-hidden submenu-list "
      >
        {renderSubMenu(data.menus)}
      </motion.ul>
    </>
  );
};

export default SubMenu;
