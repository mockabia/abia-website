import { useEffect, useState } from "react";
import TopBar from "../sidebar/TopBar";
import BusinessMenu from "../sidebar/BusinessMenu";
import "../css/LayoutVendor.css"

const LayoutVendor = (props) => {
    return (
        <div className="relative flex">
            <TopBar />
            <div className="flex flex-1">
                <BusinessMenu />
                <main className="rootLayout">
                    {props.children}
                </main>
            </div>
        </div>
    );
};
export default LayoutVendor;
