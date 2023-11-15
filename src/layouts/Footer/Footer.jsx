import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as servicesPage from "../../../services/contentServices";
import "../../Style/Footer.css";

import { ReactComponent as FBIcon } from "../../../icons/facebook.svg";
import { ReactComponent as InstaIcon } from "../../../icons/instagram.svg";
import { ReactComponent as PinterestIcon } from "../../../icons/pinterest.svg";
// import { ReactComponent as AbiaLogo } from "../../abialogo.svg";
import AbiaLogo from "../../../abiaLogo";

const Footer = () => {
  const [footerMenu, setFooterMenu] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCommonPageMenu();
  }, []);
  const fetchCommonPageMenu = async () => {
    await servicesPage.fetchFooterMenus().then(function (response) {
      if (response.statuscode == 200) {
        setFooterMenu(response.result);
      }
    });
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#000]">
      <div className="footer-container">
        <div className="footer-logo" onClick={handleLogoClick}>
          <div className="logo-adjust cursor-pointer">
            <AbiaLogo />
          </div>
        </div>
        <div className="footerMenus">
          <ul>
            {footerMenu.map((FooterMenu, i) => (
            //{Object.values(footerMenu).map((FooterMenu, i) => (
              <li className="footer-text">
                <NavLink to={`/${FooterMenu.url}`}>{FooterMenu.title} </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-social-icon">
          <a href="https://www.facebook.com/" alt="">
            <FBIcon className="w-[40px]" />
          </a>
          <a href="https://www.instagram.com/" alt="">
            <InstaIcon className="w-[40px]" />
          </a>
          <a href="https://www.pinterest.com/" alt="">
            <PinterestIcon className="w-[40px]" />
          </a>
        </div>
        <div className="footer-copyright lg:hidden">
          <span className="text-[#fff] ">
            Copyright 2023 ABIA Weddings Australia. All rights reserved.
          </span>
        </div>
      </div>
      <div className="footer-copyright-desktop">
        <span className="text-[#fff]">
          Copyright 2023 ABIA Weddings Australia. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
