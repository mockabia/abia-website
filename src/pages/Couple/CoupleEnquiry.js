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

  const toggleOpen = (vendorId) => {
    setDetailOpn((prevState) => ({
      ...prevState,
      [vendorId]: !prevState[vendorId],
    }));
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

  const vendorEnquiryList = [
    {
      id: 1,
      imageUrl: `https://eightwillowsretreat.com.au/wp-content/uploads/2020/12/cropped-cropped-Eight-willows-retreat-logo-website.png`,
      vendorName: "Eight Willows Retreat",
      vendorType: "Wedding Venue",
      vendorReplayDate: "11/11/2023",
      vendorStatus: "Vendor Replied",
      yourStatus: "Reply Needed",
      location: "Gold Coast",
      stateurl: "QLD",
      WeddingDateApprx: [
        {
          days: ["Monday", "Tuesday"],
          month: "March",
          year: 2025,
        },
      ],
      guestCount: 100,
      WeddingBudget: 50000,
      VenueBudget: 20000,
    },
    {
      id: 2,
      imageUrl:
        "https://victoriapark.com.au/wp-content/uploads/2023/04/Victoria-Park-Logo-Grey.png",
      vendorName: "Victoria Park",
      vendorType: "Wedding Venue",
      vendorReplayDate: "11/11/2023",
      vendorStatus: "Enquiry Sent",
      yourStatus: "Reply Needed",
      location: "Canberra",
      stateurl: "ACT",
      WeddingDateApprx: [
        {
          days: ["Monday", "Tuesday"],
          month: "March",
          year: 2025,
        },
      ],
      guestCount: 150,
      WeddingBudget: 60000,
      VenueBudget: 25000,
    },
    {
      id: 3,
      imageUrl:
        "https://ddsdiamonds.com.au/wp-content/uploads/2023/10/dds-diamonds-logo-2600x600-1-2048x473.png",
      vendorName: "DDS Diamond Design Studios",
      vendorType: "Wedding & Engagement Ring",
      vendorReplayDate: "11/11/2023",
      vendorStatus: "Vendor Replied",
      yourStatus: "Reply Needed",
      location: "Byron Bay",
      stateurl: "NSW",
      WeddingDateApprx: [
        {
          days: ["Monday", "Tuesday"],
          month: "March",
          year: 2025,
        },
      ],
      guestCount: 200,
      WeddingBudget: 75000,
      VenueBudget: 25000,
    },
  ];

  return (
    <LayoutCouple title={title}>
        {/* main menu */}
        <div className="main-menu-section  ">
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
        <main className="enquiry-active-list-mobile">
          {activeTab === "Active" && (
            <>
              {/*Active  Mobile */}
              {vendorEnquiryList.map((vendor) => (
                <div className="active-enquiry-mobile">
                  <div
                    className=" flex justify-between items-center gap-[1rem]"
                    onClick={() => toggleOpen(vendor.id)}
                  >
                    {/* image section and Heading */}
                    <div className="flex items-center gap-[1rem]">
                      <img
                        src={vendor.imageUrl}
                        className="enquiry-vendor-image"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#000]">{vendor.vendorName}</h3>
                        <div>
                          <h5>{vendor.vendorType}</h5>
                        </div>
                      </div>
                    </div>

                    {/* Reply button */}
                    <div className="cursor-pointer">
                      <BlackSmallButton>
                        {vendor.vendorStatus === "Enquiry Sent" ? (
                          <h6>View </h6>
                        ) : (
                          <h6>Reply</h6>
                        )}
                      </BlackSmallButton>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="mt-[0.5rem]">
                    <div className="enquiry-status-mobile">
                      <div className="flex items-center gap-3">
                        <TfiEmail />
                        <div className="flex gap-[1rem]">
                          <h6>{vendor.vendorReplayDate}</h6>
                          <h6>{vendor.vendorStatus}</h6>
                        </div>
                      </div>

                      <div className="text-red-600 font-bold">
                        {vendor.vendorStatus === "Enquiry Sent" ? (
                          <h6> </h6>
                        ) : (
                          <h6>Reply Needed</h6>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

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
                    {vendorEnquiryList.map((vendor) => (
                      <tr
                        className="enquiry-body-row cursor-pointer"
                        key={vendor.id}
                      >
                        {/* Vendor image and Name */}
                        <td onClick={() => toggleOpen(vendor.id)}>
                          <div className="flex gap-[1rem] justify-start items-center">
                            <img
                              src={vendor.imageUrl}
                              className="enquiry-vendor-image"
                              alt="Vendor"
                            />
                            <h6 className="font-bold">{vendor.vendorName}</h6>
                          </div>
                        </td>

                        {/* Vendor Category */}
                        <td onClick={() => toggleOpen(vendor.id)}>
                          <div className="flex justify-start items-center">
                            <h6>{vendor.vendorType}</h6>
                          </div>
                        </td>
                        {/* Status */}
                        <td onClick={() => toggleOpen(vendor.id)}>
                          <div className="enquiry-status">
                            <TfiEmail />
                            <div className="flex whitespace-nowrap">
                              <h6>{vendor.vendorReplayDate}</h6>
                              <h6 className="pl-[1rem] pr-[1rem] w-[7rem]">
                                {vendor.vendorStatus}
                              </h6>
                            </div>
                            <div className="text-red-600 font-bold whitespace-nowrap">
                              {vendor.vendorStatus === "Enquiry Sent" ? (
                                <h6> </h6>
                              ) : (
                                <h6>Reply Needed</h6>
                              )}
                              {/* <h6>{vendor.yourStatus}</h6> */}
                            </div>
                          </div>
                        </td>
                        {/* Actions */}
                        <td>
                          <BlackLargeButton>
                            {vendor.vendorStatus === "Enquiry Sent" ? (
                              <h6>View Enquiry</h6>
                            ) : (
                              <h6>Reply to Vendor</h6>
                            )}
                          </BlackLargeButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Detail box  */}
              {vendorEnquiryList.map((vendor) => (
                <React.Fragment key={vendor.id}>
                  {detailOpen[vendor.id] && (
                    <div className="inquiry-overlay">
                      <div
                        className="flex justify-end"
                        onClick={closeDetailOpen}
                      >
                        <AiOutlineClose
                          size={26}
                          className=" fixed cursor-pointer "
                        />
                      </div>

                      <div className="mt-[3rem]">
                        {/* image section */}
                        <div className="flex gap-[1rem]">
                          <img
                            src={vendor.imageUrl}
                            className="enquiry2-vendor-image"
                          />
                          <div className="flex flex-col gap-1">
                            <h1 className="text-[#000]">{vendor.vendorName}</h1>
                            <div className="detailbox-subheader">
                              <h5>{vendor.vendorType}</h5>
                              <div className="flex items-center">
                                <IoLocationOutline color="#000" size={18} />
                                <h5>
                                  <span>{vendor.location}</span>,
                                  <span>{vendor.stateurl}</span>{" "}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* vendor listing */}
                        <div className="flex items-center mt-[1rem]">
                          <h5 className="font-bold cursor-pointer">
                            See their listing
                          </h5>
                          <HiOutlineArrowSmRight
                            size={26}
                            color="#000"
                            fontWeight={600}
                          />
                        </div>
                        {/* Your Enquiry */}
                        <div className="your-inquiry-container">
                          <h2 className="text-[#000]">Your Enquiry</h2>
                          {/* Requested Dates */}
                          <div>
                            <h5>Requested Dates</h5>
                            <ul className="enquiry-listing">
                              <li>
                                <h5>Tuesday, Wednesday, Thursday or Friday</h5>
                              </li>

                              <li>
                                <h5>
                                  <span className="gap-1">
                                    <span className="font-change">2025:</span>
                                    <span>May</span>{" "}
                                  </span>
                                </h5>
                              </li>
                            </ul>
                          </div>
                          {/* Table  1*/}
                          <div className="your-inquiry-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>
                                    <h5>Guest Count</h5>
                                  </th>
                                  <th>
                                    <h5>Location</h5>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="inquiry-td-style-digit">
                                    <h5>{vendor.guestCount}</h5>
                                  </td>
                                  <td className="inquiry-td-style">
                                    <h5>
                                      {vendor.location},{" "}
                                      <span>{vendor.stateurl}</span>
                                    </h5>
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
                                    <h5>Wedding Budget</h5>
                                  </th>
                                  <th>
                                    <h5>Venue Budget</h5>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="inquiry-td-style">
                                    <span className="text-[14px]">Up to </span>
                                    <span className="font-change">
                                      $
                                      {
                                        <span>
                                          {vendor.WeddingBudget.toLocaleString()}
                                        </span>
                                      }
                                    </span>{" "}
                                    {/* <span>(flexible)</span> */}
                                  </td>
                                  <td className="inquiry-td-style">
                                    <span className="text-[14px]">Up to </span>
                                    <span className="font-change">
                                      $
                                      {
                                        <span>
                                          {vendor.VenueBudget.toLocaleString()}
                                        </span>
                                      }
                                    </span>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <Divider sx={{ marginTop: "2rem" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          {activeTab === "Archive" && <div>Archive Content</div>}
        </main>
    </LayoutCouple>
  );
};

export default CoupleEnquiry;
