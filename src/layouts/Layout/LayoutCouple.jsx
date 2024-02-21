import React from "react";
import CoupleTopbar from "../Couples/Sidebar/CoupleTopbar";
import "../css/LayoutCouple.css";
import CoupleMenuList from "../sidebar/CoupleMenuList";
import CoupleMenu from "../sidebar/CoupleMenu";

const LayoutCouple = (props) => {

  return (
    <div className="relative flex">
      <div className="flex flex-1">
        <CoupleTopbar {...props}/>
        <CoupleMenu {...props} />
        <main className="cRootLayout">
          {props.leftMenuShow ? (<CoupleMenuList />) : ''}
          {props.children}
        </main>
      </div>
    </div>
    // <div>LayoutCouple</div>
  );
};

export default LayoutCouple;
