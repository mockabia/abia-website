import React, { useState } from "react";
import CoupleTopbar from "../../layouts/Couples/Sidebar/CoupleTopbar";
import LayoutCouple from "../../layouts/Layout/LayourCouple2";
import "../Style/CoupleEnquiry.css";
import { Link } from "react-router-dom";
import { Divider, MenuItem } from "@mui/material";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";
import {
  BlackLargeButton,
  BlackSmallButton,
  ColorSortButton,
} from "../../components/FormStyle";
import { AiOutlineClose } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import sampleProfile from "../../images/raymonds.png";

const CoupleEnquiry = () => {
  const title = "Enquiry";
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState({});
  const [activeTab, setActiveTab] = useState("Active");
  const [detailOpen, setDetailOpn] = useState(false);

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

  const toggleOpen = () => {
    setDetailOpn(!detailOpen);
  };

  const closeDetailOpen = () => {
    setDetailOpn(false);
  };

  const mainMenus = [
    {
      id: 1,
      item: "Wedding Directory",
      // link: "/wedding-directory",
      subitems: [
        {
          id: 101,
          item: "Subitem A",
          // link: "/wedding-directory/subitem-a",
        },
        {
          id: 102,
          item: "Subitem B",
          // link: "/wedding-directory/subitem-b",
        },
        {
          id: 103,
          item: "Subitem C",
          // link: "/wedding-directory/subitem-c",
        },
      ],
    },
    {
      id: 2,
      item: "Enquiries",
      // link: "/enquiries",
    },
    {
      id: 3,
      item: "Booked vendors",
      // link: "/booked-vendors",
    },
  ];

  return (
    <LayoutCouple title={title}>
      <section className="enqquiry-page-container">
        {/* main menu */}
        <div className="padding-position flex justify-start items-center border-b-[1px] border-[#b7b7b7]">
          <ul className="enquiry-page-header ">
            {mainMenus.map((menuItem) => (
              <li key={menuItem.id}>
                {menuItem.subitems ? (
                  <span
                    className="enquiry-mainwith-subitem"
                    onClick={() => handleMenuClick(menuItem.id)}
                  >
                    {menuItem.item}
                    {submenuAnchorEl[menuItem.id] ? (
                      <RxTriangleUp className="" size={25} />
                    ) : (
                      <RxTriangleDown className="" size={25} />
                    )}
                  </span>
                ) : (
                  <Link to={menuItem.link}>{menuItem.item}</Link>
                )}
                {submenuAnchorEl[menuItem.id] && menuItem.subitems && (
                  <ul
                    className={`enquiry-subMenu ${
                      submenuAnchorEl[menuItem.id] ? "block" : "hidden"
                    } `}
                  >
                    {menuItem.subitems.map((subitem) => (
                      <MenuItem
                        key={subitem.id}
                        sx={{ borderBottom: "1px solid #D0D0D0" }}
                      >
                        <Link
                          to={subitem.link}
                          className="enquiry-subMenu-link"
                          onClick={handleMenuClose}
                        >
                          {subitem.item}
                        </Link>
                      </MenuItem>
                    ))}
                  </ul>
                )}
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
        <div className="enquiry-active-list-mobile">
          {activeTab === "Active" && (
            <>
              {/*Active  Mobile */}
              <div className="active-enquiry-mobile">
                <div
                  className=" flex justify-between items-center gap-[1rem]"
                  onClick={toggleOpen}
                >
                  {/* image section and Heading */}
                  <div className="flex items-center gap-[1rem]">
                    <img src={sampleProfile} className="enquiry-vendor-image" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[#000]">Raymonds</h3>
                      <div>
                        <h5>Dresses</h5>
                      </div>
                    </div>
                  </div>

                  {/* Reply button */}
                  <div className="cursor-pointer">
                    <BlackSmallButton>
                      <h6>Reply</h6>
                    </BlackSmallButton>
                  </div>
                </div>
                {/* Status */}
                <div className="mt-[0.5rem]">
                  <div className="enquiry-status-mobile">
                    <div className="flex items-center gap-3">
                      <TfiEmail />
                      <div className="flex gap-[1rem]">
                        <h6>11/4/2023</h6>
                        <h6>Vendor Replied</h6>
                      </div>
                    </div>

                    <div className="text-red-600 font-bold">
                      <h6>Reply Needed</h6>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active Desktop */}
              <div className="active-enquiry-desktop">
                <table className="enquiry-table">
                  <thead className="enquiry-table-header">
                    <tr>
                      <th>Vendor Name</th>
                      <th>Vendor Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="enquiry-body-row cursor-pointer">
                      {/* Vendor image and Name */}
                      <td onClick={toggleOpen}>
                        <div className="flex gap-[1rem] justify-start items-center">
                          <img
                            src={sampleProfile}
                            className="enquiry-vendor-image"
                          />
                          <h6 className="font-bold">Raymonds</h6>
                        </div>
                      </td>
                      {/* Vendor Category */}
                      <td onClick={toggleOpen}>
                        <div className="flex justify-start items-center">
                          <h6>Dresses</h6>
                        </div>
                      </td>
                      {/* Status */}
                      <td onClick={toggleOpen}>
                        <div className="enquiry-status">
                          <TfiEmail />
                          <div className="flex gap-[1rem] whitespace-nowrap">
                            <h6>11/4/2023</h6>
                            <h6>Vendor Replied</h6>
                          </div>
                          <div className="text-red-600 font-bold whitespace-nowrap">
                            <h6>Reply Needed</h6>
                          </div>
                        </div>
                      </td>
                      {/* Actions */}
                      <td>
                        <BlackLargeButton>
                          <h6>Reply to Vendor</h6>
                        </BlackLargeButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Detail box  */}
              {detailOpen && (
                <>
                  <div className="inquiry-overlay">
                    <div className="flex justify-end" onClick={closeDetailOpen}>
                      <AiOutlineClose
                        size={26}
                        className=" fixed cursor-pointer "
                      />
                    </div>
                    <div className="mt-[3rem]">
                      {/* image section */}
                      <div className="flex gap-[1rem]">
                        <img
                          src={sampleProfile}
                          className="enquiry2-vendor-image"
                        />
                        <div className="flex flex-col gap-1">
                          <h1 className="text-[#000]">Raymonds</h1>
                          <div className="flex gap-2">
                            <h5>Dresses</h5>
                            <div className="flex items-center">
                              <IoLocationOutline color="#000" size={22} />
                              <h5>Gold Coast, QLD</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* vendor listing */}
                      <div className="flex items-center mt-[1rem]">
                        <h4 className="font-bold">See their listing</h4>
                        <HiOutlineArrowSmRight
                          size={26}
                          color="#000"
                          fontWeight={600}
                        />
                      </div>
                      {/* Your Enquiry */}
                      <div className="your-inquiry-container">
                        <h1 className="text-[#000]">Your inquiry</h1>
                        {/* Requested Dates */}
                        <div>
                          <h4>Requested Dates</h4>
                          <ul className="enquiry-listing">
                            <li>
                              <h4>Tuesday, Wednesday, Thursday or Friday</h4>
                            </li>

                            <li>
                              <h4>
                                <span className="gap-1">
                                  <span className="font-change">2025:</span>
                                  <span>May</span>{" "}
                                </span>
                              </h4>
                            </li>
                          </ul>
                        </div>
                        {/* Table  1*/}
                        <div className="your-inquiry-table">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  <h4>Guest Count</h4>
                                </th>
                                <th>
                                  <h4>Location</h4>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="inquiry-td-style-digit">90</td>
                                <td className="inquiry-td-style">
                                  Gold Coast, QLD
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* Table  2*/}
                        <div className="your-inquiry-table-2">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  <h4>Wedding Budget</h4>
                                </th>
                                <th>
                                  <h4>Venue Budget</h4>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="inquiry-td-style">
                                  Up to{" "}
                                  <span className="font-change">$50,000</span>{" "}
                                  {/* <span>(flexible)</span> */}
                                </td>
                                <td className="inquiry-td-style">
                                  Up to{" "}
                                  <span className="font-change">$20,000</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <Divider sx={{ marginTop: "2rem" }} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {activeTab === "Archive" && <div>Archive Content</div>}
        </div>
      </section>
    </LayoutCouple>
  );
};

export default CoupleEnquiry;
