import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as servicesPage from "../../../services/contentServices";
import "../../Style/Footer.css";

import { ReactComponent as FBIcon } from "../../../icons/facebook.svg";
import { ReactComponent as InstaIcon } from "../../../icons/instagram.svg";
import { ReactComponent as PinterestIcon } from "../../../icons/pinterest.svg";
// import { ReactComponent as AbiaLogo } from "../../abialogo.svg";
import AbiaLogo from "../../../abiaLogo";

const Footer = () => {
  const [footerMenu, setFooterMenu] = useState({});

  useEffect(() => {
    fetchCommonPageMenu();
  }, []);
  const fetchCommonPageMenu = async () => {
    await servicesPage.fetchFooterMenus().then(function (response) {
      if (response.statuscode == 200) {
        setFooterMenu(response.result)
      }
    });
  };

  return (
    <div className="bg-[#000]">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="logo-adjust cursor-pointer">
            <AbiaLogo />
          </div>
        </div>
        <div className="footerMenus">
          <ul>
            {Object.values(footerMenu).map((FooterMenu, i) =>
              <li className="footer-text">
                  <NavLink to={`/${FooterMenu.url}`} >{FooterMenu.title} </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="flex justify-between gap-[20px] lg:gap-[35px]">
          <div className="footer-content-1">
            <ul>
              <div className="footer-text">
                <Link to={"/directory"}>Wedding Directory</Link>
              </div>
              <div className="footer-text">
                <Link to={"/awards"}>Wedding Awards</Link>
              </div>
              <div className="footer-text">
                <Link to={"/reviews"}>Wedding Reviews</Link>
              </div>
            </ul>
          </div>
          <div className="lg:block"></div>
          <div className="lg:block"></div>
          <div className="footer-content-2">
            <ul>
              <div className="footer-text">
                <Link to={"/about-us"}>About ABIA</Link>
              </div>
              <div className="footer-text">
                <Link to={"/contact-us"}>Contact ABIA</Link>
              </div>
            </ul>
          </div>
        </div>

        <div className="footer-content-3 ">
          <div className="footer-text">
            <Link to={"/terms-conditions"}>Terms & Conditions</Link>
          </div>
          <div className="border h-[20px] text-[#fff]"></div>
          <div className="footer-text">
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </div>
        </div>
        {/* Terms and conditions in Desktop */}
        <div className="footer-content-3-desktop ">
          <div className="footer-text">
            <Link to={"/terms-conditions"}>Terms & Conditions</Link>
          </div>
          <div className="footer-text">
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </div>
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
