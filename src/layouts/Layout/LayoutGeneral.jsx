import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const LayoutGeneral = (props) => {
  return (
    <main className="h-[100%] flex flex-col overflow-y-auto">
      <NavBar {...props} />
      <section className={`${props.showLoader ? "hidden" : ""} login-main-container `}>{props.children}</section>
      <Footer {...props} />
    </main>
  );
};
export default LayoutGeneral;
