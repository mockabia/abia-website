import React from "react";
import CoupleTopbar from "../Couples/Sidebar/CoupleTopbar";
import CoupleMenu from "../sidebar/CoupleMenu";
import { ProSidebarProvider } from "react-pro-sidebar";
import "../css/LayoutCouple.css";

const LayoutCouple = (props) => {
  const { title } = props;
  return (
    <div className="relative flex">
      <div className="flex flex-1">
        <CoupleTopbar title={title} />
        <CoupleMenu />
        <main className="cRootLayout2">{props.children}</main>
      </div>
    </div>
  );
};

export default LayoutCouple;
