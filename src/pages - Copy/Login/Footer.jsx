import React from "react";
import "./Footer.css";

import { ReactComponent as FBIcon } from "../../icons/facebook.svg";
import { ReactComponent as InstaIcon } from "../../icons/instagram.svg";
import { ReactComponent as PinterestIcon } from "../../icons/pinterest.svg";
// import { ReactComponent as AbiaLogo } from "../../abialogo.svg";
import AbiaLogo from "../../abiaLogo";

const Footer = () => {
  return (
    <div className="bg-[#000]">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="logo-adjust cursor-pointer">
            <AbiaLogo />
          </div>
        </div>
        <div className="flex justify-between gap-[20px] lg:gap-[35px]">
          <div className="footer-content-1">
            <ul>
              <div className="footer-text">Wedding Directory</div>
              <div className="footer-text">Wedding Awards</div>
              <div className="footer-text">Wedding Reviews</div>
            </ul>
          </div>
          <div className="lg:block"></div>
          <div className="lg:block"></div>
          <div className="footer-content-2">
            <ul>
              <div className="footer-text">About ABIA</div>
              <div className="footer-text">Contact ABIA</div>
            </ul>
          </div>
        </div>

        <div className="footer-content-3 ">
          <div className="footer-text">Terms & Conditions</div>
          <div className="border h-[20px] text-[#fff]"></div>
          <div className="footer-text">Privacy Policy</div>
        </div>
        <div className="footer-content-3-desktop ">
          <div className="footer-text">Terms & Conditions</div>
          <div className="footer-text">Privacy Policy</div>
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
