import React, { useEffect, useState } from "react";
import "../../pages/Style/CoupleProfile.css";
import { NavLink, useLocation } from "react-router-dom";

const CoupleMenuList = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const index = getIndexFromPath(location.pathname);
    setActiveLink(index);
  }, [location.pathname]);

  const handleLinkClick = (index) => {
    console.log("Link clicked:", index);
    setActiveLink(index);
  };

  // Function to get index from pathname
  const getIndexFromPath = (pathname) => {
    return pathname === "/wedding/contact-details"
      ? 0
      : pathname === "/wedding/details"
      ? 1
      : pathname === "/wedding/settings"
      ? 2
      : null;
  };

  return (
    <main className="couple-menulist">
      <div className="couple-menuList-box">
        <span className="couple-menuList-header">YOUR ACCOUNT</span>
      </div>
      <ul>
        <li
          className={`couplemenuList-style ${
            activeLink === 0 ? "active-link" : ""
          }`}
        >
          <NavLink
            to="/wedding/contact-details"
            onClick={() => handleLinkClick(0)}
          >
            Contact Details
          </NavLink>
        </li>
        <li
          className={`couplemenuList-style ${
            activeLink === 1 ? "active-link" : ""
          }`}
        >
          <NavLink to="/wedding/details" onClick={() => handleLinkClick(1)}>
            Wedding Details
          </NavLink>
        </li>
        <li
          className={`couplemenuList-style ${
            activeLink === 2 ? "active-link" : ""
          }`}
        >
          <NavLink to="/wedding/settings" onClick={() => handleLinkClick(2)}>
            Account Settings
          </NavLink>
        </li>
      </ul>
    </main>
  );
};

export default CoupleMenuList;
