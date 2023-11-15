import React, { useEffect, useState } from "react";
import NavBar from "../../pages/Common/NavBar/NavBar";
import Footer from "../../pages/Common/Footer/Footer";
   
const LayoutGeneral = (props) => {
  return (
    <main className="h-[100%] flex flex-col overflow-y-auto">
      <NavBar />
      <section className="login-main-container">{props.children}</section>
      <Footer />
    </main>
  );
};
export default LayoutGeneral;
