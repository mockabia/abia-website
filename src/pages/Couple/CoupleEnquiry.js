import React, { useState, useEffect } from "react";
import "../Style/CoupleEnquiry.css";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import RenderEnquiries from "./CoupleEnquiry/RenderEnquiries";
import * as CoupleJS from "./Couple";

const CoupleEnquiry = () => {
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState({});
  const [activeTab, setActiveTab] = useState("Active");
  const [data, setData] = useState([]);

  useEffect(() => {
    CoupleJS.coupleEnquiries(setData);
  }, []);
  console.log("Couple Enquiry:", data);

  const handleMenuClick = (mainId) => {
    setSubmenuAnchorEl({
      ...submenuAnchorEl,
      [mainId]: !submenuAnchorEl[mainId],
    });
  };

  const handleMenuClose = () => {
    setSubmenuAnchorEl({});
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const mainMenus = [
    {
      id: 1,
      item: "Wedding Directory",
      link: `${window.WEDDING_DIRECTORY}`,
    },
    {
      id: 2,
      item: "Enquiries",
    },
    {
      id: 3,
      item: "Booked vendors",
      link: `${window.BOOKING}`,
    },
  ];

  return (
    <>
      {/* main menu */}
      <div className="w-[100%]">
        <div className="main-menu-section">
          <ul className="enquiry-page-header ">
            {mainMenus.map((menuItem) => (
              <li
                key={menuItem.id}
                className={
                  menuItem.id == "2"
                    ? "underline decoration-4 decoration-[#6cc2bc]"
                    : ""
                }
              >
                <Link to={menuItem.link}>{menuItem.item}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* info content */}
        <div className="padding-position">
          <p className="flex justify-start items-start gap-[0.5rem] mt-[1rem]">
            <h6>Vendors typically respond within a few days </h6>
            <IoIosInformationCircleOutline fill="#000" size={16} />
          </p>
        </div>
        {/* Active or Archive header */}
        <div className="padding-position">
          <div>
            <ul className="enquiry-secondary-menu">
              <li
                className={activeTab === "Active" ? "active-tab" : ""}
                onClick={() => handleTabClick("Active")}
              >
                Active
              </li>
              <li
                className={activeTab === "Archive" ? "active-tab" : ""}
                onClick={() => handleTabClick("Archive")}
              >
                Archive
              </li>
            </ul>
          </div>
        </div>
        {/* when the above Active or Archive is clicked */}
        <main className="enquiry-active-list-mobile">
          {activeTab === "Active" && (
            <>
              {/*Active  Mobile */}
              {data && <RenderEnquiries data={data.all} />}
              {/* Detail box  */}
            </>
          )}
          {activeTab === "Archive" && (
            <>
              {data && (
                <RenderEnquiries archieved={true} data={data.archieved} />
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default CoupleEnquiry;
