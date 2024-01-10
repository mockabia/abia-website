import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const LayoutGeneral = (props) => {
  return (
    <main className="flex flex-col min-h-screen overflow-y-auto overflow-x-hidden">
      <NavBar {...props} />
      <section className="flex-grow overflow-auto">{props.children}</section>
      <Footer {...props} />
    </main>
  );
};
export default LayoutGeneral;
