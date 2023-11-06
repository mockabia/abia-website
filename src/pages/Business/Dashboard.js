import React, { useContext, useState } from "react";
import TopBar from "../../layouts/sidebar/TopBar";

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
