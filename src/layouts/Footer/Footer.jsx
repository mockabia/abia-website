import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as servicesPage from "../../services/contentServices";
import "../css/Footer.css";

import { ReactComponent as FBIcon } from "../../icons/facebook.svg";
import { ReactComponent as InstaIcon } from "../../icons/instagram.svg";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import { ReactComponent as PinterestIcon } from "../../icons/pinterest.svg";
import { ReactComponent as AbiaLogo } from "../../icons/ABIA-Weddings-Australia.svg";
import AbiaLogo2 from "../../icons/ABIA-Weddings-Australia.svg";

const Footer = (props) => {
  const [footerMenu, setFooterMenu] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCommonPageMenu();
  }, []);

  const fetchCommonPageMenu = async () => {
    await servicesPage.fetchFooterMenus().then(function (response) {
      if (response.statuscode == 200) {
        setFooterMenu(response.result);
        props.setShowLoader(false);
      }
    });
  };

  console.log("Footer menu:", footerMenu);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className={`${props.showLoader ? "" : ""} bg-[#000]  `}>
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo" onClick={handleLogoClick}>
          <img src={AbiaLogo2} className="logo-adjust cursor-pointer" />
        </div>
        {/* Menus */}
        <div>
          <ul className="footneru-section">
            {footerMenu.map((FooterMenu, i) => (
              //{Object.values(footerMenu).map((FooterMenu, i) => (
              <li>
                <NavLink
                  to={`/${FooterMenu.url}`}
                  style={{ textTransform: "capitalize", fontSize: "14px" }}
                >
                  {FooterMenu.title.toLowerCase()}{" "}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* social media and copyuright */}
        <div className="footer-social-icon">
          <div className="flex gap-[1rem]">
            <a href="https://www.facebook.com/" alt="">
              <FaFacebookF size={22} />
            </a>
            <a href="https://www.instagram.com/" alt="">
              <RiInstagramFill size={22} />
            </a>
          </div>
          <div className="footer-copyright">
            Copyright 2023 ABIA Weddings Australia. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
