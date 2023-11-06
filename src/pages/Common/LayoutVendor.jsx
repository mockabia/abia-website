import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const LayoutVendor = (props) => {
  return (
    <main className="h-[100%] flex flex-col overflow-y-auto">
      <NavBar className="" />
      <section className="login-main-container">
        { props.children }
      </section>
      <Footer />
    </main>
  );
};
export default LayoutVendor;
