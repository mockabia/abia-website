import React, { useEffect, useState } from "react";
import NavBar from "../Login/NavBar";
import Footer from "../Login/Footer";
import "./SignUp.css";

import MobileForm from "./MobileForm/MobileForm";
import DesktopForm from "./DesktopForm/DesktopForm";

const SignUp = () => {
  return (
    <>
      <div className="h-[100%]">
        <NavBar />

        <div className="h-[100%] lg:hidden">
          <MobileForm />
        </div>
        <div className=" desktop-form">
          <DesktopForm />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SignUp;
