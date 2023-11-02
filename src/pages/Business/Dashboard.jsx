import React, { useContext, useState } from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import AuthContext from "../../context/AuthProvider";
import LoginPage from "../Login/LoginPage";

const Home = () => {
  return (
    <>
      <TopBar title={`Welcome `} />
      {/* ${auth.email} */}

      <div>Vendor Home Page </div>
    </>
  );
};

export default Home;
