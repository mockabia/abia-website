import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineArrowSmRight } from "react-icons/hi";

import { Divider } from "@mui/material";

import * as CoupleJS from "../Couple";

function DetailedEnquiry(props) {
    const enquiry                        = props.enquiry;
    const open                           = props.open;
    const setOpen                        = props.setOpen;


    const closeDetailOpen = () => {
        setOpen(false);
    };
    

    return (
        <>
        {open && (
          <React.Fragment key={enquiry.id}>
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
                  src={enquiry.imageUrl}
                  className="enquiry2-vendor-image"
                />
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#000]">{enquiry.vendorName}</h1>
                  <div className="detailbox-subheader">
                    <h5>{enquiry.vendorType}</h5>
                    <div className="flex items-center">
                      <IoLocationOutline color="#000" size={18} />
                      <h5>
                        <span>{enquiry.location}</span>,
                        <span>{enquiry.stateurl}</span>{" "}
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
                          <h5>{enquiry.guestCount}</h5>
                        </td>
                        <td className="inquiry-td-style">
                          <h5>
                            {enquiry.location},{" "}
                            <span>{enquiry.stateurl}</span>
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
                                {enquiry.WeddingBudget.toLocaleString()}
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
                                {enquiry.VenueBudget.toLocaleString()}
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
          </React.Fragment>
        )}
      </>
    );
  }
  
export default DetailedEnquiry;