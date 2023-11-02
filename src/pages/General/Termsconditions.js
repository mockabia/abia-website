import React from "react";
import NavBar from "../Login/NavBar";
import Footer from "./Footer/Footer";
import "./styles.css";

const Termsconditions = () => {
  return (
    <div>
      <NavBar />
      <div className="termns-container">
        <div className="terms-header">Terms & Conditions</div>
      </div>
      <Footer />
    </div>
  );
};

export default Termsconditions;
