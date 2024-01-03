import React from "react";
import CoupleTopbar from "../Couples/Sidebar/CoupleTopbar";
import CoupleMenu from "../sidebar/CoupleMenu";
import { ProSidebarProvider } from "react-pro-sidebar";
import "../css/LayoutCouple.css";
import CoupleMenuList from "../sidebar/CoupleMenuList";
import BusinessMenu from "../sidebar/BusinessMenu";

const LayoutCouple = (props) => {
  const { title } = props;

  return (
    <div className="relative flex">
      <div className="flex flex-1">
        <CoupleTopbar title={title} />
        <CoupleMenu />
        <main className="cRootLayout">
          <CoupleMenuList />
          {props.children}
        </main>
      </div>
    </div>
    // <div>LayoutCouple</div>
  );
};

export default LayoutCouple;
